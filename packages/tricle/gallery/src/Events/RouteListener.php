<?php

namespace Tricle\Gallery\Events;

use Pagekit\Application as App;
use Pagekit\Event\EventSubscriberInterface;
use Tricle\Gallery\UrlResolver;

class RouteListener implements EventSubscriberInterface
{
    /**
     * Adds cache breaker to router.
     */
    public function onAppRequest()
    {
        App::router()->setOption('gallery.permalink', UrlResolver::getPermalink());
    }

    /**
     * Registers permalink route alias.
     */
    public function onConfigureRoute($event, $route)
    {
        if ($route->getName() == '@gallery/id' && UrlResolver::getPermalink()) {
            App::routes()->alias(dirname($route->getPath()).'/'.ltrim(UrlResolver::getPermalink(), '/'), '@gallery/id', ['_resolver' => 'Tricle\Gallery\UrlResolver']);
        }
    }

    /**
     * Clears resolver cache.
     */
    public function clearCache()
    {
        App::cache()->delete(UrlResolver::CACHE_KEY);
    }

    /**
     * {@inheritdoc}
     */
    public function subscribe()
    {
        return [
            'request'               => ['onAppRequest', 130],
            'route.configure'       => 'onConfigureRoute',
            'model.gallery.saved'   => 'clearCache',
            'model.gallery.deleted' => 'clearCache',
        ];
    }
}
