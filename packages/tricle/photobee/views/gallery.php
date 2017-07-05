<?php if ($hasAccess) : ?>
    <section class="gallery text-center">
        <h2 class="title pb-3"><?= $gallery->title ?></h2>
        <div class="container-fluid">
            <div class="row">
                <?php foreach ($images as $image): ?>
                    <div class="col-12 col-sm-6 col-md-4">
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
<? endif; ?>