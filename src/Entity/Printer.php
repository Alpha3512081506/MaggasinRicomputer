<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PrinterRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PrinterRepository::class)
 * 
 *  @ApiResource(
 * normalizationContext= {"groups" = {"printer_read"}},
 * denormalizationContext={"disable_type_enforcement"=true
 * ,"groups" = {"printer_write"}}
 * 
 * )
 */
class Printer
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $id;

    

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $marque;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $model;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $paper;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $connector;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $tonner;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $grade;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $format;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $price;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $priceb2b;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $note;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="printers")
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $location;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="printers")
     * @Groups({"printer_read","category_read","printer_write"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *  @Groups({"printer_read","category_read","printer_write"})
     */
    private $productId;

    public function getId(): ?int
    {
        return $this->id;
    }

   

   

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(string $marque): self
    {
        $this->marque = $marque;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): self
    {
        $this->model = $model;

        return $this;
    }

    public function getPaper(): ?string
    {
        return $this->paper;
    }

    public function setPaper(string $paper): self
    {
        $this->paper = $paper;

        return $this;
    }

    public function getConnector(): ?string
    {
        return $this->connector;
    }

    public function setConnector(?string $connector): self
    {
        $this->connector = $connector;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getTonner(): ?string
    {
        return $this->tonner;
    }

    public function setTonner(string $tonner): self
    {
        $this->tonner = $tonner;

        return $this;
    }

    public function getGrade(): ?string
    {
        return $this->grade;
    }

    public function setGrade(string $grade): self
    {
        $this->grade = $grade;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(string $format): self
    {
        $this->format = $format;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPriceb2b(): ?float
    {
        return $this->priceb2b;
    }

    public function setPriceb2b(?float $priceb2b): self
    {
        $this->priceb2b = $priceb2b;

        return $this;
    }

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): self
    {
        $this->note = $note;

        return $this;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(?Location $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getProductId(): ?string
    {
        return $this->productId;
    }

    public function setProductId(?string $productId): self
    {
        $this->productId = $productId;

        return $this;
    }
}
