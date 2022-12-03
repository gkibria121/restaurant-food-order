<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\User;

class Item extends Model
{
    use HasFactory;
    /**
     * Get the user that owns the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Products()
    {
        return $this->belongsTo(Category::class);
    }
}
