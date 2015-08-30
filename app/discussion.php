<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class discussion extends Model
{
    //
    protected $table = 'discussions';
    public $primaryKey = 'post_id';
    protected $fillable = ['disscussion_post'];
}
