<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Freelancer extends Model
{
    use HasFactory;

    protected $fillables = [
        'username',
        'mail',
        'phoneNo',
        'skillsets',
        'hobby',
    ];
}
