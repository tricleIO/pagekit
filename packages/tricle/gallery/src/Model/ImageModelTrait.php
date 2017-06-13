<?php

namespace Tricle\Gallery\Model;

use Pagekit\Database\ORM\ModelTrait;

trait ImageModelTrait
{
    use ModelTrait;

    /**
     * @Saving
     */
    public static function saving($event, Image $image)
    {
        $image->modified = new \DateTime();
    }
}
