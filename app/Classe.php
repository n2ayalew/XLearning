<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    //
    protected $table = "classes";
    public $primaryKey = "class_id";
    protected $fillable = ['subject', 'class_id', 'teacher'];

    public function users(){
    	return $this->belongsToMany('App\User', 'user_class', 'class_id', 'user_id')->withTimestamps();
    }

    public function announcements(){
        return $this->hasMany('App\announcement');
    }

    public function events(){
        return $this->hasMany('App\Event');
    }

    public function joinNotifications(){
        return $this->hasMany('App\notification', 'class_id', 'class_id')->where('notification_type', '=', 'join_request');
    }

    public function getClassList(){
        return $this->all();
    }

    public function discussions(){
        return $this->hasMany('App\discussion', 'class_id', 'class_id');
    }

    public function grades() {
        return $this->hasMany('App\grade', 'class_id', 'class_id');
    }
}
