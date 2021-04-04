<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Product;
use App\Entity\Category;
use App\Entity\Location;
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
            $category = new Category();
            $category->setCategoryName($faker->word());
            $location = new Location();
            $location->setLocationName($faker->word() . " " . $faker->buildingNumber);


            for ($i = 0; $i < mt_rand(5, 10); $i++) {
                $product = new Product();
                $product->setProductId($faker->word())
                    ->setProductName($faker->sentence())
                    ->setCurrentQuantity(mt_rand(20, 50))
                    ->setAlertQuanty(mt_rand(5, 10))
                    ->setCustomField1($faker->paragraph(1))
                    ->setCustomField2($faker->paragraph(1))
                    ->setCustomField3($faker->sentence())
                    ->setNote($faker->text())
                    ->setCreatedAt(new \DateTime())
                    ->setCategory($category)
                    ->setLocation($location)
                    ->setUser($users[mt_rand(0, count($users) - 1)])
                    ->setCategory($category);


                $manager->persist($product);
            }
            $manager->persist($location);
            $manager->persist($category);
        }


        $manager->flush();
    }
}
