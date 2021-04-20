<?php

namespace App\Event;

use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Product;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Security;

class ProductUserSubscriber implements EventSubscriberInterface
{

    private $security;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForProduct', EventPriorities::PRE_VALIDATE]

        ];
    }

    public function setUserForProduct(ViewEvent $event)
    {
        /**@var Product */
        $product = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if ($product instanceof Product && $method === 'POST')
            $user = $this->security->getUser();
        $product->setUser($user);
    }
}
