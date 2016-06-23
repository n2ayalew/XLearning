<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class grade extends Model
{
    //
    protected $table = 'grades';
    protected $fillable = ['title'];

    public function classe() {
    	return $this->belongsTo('App\Classe');
    }

    public function user() {
    	return $this->belongsTo('App\User');
    }
}
