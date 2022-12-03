<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use Database\Factories\ItemFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\Item::factory(10)->create();
        // \App\Models\Category::factory(10)->create();
        // $category = Category::create([
        //     'id' => '1',
        //     'name' => 'Special Items',
        // ]);
        // $category = Category::create([
        //     'id' => '2',
        //     'name' => 'Burger',
        // ]);
        // $category = Category::create([
        //     'id' => '3',
        //     'name' => 'Pizza',
        // ]);
        // $category = Category::create([
        //     'id' => '4',
        //     'name' => 'Dessert',
        // ]);
        // $category = Category::create([
        //     'id' => '5',
        //     'name' => 'Drinks',
        // ]);
       \App\Models\Item::factory(1000)->create();


 
    }
}
