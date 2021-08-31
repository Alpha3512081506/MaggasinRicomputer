<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210806092434 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE printer (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, product_id INT NOT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, paper VARCHAR(255) NOT NULL, connector VARCHAR(255) DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, tonner VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, format VARCHAR(255) NOT NULL, price NUMERIC(5, 2) DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, note LONGTEXT DEFAULT NULL, INDEX IDX_8D4C79ED64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE printer ADD CONSTRAINT FK_8D4C79ED64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE printer');
    }
}
