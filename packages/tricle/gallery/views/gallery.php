<?php if ($hasAccess) : ?>
    <section class="gallery text-center">
        <h2 class="title pb-3">galerie</h2>
        <div class="container-fluid">
            <?php if (!$images): ?>
                <h3 class="uk-h1 uk-text-muted uk-text-center"><?php echo __('No Galleries found') ?></h3>
            <?php else: ?>
                <div class="row">
                    <?php $it = 0; ?>
                    <?php foreach ($images as $image): ?>
                        <div class="col-4">
                            <a class="uk-thumbnail uk-overlay-toggle"
                               href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) . "?detail=true&image-order=" . $it ?>">
                                <div class="gallery__item">
                                    <img
                                        src="<?= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $image->filename) ?>"
                                        class="img-fluid" alt="">
                                    <div class="gallery__item-title">
                                        <span class="date"></span>
                                        <?= $image->title ?>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php
                        $it++;
                        ?>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <br><br><br><br><br>
        </div>
    </section>

<!--<section class="gallery text-center">-->
<!--    <h1 class="title pb-3">--><?//= $gallery->title ?><!--</h1>-->
<!--    <div class="container-fluid">-->
<!--        <div class="row gallery__slider">-->
<!--            <div class="col-1">-->
<!--                <a href="--><?//= $view->url('@gallery/id', ['id' => $gallery->id]) ?><!--?image-order=--><?//= $prevImageOrder ?><!--"><i class="icon icon-chevron-left"></i></a>-->
<!--            </div>-->
<!--            <div class="col-10">-->
<!--                <div class="">-->
<!--                    <img src="--><?//= $view->url()->getStatic('public/tricle-gallery/' . $chosenImage->filename) ?><!--" class="img-fluid" alt="">-->
<!--                    <div class="gallery__item-title">-->
<!--                        <span class="date"></span>-->
<!--                        --><?//= $chosenImage->title ?>
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="col-1">-->
<!--                <a href="--><?//= $view->url('@gallery/id', ['id' => $gallery->id]) ?><!--?image-order=--><?//= $nextImageOrder ?><!--"><i class="icon icon-chevron-right"></i></a>-->
<!--            </div>-->
<!--        </div>-->
<!--        <br><br><br><br><br><br>-->
<!---->
<!--    </div>-->
<!--</section>-->
<?php else: ?>
    <section class="login">
        <div class="bg" style="background-image: url('/public/img/login-bg.jpg');"></div>
        <form action="#" class="login__form row" method="post">
            <div class="col-2">
                <input type="number" class="form-control mb-2 mr-sm-2 mb-sm-0" id="char-1" name="char1">
            </div>
            <div class="col-2">
                <input type="number" class="form-control mb-2 mr-sm-2 mb-sm-0" id="char-1" name="char2">
            </div>
            <div class="col-2">
                <input type="number" class="form-control mb-2 mr-sm-2 mb-sm-0" id="char-1" name="char3">
            </div>
            <div class="col-2">
                <input type="number" class="form-control mb-2 mr-sm-2 mb-sm-0" id="char-1" name="char4">
            </div>
            <div class="col-2">
                <input type="number" class="form-control mb-2 mr-sm-2 mb-sm-0" id="char-1" name="char5">
            </div>
            <div class="col-2">
                <input type="number" class="form-control mb-2 mr-sm-2 mb-sm-0" id="char-1" name="char6">
            </div>
            <div class="col-12 text-center mt-4 mb-4">
                <button type="submit" class="btn btn-outline-primary btn-inline">Odeslat</button>
            </div>
        </form>
    </section>
<?php endif; ?>