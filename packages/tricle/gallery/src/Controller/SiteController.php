<?php

namespace Tricle\Gallery\Controller;

use Pagekit\Application as App;
use Symfony\Component\HttpFoundation\Request;
use Tricle\Gallery\Model\Gallery;
use Tricle\Gallery\Model\Image;

class SiteController
{
    /**
     * @var Module
     */
    protected $gallery;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->gallery = App::module('gallery');
    }

    /**
     * @Route("/")
     * @Route("/page/{page}", name="page", requirements={"page" = "\d+"})
     */
    public function indexAction($page = 1)
    {
        if (!App::node()->hasAccess(App::user())) {
            App::abort(403, __('Insufficient User Rights.'));
        }

        $query = Gallery::where(['status = ?'], [Gallery::STATUS_PUBLISHED])->where(function ($query) {
            return $query->where('roles IS NULL')->whereInSet('roles', App::user()->roles, false, 'OR');
        })->related('user');

        if (!$limit = $this->gallery->config('gallery.galleries_per_page')) {
            $limit = 10;
        }

        $count = $query->count('id');
        $total = ceil($count / $limit);
        $page = max(1, min($total, $page));

        $query->offset(($page - 1) * $limit)->limit($limit)->orderBy('date', 'DESC');

        foreach ($galleries = $query->get() as $gallery) {
            $gallery->image = Image::query()->where(['gallery_id' => $gallery->id])->first();
        }

        return [
            '$view' => [
                'title' => __('Galleries'),
                'name' => 'gallery/galleries.php',
                'link:feed' => [
                    'rel' => 'alternate',
                    'href' => App::url('@blog/feed'),
                    'title' => App::module('system/site')->config('title'),
                    //'type' => App::feed()->create($this->gallery->config('feed.type'))->getMIMEType()
                ],
            ],
            'shwGallery' => $this->gallery,
            'galleries' => $galleries,
            'total' => $total,
            'page' => $page,
        ];
    }

    /**
     * @Route("/{id}", name="id")
     */
    public function galleryAction($id, Request $request)
    {
        if (!$gallery = Gallery::where(['id = ?', 'status = ?'], [$id, Gallery::STATUS_PUBLISHED])->related('user')->first()) {
            App::abort(404, __('Gallery not found!'));
        }

        $user = App::user();

        if (!$gallery->hasAccess($user)) {
            App::abort(403, __('Insufficient User Rights.'));
        }

        $description = $gallery->get('meta.og:description');
        if (!$description) {
            $description = strip_tags($gallery->description);
            $description = rtrim(mb_substr($description, 0, 150), " \t\n\r\0\x0B.,") . '...';
        }

        if (!$images = Image::query()->where(['gallery_id' => $gallery->id])->get()) {
            App::abort(404, __('No images found'));
        }

        $image = array_values($images)[0];

        $hasAccess = false;

        $hasAccessSessionAttributeName = 'hasAccessToGalleryId=' . $gallery->id;

        if ($gallery->password != null) {
            if ($request->request->get("char1") != null
                && $request->request->get("char2") != null
                && $request->request->get("char3") != null
                && $request->request->get("char4") != null
                && $request->request->get("char5") != null
                && $request->request->get("char6") != null
            ) {
                if (intval($request->request->get("char1") == intval($gallery->password[0]))
                    && intval($request->request->get("char2") == intval($gallery->password[1]))
                    && intval($request->request->get("char3") == intval($gallery->password[2]))
                    && intval($request->request->get("char4") == intval($gallery->password[3]))
                    && intval($request->request->get("char5") == intval($gallery->password[4]))
                    && intval($request->request->get("char6") == intval($gallery->password[5]))
                ) {
                    $hasAccess = true;
                    App::session()->set($hasAccessSessionAttributeName, true);
                }
            }
        } else {
            $hasAccess = true;
        }

        if (App::session()->has($hasAccessSessionAttributeName)
            && App::session()->get($hasAccessSessionAttributeName)
        ) {
            $hasAccess = true;
        }

        $chosenImage = null;
        $imageOrder = intval($request->query->get("image-order"));
        if ($imageOrder == null) {
            $imageOrder = 0;
        }

        $it = 0;
        foreach ($images as $currentImage) {
            if ($it == $imageOrder) {
                $chosenImage = $currentImage;
                break;
            }
            $it++;
        }

        $imageCount = count($images);

        $prevImageOrder = $imageOrder - 1;
        if ($prevImageOrder < 0) {
            $prevImageOrder = $imageCount - 1;
        }
        $nextImageOrder = ($imageOrder + 1) % $imageCount;

        $viewName = 'gallery/gallery.php';


        if ($request->query->get("detail") != null && $request->query->get("detail")) {
            $viewName = 'gallery/galleryDetail.php';
        }
        return [
            '$view' => [
                'title' => __($gallery->title),
                'name' => $viewName,
                'og:type' => 'article',
                'article:published_time' => $gallery->date->format(\DateTime::ATOM),
                'article:modified_time' => $gallery->modified->format(\DateTime::ATOM),
                'article:author' => $gallery->user->name,
                'og:title' => $gallery->get('meta.og:title') ?: $gallery->title,
                'og:description' => $description,
                'og:image' => App::url()->getStatic('/public/tricle-gallery/thumbnails/tn_' . $image->filename, [], 0),
            ],
            'shwGallery' => $this->gallery,
            'gallery' => $gallery,
            'images' => $images,
            'hasAccess' => $hasAccess,
            'imageOrder' => $imageOrder,
            'chosenImage' => $chosenImage,
            'imageCount' => $imageCount,
            'prevImageOrder' => $prevImageOrder,
            'nextImageOrder' => $nextImageOrder
        ];
    }

    /**
     * @Route("/mail/mail")
     */
    public function mailAction(Request $request)
    {
        $name = $request->request->get("name");
        $email = $request->request->get("email");
        $tel = $request->request->get("tel");
        $placeAndDate = $request->request->get("place-and-date");
        $occasion = $request->request->get("subject");

        $to = $request->request->get("email");
        $subject = 'Nová objednávka';
        $message = $message =
            '<html>' .
            '<body>' .
            '<h1>Rekapitulace poptávky</h1><p>' .
            '<b>Jméno:</b> ' . $name .
            '<br><b>E-mail:</b> ' . $email .
            '<br><b>Telefon:</b> ' . $tel .
            '<br><b>Místo a datum:</b> ' . $placeAndDate .
            '<br><b>Příležitost:</b> ' . $occasion .
            '</p></body>';
        '</html>';
        $headers = 'From: info@photobee.cz' . "\r\n" .
            'Content-type: text/html; charset=utf-8' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        mail("info@photobee.cz", $subject, $message, $headers);

        $subject = 'Potvrzení poptávky';
        $message = $message =
            '<html>' .
            '<head>
                </head>' .
            '<body>' .
            '<h1>Rekapitulace poptávky</h1><p>' .
            'Vaše objednávka byla přijata do systému, vyčkejte až se Vám ozveme.</p><p>' .
            '<b>Rekapitulace:</b><br>' .
            '<b>Jméno:</b> ' . $name .
            '<br><b>E-mail:</b> ' . $email .
            '<br><b>Telefon:</b> ' . $tel .
            '<br><b>Místo a datum:</b> ' . $placeAndDate .
            '<br><b>Příležitost:</b> ' . $occasion .
            '</p></body>';
        '</html>';
        $headers = 'From: info@photobee.cz' . "\r\n" .
            'Content-type: text/html; charset=utf-8' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        mail($email, $subject, $message, $headers);
        return App::redirect('', ['']);
    }
}
