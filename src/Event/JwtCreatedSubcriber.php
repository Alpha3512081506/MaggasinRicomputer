<?php

namespace App\Event;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubcriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        dd($event);
        /**@var User */
        $user = $event->getUser();


        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lasstName'] = $user->getLastName();
        $event->setData($data);


        dd($event->getData());
    }
}
