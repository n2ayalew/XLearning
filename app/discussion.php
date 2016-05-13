<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class discussion extends Model
{
    //
    protected $table = 'discussions';
    public $primaryKey = 'post_id';
    protected $fillable = ['disscussion_post', 'post_title'];
    private $postTitle;
    
    // public function _construct(String $pt){
    //     //$this->postTitle = DB::table('discussions')->where('post_id', $this->primaryKey)->pluck('post_title');
    //     $this->postTitle = $pt
    // }
    public function comments(){
    	return $this->hasMany('App\comment', 'post_id', 'post_id');
    }

    public function classe(){
    	return $this->belongsTo('App\Classe');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function getPostTitle(){
        //$this->postTitle = DB::table('discussions')->where('post_id', $this->primaryKey)->pluck('post_title');
        return \DB::table('discussions')->where('post_id', $this->primaryKey)->pluck('post_title');
    }

    public function setPostTitle($pt){
        \DB::table($table)->where('post_id', $this->primaryKey)->update(['post_title' => $pt]);
    }

}
