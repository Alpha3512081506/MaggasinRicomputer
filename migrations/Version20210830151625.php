<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210830151625 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE note_book (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, product_id INT NOT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, processor VARCHAR(255) NOT NULL, ram VARCHAR(255) NOT NULL, hdd VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, price NUMERIC(5, 2) DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, screen VARCHAR(255) NOT NULL, note LONGTEXT DEFAULT NULL, INDEX IDX_6B9FB26964D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE note_book ADD CONSTRAINT FK_6B9FB26964D218E FOREIGN KEY (location_id) REFERENCES location (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE note_book');
    }
}
