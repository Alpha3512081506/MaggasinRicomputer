<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210806095653 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE component ADD location_id INT DEFAULT NULL, ADD category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE component ADD CONSTRAINT FK_49FEA15764D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE component ADD CONSTRAINT FK_49FEA15712469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_49FEA15764D218E ON component (location_id)');
        $this->addSql('CREATE INDEX IDX_49FEA15712469DE2 ON component (category_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE component DROP FOREIGN KEY FK_49FEA15764D218E');
        $this->addSql('ALTER TABLE component DROP FOREIGN KEY FK_49FEA15712469DE2');
        $this->addSql('DROP INDEX IDX_49FEA15764D218E ON component');
        $this->addSql('DROP INDEX IDX_49FEA15712469DE2 ON component');
        $this->addSql('ALTER TABLE component DROP location_id, DROP category_id');
    }
}
