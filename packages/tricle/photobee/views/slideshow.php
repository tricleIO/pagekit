<section class="gallery text-center">
    <h2 class="title pb-3"><?= $gallery->title ?></h2>
    <div class="container-fluid">
        <div class="row">
            <?php foreach ($images as $image): ?>
                <div class="col-12 col-sm-6 col-md-4">
                    <a href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) ?>">
                        <div class="gallery__item">
                            <img
                                src="<?= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $image->filename) ?>"
                                alt="<?= $image->title ?>" class="img-fluid"/>
                            <div class="gallery__item-title">
                                <span class="date"></span>
                            </div>
                        </div>
                    </a>
                </div>
            <?php endforeach ?>
        </div>
    </div>
</section>