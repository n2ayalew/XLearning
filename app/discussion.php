<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class discussion extends Model
{
    //
    protected $table = 'discussions';
    public $primaryKey = 'post_id';
    protected $fillable = ['disscussion_post'];

    public function comments(){
    	return $this->hasMany('App\comment', 'post_id', 'post_id');
    }

    public function classe(){
    	return $this->belongsTo('App\Classe');
    }
}
