<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class grade extends Model
{
    //
    protected $table = 'grades';
    protected $fillable = ['title'];
}
