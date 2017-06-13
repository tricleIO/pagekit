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
        <h2 class="title pb-3">galerie</h2>
        <div class="container-fluid">
            <?php if (!$galleries): ?>
                <h3 class="uk-h1 uk-text-muted uk-text-center"><?php echo __('No Galleries found') ?></h3>
            <?php else: ?>
            <div class="row">
                <?php foreach ($galleries as $gallery): ?>
                    <div class="col-4">
                        <a class="uk-thumbnail uk-overlay-toggle"
                           href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) ?>">
                            <div class="gallery__item">
                                <img
                                    src="<?= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $gallery->image->filename) ?>"
                                    class="img-fluid" alt="">
                                <div class="gallery__item-title">
                                    <span class="date">22.10.2017</span>
                                    <?= $gallery->title ?>
                                </div>
                            </div>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
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


<?php //$view->style('gallery', 'gallery:assets/css/gallery.css', 'uikit') ?>
<!---->
<!--<h1>--><?//= $shwGallery->config('gallery.title') ?><!--</h1>-->
<!---->
<?php //if (!$galleries): ?>
<!--    <h3 class="uk-h1 uk-text-muted uk-text-center">--><?php //echo __('No Galleries found') ?><!--</h3>-->
<?php //else: ?>
<!--    <div class="uk-grid uk-grid-width-1-4" data-uk-grid-margin>-->
<!--        --><?php //foreach ($galleries as $gallery): ?>
<!--            <div class="uk-text-center">-->
<!--                <h2 class="uk-h3">--><?//= $gallery->title ?><!--</h2>-->
<!--                <a class="uk-thumbnail uk-overlay-toggle"-->
<!--                   href="--><?//= $view->url('@gallery/id', ['id' => $gallery->id]) ?><!--">-->
<!--                    <img-->
<!--                        src="--><?//= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $gallery->image->filename) ?><!--"-->
<!--                        alt=""/>-->
<!--                </a>-->
<!--            </div>-->
<!--        --><?php //endforeach; ?>
<!--    </div>-->
<?php //endif; ?>