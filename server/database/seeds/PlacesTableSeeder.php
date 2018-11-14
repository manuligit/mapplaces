<?php

use Illuminate\Database\Seeder;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Keyword::class, 10)->create();
        $kw_ids = App\Keyword::all('id')->pluck('id')->toArray();

        $faker = Faker\Factory::create();
        \App\Place::insert([
            'title' => 'Kirjasto',
            'description' => 'Suomenlinnan vanhin ja perinteisin kirjasto.',
            'latitude' => 60.1462116,
            'longitude' => 24.9846877,
            'opens_at' => '08:00',
            'closes_at' => '18:00',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);

        \App\Place::insert([
            'title' => 'Kasinopuisto',
            'description' => 'Hieno puisto.',
            'latitude' => 60.1485,
            'longitude' => 24.987445,
            'opens_at' => '00:00',
            'closes_at' => '23:59',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);

        \App\Place::insert([
            'title'=> 'Pikku-Musta',
            'description'=> 'Hieno saari',
            'latitude'=> 60.149797,
            'longitude'=> 24.979761,
            'opens_at' => '00:00',
            'closes_at'=> '23:59',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);

        \App\Place::insert([
            'title'=> 'Sotamuseo',
            'description'=> 'Pakollinen nähtävyys. Sotamuseossa avautui uusi näyttely toukokuussa 2018.',
            'latitude'=> 60.1458227,
            'longitude'=> 24.9894453,
            'opens_at' => '09:00',
            'closes_at'=> '15:00',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);

        // Attach keywords to places by hand:
        // TODO: Add checking if keyword already is attached before attaching
        // And create a function instead of calling this x times:
        \App\Place::find(1)->keywords()->attach(array_rand($kw_ids));
        \App\Place::find(1)->keywords()->attach(array_rand($kw_ids));
        \App\Place::find(1)->keywords()->attach(array_rand($kw_ids));
        \App\Place::find(2)->keywords()->attach(array_rand($kw_ids));
        \App\Place::find(2)->keywords()->attach(array_rand($kw_ids));
        \App\Place::find(3)->keywords()->attach(array_rand($kw_ids));
        \App\Place::find(4)->keywords()->attach(array_rand($kw_ids));
    }
}
