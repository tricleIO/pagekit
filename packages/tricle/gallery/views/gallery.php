<?php if ($hasAccess) : ?>
    <section class="gallery text-center">
        <h2 class="title pb-3">galerie - <?= $gallery->title ?></h2>
        <div class="container-fluid">
            <?php if (!$images): ?>
                <h3 class="uk-h1 uk-text-muted uk-text-center"><?php echo __('No Galleries found') ?></h3>
            <?php else: ?>
                <div class="row">
                    <?php $it = 0; ?>
                    <?php foreach ($images as $image): ?>
                        <div class="col-12 col-sm-6 col-md-3">
                            <a class="uk-thumbnail uk-overlay-toggle"
                               href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) . "?detail=true&image-order=" . $it ?>">
                                <div class="gallery__item">
                                    <img
                                        src="<?= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $image->filename) ?>"
                                        class="img-fluid" alt="">
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
<?php else: ?>
    <section class="login">
        <div class="bg" style="background-image: url('/public/img/login-bg.jpg');"></div>
        <div class="container-fluid">
            <form action="#" class="login__form row" method="post">
                <div class="col-2">
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 lock-char" id="char-1"  name="char1" maxlength="1" min="0" max="9" required>
                </div>
                <div class="col-2">
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 lock-char" id="char-1" name="char2" maxlength="1" required>
                </div>
                <div class="col-2">
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 lock-char" id="char-1" name="char3" maxlength="1" required>
                </div>
                <div class="col-2">
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 lock-char" id="char-1" name="char4" maxlength="1" required>
                </div>
                <div class="col-2">
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 lock-char" id="char-1" name="char5" maxlength="1" required>
                </div>
                <div class="col-2">
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 lock-char" id="char-1" name="char6" maxlength="1" required>
                </div>
                <div class="col-12 text-center mt-4 mb-4">
                    <button type="submit" class="btn btn-outline-primary btn-inline">Odeslat</button>
                </div>
            </form>
        </div>
    </section>

<?php endif; ?>



