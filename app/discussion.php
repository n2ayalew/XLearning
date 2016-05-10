<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class discussion extends Model
{
    //
    protected $table = 'discussions';
    public $primaryKey = 'post_id';
    protected $fillable = ['disscussion_post', 'post_title'];
    public $postTitle;
    
    public function _construct(){
        $this->postTitle = DB::table('discussions')->where('post_id', $this->primaryKey)->pluck('post_title');
    }
    public function comments(){
    	return $this->hasMany('App\comment', 'post_id', 'post_id');
    }

    public function classe(){
    	return $this->belongsTo('App\Classe');
    }

    public function getPostTitle(){
        //$this->postTitle = DB::table('discussions')->where('post_id', $this->primaryKey)->pluck('post_title');
        return DB::table('discussions')->where('post_id', $this->primaryKey)->pluck('post_title');
    }


}
