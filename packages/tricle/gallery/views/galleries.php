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
                                    <span class="date"></span>
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