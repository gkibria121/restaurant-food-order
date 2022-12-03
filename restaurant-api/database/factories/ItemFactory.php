<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'category_id' =>rand(1,5),
            'price' => fake()->numberBetween($min = 1, $max = 5) ,
            'desc' => fake()->address(),
            'url' => fake()->imageUrl(),
            'amount' => '0'
        ];
    }
}
