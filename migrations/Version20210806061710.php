<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210806061710 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE monitor (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, product_id INT NOT NULL, marca VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, display VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, price DOUBLE PRECISION DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, note LONGTEXT DEFAULT NULL, INDEX IDX_E115998512469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE monitor ADD CONSTRAINT FK_E115998512469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE monitor');
    }
}
