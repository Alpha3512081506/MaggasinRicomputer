<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ComponentRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=ComponentRepository::class)
 * 
 *  @ApiResource(
 * normalizationContext= {"groups" = {"component_read"}},
 * denormalizationContext={"disable_type_enforcement"=true
 * ,"groups" = {"component_write"}}
 * 
 * )
 * @UniqueEntity(
 *     fields={"productId"},
 *     message="Questo Prodotto è già registrato!"
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
     *   @Assert\NotBlank(message="productId del prodotto è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "l'id del prodotto non può essere vuoto et nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters"
     * )
     */
    private $productId;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"component_read","category_read","component_write"})
     * @Assert\NotBlank(message="Il tipo del prodotto è obligatorio")
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"component_read","category_read","component_write"})
     * @Assert\NotBlank(message="Il marca del prodotto è obligatorio")
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
     * @Assert\NotBlank(message="la quantità dei prodotti è obligatorio")
     */
    private $quantity;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"component_read","category_read","component_write"})
     * @Assert\NotBlank(message="Il grado del prodotto è obligatorio")
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

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $alertQuantity;

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

    public function getAlertQuantity(): ?int
    {
        return $this->alertQuantity;
    }

    public function setAlertQuantity(?int $alertQuantity): self
    {
        $this->alertQuantity = $alertQuantity;

        return $this;
    }
}
