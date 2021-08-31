<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210830101647 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
       // $this->addSql('CREATE TABLE component (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, product_id VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, marque VARCHAR(255) NOT NULL, specify VARCHAR(255) NOT NULL, quantity INT NOT NULL, grade VARCHAR(255) NOT NULL, alert_quantity INT DEFAULT NULL, INDEX IDX_49FEA15764D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE location (id INT AUTO_INCREMENT NOT NULL, location_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
       // $this->addSql('CREATE TABLE monitor (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, product_id VARCHAR(255) NOT NULL, marca VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, display VARCHAR(255) NOT NULL, price DOUBLE PRECISION DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, note LONGTEXT DEFAULT NULL, INDEX IDX_E115998564D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE note_book (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, product_id INT NOT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, processor VARCHAR(255) NOT NULL, ram VARCHAR(255) NOT NULL, hdd VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, price NUMERIC(5, 2) DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, screen VARCHAR(255) NOT NULL, note LONGTEXT DEFAULT NULL, INDEX IDX_6B9FB26964D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE printer (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, paper VARCHAR(255) NOT NULL, connector VARCHAR(255) DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, tonner VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, format VARCHAR(255) NOT NULL, price NUMERIC(5, 2) DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, note LONGTEXT DEFAULT NULL, product_id VARCHAR(255) DEFAULT NULL, INDEX IDX_8D4C79ED64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, product_id VARCHAR(255) NOT NULL, marque VARCHAR(255) NOT NULL, priceb2b NUMERIC(10, 0) NOT NULL, model VARCHAR(255) DEFAULT NULL, note LONGTEXT DEFAULT NULL, price NUMERIC(5, 2) DEFAULT NULL, ram VARCHAR(255) DEFAULT NULL, hdd VARCHAR(255) DEFAULT NULL, screen VARCHAR(255) DEFAULT NULL, processor VARCHAR(255) DEFAULT NULL, INDEX IDX_D34A04AD64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE product_desktop (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, product_id VARCHAR(255) NOT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, processor VARCHAR(255) NOT NULL, ram VARCHAR(255) NOT NULL, hdd VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, price NUMERIC(5, 2) DEFAULT NULL, priceb2b NUMERIC(5, 2) DEFAULT NULL, note LONGTEXT DEFAULT NULL, INDEX IDX_D8B81E1464D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //$this->addSql('ALTER TABLE component ADD CONSTRAINT FK_49FEA15764D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        //$this->addSql('ALTER TABLE monitor ADD CONSTRAINT FK_E115998564D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        //$this->addSql('ALTER TABLE note_book ADD CONSTRAINT FK_6B9FB26964D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        //$this->addSql('ALTER TABLE printer ADD CONSTRAINT FK_8D4C79ED64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        //$this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        //$this->addSql('ALTER TABLE product_desktop ADD CONSTRAINT FK_D8B81E1464D218E FOREIGN KEY (location_id) REFERENCES location (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE component DROP FOREIGN KEY FK_49FEA15764D218E');
        $this->addSql('ALTER TABLE monitor DROP FOREIGN KEY FK_E115998564D218E');
        $this->addSql('ALTER TABLE note_book DROP FOREIGN KEY FK_6B9FB26964D218E');
        $this->addSql('ALTER TABLE printer DROP FOREIGN KEY FK_8D4C79ED64D218E');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD64D218E');
        $this->addSql('ALTER TABLE product_desktop DROP FOREIGN KEY FK_D8B81E1464D218E');
        $this->addSql('DROP TABLE component');
        $this->addSql('DROP TABLE location');
        $this->addSql('DROP TABLE monitor');
        $this->addSql('DROP TABLE note_book');
        $this->addSql('DROP TABLE printer');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_desktop');
        $this->addSql('DROP TABLE user');
    }
}
