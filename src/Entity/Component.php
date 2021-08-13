<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ComponentRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ComponentRepository::class)
 * 
 *  @ApiResource(
 * normalizationContext= {"groups" = {"component_read"}},
 * denormalizationContext={"disable_type_enforcement"=true
 * ,"groups" = {"component_write"}}
 * 
 * )
 */
class Component
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"component_read","category_read","component_write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $productId;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $marque;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $specify;

    /**
     * @ORM\Column(type="integer")
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $quantity;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $grade;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="components")
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $location;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="components")
     *  @Groups({"component_read","category_read","component_write"})
     */
    private $category;

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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

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

    public function getSpecify(): ?string
    {
        return $this->specify;
    }

    public function setSpecify(string $specify): self
    {
        $this->specify = $specify;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

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
}
