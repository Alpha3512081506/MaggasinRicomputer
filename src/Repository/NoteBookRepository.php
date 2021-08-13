<?php

namespace App\Repository;

use App\Entity\NoteBook;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method NoteBook|null find($id, $lockMode = null, $lockVersion = null)
 * @method NoteBook|null findOneBy(array $criteria, array $orderBy = null)
 * @method NoteBook[]    findAll()
 * @method NoteBook[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NoteBookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NoteBook::class);
    }

    // /**
    //  * @return NoteBook[] Returns an array of NoteBook objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NoteBook
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
