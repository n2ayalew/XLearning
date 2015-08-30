<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class assignment_test extends Model
{
    //
    protected $table = 'assignments_tests';
    public $primaryKey = 'test_id';
    protected $fillable = ['title'];
}
