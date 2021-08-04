<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProductDesktopRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/** 
 * @ORM\Entity(repositoryClass=ProductDesktopRepository::class)
 * @ApiResource(
 * normalizationContext= {"groups" = {"productd_read"}},
 * denormalizationContext={"disable_type_enforcement"=true
 * ,"groups" = {"productd_write"}}
 * 
 * )
 */
class ProductDesktop
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"productd_read","category_read","productd_write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $productId;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $marque;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $model;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $processor;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $ram;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $hdd;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $grade;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $price;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $priceb2b;

    /**
     * @ORM\Column(type="text", nullable=true)
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $note;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="productDesktops")
     *  @Groups({"productd_read","category_read","productd_write"})
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="productDesktops")
     *  @Groups({"productd_read","category_read","productd_write"})
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

    public function getProcessor(): ?string
    {
        return $this->processor;
    }

    public function setProcessor(?string $processor): self
    {
        $this->processor = $processor;

        return $this;
    }

    public function getRam(): ?string
    {
        return $this->ram;
    }

    public function setRam(?string $ram): self
    {
        $this->ram = $ram;

        return $this;
    }

    public function getHdd(): ?string
    {
        return $this->hdd;
    }

    public function setHdd(?string $hdd): self
    {
        $this->hdd = $hdd;

        return $this;
    }

    public function getGrade(): ?string
    {
        return $this->grade;
    }

    public function setGrade(?string $grade): self
    {
        $this->grade = $grade;

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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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
