<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Product;
use Liior\Faker\Prices;
use App\Entity\Component;
use App\Entity\Location;
use App\Entity\Monitor;
use App\Entity\NoteBook;
use App\Entity\Printer;
use App\Entity\ProductDesktop;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {

        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('it_IT');
        $faker->addProvider(new \Liior\Faker\Prices($faker));
        $users = [];

        for ($u = 0; $u < 10; $u++) {
            $user = new User;
            $hash = $this->encoder->encodePassword($user, "password");
            $user->setEmail($faker->email);
            $user->setFirstName($faker->firstName);
            $user->setLastName($faker->lastName);
            $user->setPassword($hash);
            $user->setAvatar("https://randomuser.me/api/portraits/men/" . $u . ".jpg");
            $manager->persist($user);
            $users[] = $user;
        }
        $key = array_rand($users);
        for ($c = 0; $c < 10; $c++) {
            
            $location = new Location();
            $location->setLocationName($faker->word() . " " . $faker->buildingNumber);

            for ($i=0; $i <10 ; $i++) { 
                $desktop =new ProductDesktop;
                $desktop->setProductId($faker->ean13)
                       
                        ->setGrade("Grade A")
                        ->setHdd("500gb")
                        ->setRam("8gb")
                        ->setProcessor("i5")
                        ->setLocation($location)
                        ->setMarque($faker->sentence)
                        ->setNote($faker->word(5))
                        ->setModel($faker->title)
                        ->setPrice($faker->price(200, 400, true, true))->setPriceb2b($faker->price(100, 300, true, true));
                        
                        $manager->persist($desktop);
            }
            for ($i = 0; $i < mt_rand(5, 10); $i++) {
                $product = new Product();
                $product->setProductId($faker->word())
                ->setProcessor("i5")
                ->setHdd("500")
                ->setMarque("MARQUE")
                ->setPrice(300)
                    
                    ->setNote($faker->text())
                    ->setLocation($location)
                    ->setUser($users[mt_rand(0, count($users) - 1)]);


                $manager->persist($product);
            }
            for ($i=0; $i < 150 ; $i++) { 
            $pc = new NoteBook();
            $pc->setProductId($faker->ean8)
                ->setScreen($faker->randomElement(["12","13","14","15","15,4","12,1"]))
                ->setHdd($faker->randomElement(["160 gb","256gb","320gb","500gb"]))
                ->setLocation($location)
                ->setProcessor($faker->macProcessor)
                
                ->setRam($faker->randomElement(["2 gb","4 gb","8 gb","16 gb"]))
                ->setMarque($faker->word)
                ->setGrade($faker->randomElement(["Grade A","Grade B","Grade C","Grade A-","Grade B-"]))
                ->setModel($faker->slug)
                ->setPrice($faker->price(200, 400, true, true))->setPriceb2b($faker->price(100, 300, true, true))
                ;
              $manager->persist($pc) ;
            }
            for ($i=0; $i <100 ; $i++) { 
                $monitor = new Monitor;
                $monitor->setProductId($faker->ean13)
                ->setPrice($faker->price(200, 400, true, true))
                ->setPriceb2b($faker->price(100, 300, true, true))
                ->setLocation($location)
                ->setMarca($faker->name)->setModel($faker->sentence)
                ->setDisplay($faker->price(12,24))
                ->setGrade($faker->randomElement(["Grade A","Grade B","Grade C","Grade A-","Grade B-"]))
                ;
                $manager->persist($monitor);
            }
            for ($i=0; $i <10 ; $i++) { 
               $printer=new Printer;
               $printer->setProductId($faker->ean13)
                        ->setModel($faker->word)
                        ->setGrade($faker->randomElement(["Grade A","Grade B","Grade C","Grade A-","Grade B-"]))
                        ->setPrice($faker->price(200, 400, true, true))->setPriceb2b($faker->price(100, 300, true, true))
                        ->setMarque($faker->randomElement(["HP","SAMSUNG","XEROX","EPSON","LEXMARK","BROTHER","CANON"]))
                        ->setNote($faker->word)
                        ->setPaper($faker->numberBetween(5,50))
                         ->settype($faker->sentence)
                         ->setTonner($faker->word)
                         ->setLocation($location)
                         ->setFormat($faker->randomElement(["A4","A3","A2"]))
                        ->setConnector($faker->randomElement(["USB","WIFI"]));
                        $manager->persist($printer);
                        
            }
            for ($i=0; $i < 12 ; $i++) { 
               $component= new Component;
               $component->setProductId($faker->ean13)
                            ->setType($faker->word)
                            ->setSpecify($faker->paragraph(1))
                            ->setQuantity($faker->randomDigit)
                            ->setMarque($faker->randomElement(["HP","SAMSUNG","XEROX","EPSON","LEXMARK","BROTHER","CANON"]))
                            ->setGrade($faker->randomElement(["Grade A","Grade B","Grade C","Grade A-","Grade B-"]))
                            
                            ->setLocation($location)
                            ;
                            $manager->persist($component);
            }
            $manager->persist($location);
          
        }


        $manager->flush();
    }
}
