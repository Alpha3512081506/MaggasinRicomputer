<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210816220558 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE printer CHANGE product_id product_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE product ADD ram VARCHAR(255) DEFAULT NULL, ADD hdd VARCHAR(255) DEFAULT NULL, ADD screen VARCHAR(255) DEFAULT NULL, ADD processor VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE printer CHANGE product_id product_id VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE product DROP ram, DROP hdd, DROP screen, DROP processor');
    }
}
