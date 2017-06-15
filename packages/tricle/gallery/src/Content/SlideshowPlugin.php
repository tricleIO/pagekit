<?php

namespace Tricle\Gallery\Content;

use Pagekit\Application as App;
use Pagekit\Content\Event\ContentEvent;
use Pagekit\Event\EventSubscriberInterface;
use Tricle\Gallery\Model\Gallery;
use Tricle\Gallery\Model\Image;

class SlideshowPlugin implements EventSubscriberInterface
{
    /**
     * Content plugins callback.
     *
     * @param ContentEvent $event
     */
    public function onContentPlugins(ContentEvent $event)
    {
        $content = $event->getContent();
        $pattern = '/\[gallery(.*?)\/]/';

        if (preg_match_all($pattern, $content, $matches, PREG_PATTERN_ORDER)) {
            foreach ($matches[1] as $key => $match) {

                $galleriesQuery = Gallery::where(['status = ?'], [Gallery::STATUS_PUBLISHED])->where(function ($query) {
                    return $query->where('roles IS NULL')->whereInSet('roles', App::user()->roles, false, 'OR');
                })->related('user');
                $galleriesQuery->limit(3)->orderBy('date', 'DESC');

                $galleries = $galleriesQuery->get();

                foreach ($galleries as $g) {
                    $g->image = Image::query()->where(['gallery_id' => $g->id])->first();
                }

                $content = str_replace($matches[0][$key], App::view('gallery:views/slideshow.php', compact('attributes', 'galleries')), $content);
            }

            $event->setContent($content);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function subscribe()
    {
        return [
            'content.plugins' => ['onContentPlugins', 10],
        ];
    }
}
