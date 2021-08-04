<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210803141620 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_desktop (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, location_id INT DEFAULT NULL, product_id VARCHAR(255) NOT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, processor VARCHAR(255) DEFAULT NULL, ram VARCHAR(255) DEFAULT NULL, hdd VARCHAR(255) DEFAULT NULL, grade VARCHAR(255) DEFAULT NULL, price NUMERIC(5, 2) DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, note LONGTEXT DEFAULT NULL, INDEX IDX_D8B81E1412469DE2 (category_id), INDEX IDX_D8B81E1464D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_desktop ADD CONSTRAINT FK_D8B81E1412469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE product_desktop ADD CONSTRAINT FK_D8B81E1464D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE product CHANGE price price NUMERIC(5, 2) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE product_desktop');
        $this->addSql('ALTER TABLE product CHANGE price price DOUBLE PRECISION DEFAULT NULL');
    }
}
