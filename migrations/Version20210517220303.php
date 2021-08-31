<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210517220303 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
       // $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD7A45358C');
        //$this->addSql('DROP INDEX IDX_D34A04AD7A45358C ON product');
       // $this->addSql('ALTER TABLE product DROP groupe_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product ADD groupe_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD7A45358C FOREIGN KEY (groupe_id) REFERENCES `group` (id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD7A45358C ON product (groupe_id)');
    }
}
