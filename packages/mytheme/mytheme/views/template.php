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
                <!-- Render logo or title with site URL -->
                <a href="<?= $view->url()->get() ?>" class="logo">
                    <?php if ($logo = $params['logo']) : ?>
                        <img src="<?= $this->escape($logo) ?>" alt="" class="img-fluid">
                    <?php else : ?>
                        <?= $params['title'] ?>
                    <?php endif ?>
                </a>
            </div>
            <div class="col-9">
                <!-- Render menu position -->
                <?php if ($view->menu()->exists('main')) : ?>
                    <?= $view->menu('main', 'menu-navbar.php') ?>
                <?php endif ?>
            </div>
        </div>
    </div>
</header>

<main>

    <!-- Render widget position -->
    <!--    --><?php //if ($view->position()->exists('sidebar')) : ?>
    <!--        --><? //= $view->position('sidebar') ?>
    <!--    --><?php //endif; ?>

    <!-- Render content -->
    <?= $view->render('content') ?>

    <!-- Insert code before the closing body tag  -->
    <?= $view->render('footer') ?>

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
    <div class="black-box">
        <img src="/public/img/bee-4.png" class="bee" alt="">
    </div>
</footer>

<script src="/public/js/webScripts.js"></script>
</body>
</html>
