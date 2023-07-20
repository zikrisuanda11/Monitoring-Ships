<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ship extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
