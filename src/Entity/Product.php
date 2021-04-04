<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $productId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $productName;

    /**
     * @ORM\Column(type="integer")
     */
    private $currentQuantity;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $alertQuanty;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $customField1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $customField2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $customField3;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $note;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="prodcuts")
     */
    private $location;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductId(): ?int
    {
        return $this->productId;
    }

    public function setProductId(int $productId): self
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

    public function setCurrentQuantity(int $currentQuantity): self
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
}
