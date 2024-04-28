<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;

class SetupEnv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    
     protected $signature = 'setup:env';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Interactive setup for .env file and database configuration';


    /**
     * Execute the console command.
     */
   
     public function handle()
     {
         $this->info('Setting up your environment...');
 
         // Check if the .env file exists
         $envFilePath = base_path('.env');
         $fileSystem = new Filesystem();
 
         if (!$fileSystem->exists($envFilePath)) {
             // If the .env file doesn't exist, copy it from .env.example
             $fileSystem->copy(base_path('.env.example'), $envFilePath);
             $this->info('.env file copied from .env.example.');
         } else {
             $this->error('.env file already exists. Please configure it manually.');
             return;
         }
 
         // Generate an application key
        //  $this->call('key:generate');
         $this->info('Environment file (.env) created.');
 
         // Ask for database configuration
         $this->askForDatabaseConfig();
 
         $this->info('Environment setup complete.');
     }
 
     protected function askForDatabaseConfig()
     {
         $this->info('Please provide the following database configuration:');
         $dbHost = $this->ask('Database Host (e.g., 127.0.0.1)');
         $dbPort = $this->ask('Database Port (e.g., 3306)');
         $dbDatabase = $this->ask('Database Name');
         $dbUsername = $this->ask('Database Username');
         $dbPassword = $this->secret('Database Password');
 
         // Update the database configuration in the .env file
         $this->updateEnv([
             'DB_HOST' => $dbHost,
             'DB_PORT' => $dbPort,
             'DB_DATABASE' => $dbDatabase,
             'DB_USERNAME' => $dbUsername,
             'DB_PASSWORD' => $dbPassword,
         ]);
     }
 
     protected function updateEnv(array $data)
     {
         $envFilePath = base_path('.env');
         $fileSystem = new Filesystem();
 
         $contents = $fileSystem->get($envFilePath);
 
         foreach ($data as $key => $value) {
             $contents = preg_replace(
                 "/^$key=.*\$/m",
                 "$key=$value",
                 $contents
             );
         }
 
         $fileSystem->put($envFilePath, $contents);
 
         $this->info('Database configuration updated in .env file.');
     }

}
