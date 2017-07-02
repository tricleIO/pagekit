<section class="gallery text-center">
    <h2 class="title pb-3">Galerie</h2>
    <div class="container-fluid">
        <div class="row">
            <?php foreach ($galleries as $gallery): ?>
                <div class="col-4">
                    <a href="<?= $view->url('@gallery/id', ['id' => $gallery->id]) ?>">
                        <div class="gallery__item">
                            <img
                                src="<?= $view->url()->getStatic('public/tricle-gallery/thumbnails/tn_' . $gallery->image->filename) ?>"
                                alt="" class="img-fluid"/>
                            <div class="gallery__item-title <?php if(!empty($gallery->password)) echo 'gallery__item--locked';?>">
                                <span class="date"></span>
                                <?= $gallery->title ?>
                            </div>
                        </div>
                    </a>
                </div>
            <?php endforeach ?>
        </div>
    </div>
</section>