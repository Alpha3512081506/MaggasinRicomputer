<?php

namespace App\Repository;

use App\Entity\ProductDesktop;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ProductDesktop|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductDesktop|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductDesktop[]    findAll()
 * @method ProductDesktop[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductDesktopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductDesktop::class);
    }

    // /**
    //  * @return ProductDesktop[] Returns an array of ProductDesktop objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProductDesktop
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
