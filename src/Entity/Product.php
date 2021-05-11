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
 * denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @UniqueEntity("productId")
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
     * 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"product_read","category_read"})
     * @Assert\NotBlank(message="productId del prodotto è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters"
     * )
     */
    private $productId;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"product_read","category_read"})
     * @Assert\NotBlank(message="Il nome del prodotto è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters"
     * )
     */
    private $productName;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"product_read", "category_read"})
     * @Assert\NotBlank
     * @Assert\Type(
     *     type="numeric",
     *     message="il valore {{ value }} non è un tipo valido {{ type }}."
     * )
     */
    private $currentQuantity;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"product_read", "category_read"})
     */
    private $alertQuanty;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"product_read"})
     * 
     */
    private $customField1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"product_read"})
     */
    private $customField2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"product_read"})
     */
    private $customField3;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"product_read"})
     */
    private $note;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\Date
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @ApiSubresource()
     * @Groups({"product_read"})
     * @Assert\NotBlank(message="la categoria del prodotto è obbligatoria")
     *  
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="prodcuts")
     * @ApiSubresource()
     * @Groups({"product_read"})
     * @Assert\NotBlank(message="la location del prodotto è obbligatoria")
     *  
     */
    private $location;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="products")
     * @Groups({"product_read"})
     *  
     */
    private $user;

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

    public function getProductName(): ?string
    {
        return $this->productName;
    }

    public function setProductName(string $productName): self
    {
        $this->productName = $productName;

        return $this;
    }

    public function getCurrentQuantity(): ?int
    {
        return $this->currentQuantity;
    }

    public function setCurrentQuantity($currentQuantity): self
    {
        $this->currentQuantity = $currentQuantity;

        return $this;
    }

    public function getAlertQuanty(): ?int
    {
        return $this->alertQuanty;
    }

    public function setAlertQuanty(?int $alertQuanty): self
    {
        $this->alertQuanty = $alertQuanty;

        return $this;
    }

    public function getCustomField1(): ?string
    {
        return $this->customField1;
    }

    public function setCustomField1(?string $customField1): self
    {
        $this->customField1 = $customField1;

        return $this;
    }

    public function getCustomField2(): ?string
    {
        return $this->customField2;
    }

    public function setCustomField2(?string $customField2): self
    {
        $this->customField2 = $customField2;

        return $this;
    }

    public function getCustomField3(): ?string
    {
        return $this->customField3;
    }

    public function setCustomField3(?string $customField3): self
    {
        $this->customField3 = $customField3;

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /** @PrePersist */
    public function createdAtPrePersist()
    {
        $this->createdAt = new \DateTime();
    }
}
