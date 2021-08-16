<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\PrePersist;
use App\Repository\ProductRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ApiResource(
 * normalizationContext= {"groups" = {"product_read"}},
 * denormalizationContext={"disable_type_enforcement"=true
 * ,"groups" = {"product_write"}}
 * 
 * )
 * @UniqueEntity(
 *     fields={"productId"},
 *     message="Questo Prodotto è già registrato!"
 * )
 * @HasLifecycleCallbacks
 * 
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"product_read"})
     * @Groups({"product_read","category_read","product_write"})
     * 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"product_read","category_read","product_write"})
     * @Assert\NotBlank(message="productId del prodotto è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "l'id del prodotto non può essere vuoto et nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters"
     * )
     */
    private $productId;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"product_read","category_read","product_write"})
     * @Assert\NotBlank(message="Il nome del prodotto è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "il marque  del prodotto non può essere vuoto et nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters"
     * )
     */
    private $marque;

    /**
     * @ORM\Column(type="decimal")
     * @Groups({"product_read", "category_read","product_write"})
     * @Assert\NotBlank
     * @Assert\Type(
     *     type="numeric",
     *     message="il valore {{ value }} non è un tipo valido {{ type }}."
     * )
     */
    private $priceb2b;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"product_read","product_write"})
     */
    private $model;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"product_read","product_write"})
     */
    private $note;

    // /**
    //  * @ORM\Column(type="datetime")
    //  * @Assert\Date
    //  */
    // private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @ApiSubresource()
     * @Groups({"product_read","product_write",})
     * @Assert\NotBlank(message="la categoria del prodotto è obbligatoria")
     *  
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="prodcuts",)
     * @ApiSubresource()
     * @Groups({"product_read","product_write","category_read"})
     * @Assert\NotBlank(message="la location del prodotto è obbligatoria")
     *  
     */
    private $location;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="products")
     * @Groups({"product_read","product_write"})
     *  
     */
    private $user;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     *  @Groups({"product_read","product_write"})
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *  @Groups({"product_read","category_read","product_write"})
     */
    private $ram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *  @Groups({"product_read","category_read","product_write"})
     */
    private $hdd;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *   @Groups({"product_read","category_read","product_write"})
     */
    private $screen;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *   @Groups({"product_read","category_read","product_write"})
     */
    private $processor;

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

    public function getPriceb2b(): ?int
    {
        return $this->priceb2b;
    }

    public function setPriceb2b($priceb2b): self
    {
        $this->priceb2b = $priceb2b;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(?string $model): self
    {
        $this->model = $model;

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

    // public function getCreatedAt(): ?\DateTimeInterface
    // {
    //     return $this->createdAt;
    // }

    // public function setCreatedAt(\DateTimeInterface $createdAt): self
    // {
    //     $this->createdAt = $createdAt;

    //     return $this;
    // }

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    // /** @PrePersist */
    // public function createdAtPrePersist()
    // {
    //     $this->createdAt = new \DateTime();
    // }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /** @PrePersist */
    public function pricePrePersist()
    {
        if (!$this->price) {
            $this->price = 000.00;
        }
    }
    /** @PrePersist */
    public function prezzoPrePersist()
    {
        if (!$this->priceb2b) {
            $this->priceb2b = 000.00;
        }
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

    public function getScreen(): ?string
    {
        return $this->screen;
    }

    public function setScreen(string $screen): self
    {
        $this->screen = $screen;

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
}
