<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class notification extends Model
{
    //
    protected $table = 'notifications';
    protected $fillable = ['serialized_notification'];
    
}
