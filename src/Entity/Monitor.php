<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MonitorRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MonitorRepository::class)
 * @ApiResource(
 * normalizationContext= {"groups" = {"monitor_read"}},
 * denormalizationContext={"disable_type_enforcement"=true
 * ,"groups" = {"monitor_write"}} )
 */
class Monitor
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *  @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     *  @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $productId;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="monitors")
     *  @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $marca;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $model;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $grade;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $display;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $price;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     * @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $priceb2b;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="monitors")
     * @Groups({"monitor_read","category_read","monitor_write"})
     */
    private $location;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductId(): ?string
    {
        return $this->productId;
    }

    public function setProductId(string $productId): self
    {
        $this->productId = $productId;

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

    public function getMarca(): ?string
    {
        return $this->marca;
    }

    public function setMarca(string $marca): self
    {
        $this->marca = $marca;

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

    public function getGrade(): ?string
    {
        return $this->grade;
    }

    public function setGrade(string $grade): self
    {
        $this->grade = $grade;

        return $this;
    }

    public function getDisplay(): ?string
    {
        return $this->display;
    }

    public function setDisplay(string $display): self
    {
        $this->display = $display;

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

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(?Location $location): self
    {
        $this->location = $location;

        return $this;
    }
}
