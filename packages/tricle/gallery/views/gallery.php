<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/public/css/gallery.css">
</head>
<body>

<header>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3">
                <a href="#" class="logo">
                    <img src="/public/img/logo-photobee.png" alt="" class="img-fluid">
                </a>
            </div>
            <div class="col-9">
                <ul class="main-menu">
                    <li><a href="#">o nas</a></li>
                    <li><a href="#">co je photobee</a></li>
                    <li><a href="#">galerie</a></li>
                    <li><a href="#">chci photobee</a></li>
                    <li><a href="#">kontakt</a></li>
                    <li class="user"><i class="icon icon-user"></i></li>
                </ul>
            </div>
        </div>
    </div>
</header>

<main>
    <section class="gallery text-center">
        <h2 class="title pb-3"><?= $gallery->title ?></h2>
        <div class="container-fluid">
            <div class="row">
                <?php foreach ($images as $image): ?>
                    <div class="col-4">
                        <div class="gallery__item">
                            <a href="<?= $view->url()->getStatic('public/tricle-gallery/' . $image->filename) ?>"
                               data-uk-lightbox="{group:'gallery'}" title="<?= $image->title ?>">
                                <img
                                    src="<?= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $image->filename) ?>"
                                    class="img-fluid" alt="">
                            </a>
                            <div class="gallery__item-title">
                                <span class="date"></span>
                            </div>
                        </div>
                    </div>
                <?php endforeach ?>
            </div>
        </div>
    </section>
</main>

<footer>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                Dělat cool fotky není žádný med. Proto je tu Photobee, královna mezi fotobudkami, díky které budete mít
                na každou party i akci skvělé vzpomínky.
            </div>
        </div>
    </div>
</footer>

<script src="/public/js/webScripts.js"></script>
</body>
</html>
<!---->
<?php //if ($shwGallery->config('gallery.back_button')): ?>
<!--    <a class="uk-button" href="--><?//= $view->url('@gallery') ?><!--">--><?//= __('back') ?><!--</a>-->
<?php //endif; ?>
<!---->
<!--<h1>--><?//= $gallery->title ?><!--</h1>-->
<!---->
<?php //if ($gallery->photograph): ?>
<!--    --><?//= __('Photograph') . ': ' . $gallery->photograph ?>
<?php //endif; ?>
<!---->
<!--<p>--><?//= $gallery->description ?><!--</p>-->

<!--<ul class="uk-grid uk-grid-width-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-5" data-uk-grid-margin>-->
<!--    --><?php //foreach ($images as $image): ?>
<!--        <li class="uk-text-center">-->
<!--            <a href="--><?//= $view->url()->getStatic('public/tricle-gallery/' . $image->filename) ?><!--"-->
<!--               data-uk-lightbox="{group:'gallery'}" title="--><?//= $image->title ?><!--">-->
<!--                <img src="--><?//= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $image->filename) ?><!--"-->
<!--                     alt="--><?//= $image->title ?><!--"/>-->
<!--            </a>-->
<!--        </li>-->
<!--    --><?php //endforeach ?>
<!--</ul>-->
