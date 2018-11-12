<?php

use Illuminate\Database\Seeder;

class KeywordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $keyword = factory(App\Keyword::class, 10)->create();
        // $faker = Faker\Factory::create();
        // $keyword = \App\Keyword::insert([
        //     'label'=> 'Nähtävyys',
        //     'created_at' => $faker->dateTime($max = 'now'),
        //     'updated_at' => $faker->dateTime($max = 'now')
        // ]);

        // $keyword2 = \App\Keyword::insert([
        //     'label'=> 'Hauska',
        //     'created_at' => $faker->dateTime($max = 'now'),
        //     'updated_at' => $faker->dateTime($max = 'now')
        // ]);
    }
}
