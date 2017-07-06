<?php if ($hasAccess) : ?>
    <section class="gallery text-center">
        <h1 class="title pb-3"><?= $gallery->title ?></h1>
        <div class="container-fluid">
            <div class="row gallery__slider">
                <div class="col-2">
                    <a href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) ?>?detail=true&image-order=<?= $prevImageOrder ?>"><i class="icon icon-chevron-left"></i></a>
                </div>
                <div class="col-8">
                    <div class="">
                        <img src="<?= $view->url()->getStatic('public/tricle-gallery/' . $chosenImage->filename) ?>" class="img-fluid" alt="">
                        <div class="gallery__item-title">
                            <span class="date"></span>
                            <?= $chosenImage->title ?>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <a href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) ?>?detail=true&image-order=<?= $nextImageOrder ?>"><i class="icon icon-chevron-right"></i></a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center">
                    <p class="gallery__link"><a href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) ?>">Zpět do galerie</a></p>
                </div>
            </div>
        </div>
    </section>
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
