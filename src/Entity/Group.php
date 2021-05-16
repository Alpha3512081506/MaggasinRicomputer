<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\GroupRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;


/**
 * @ORM\Entity(repositoryClass=GroupRepository::class)
 * @ORM\Table(name="`group`")
 * @ApiResource
 * }
 * )
 */
class Group
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nameGroup;

    /**
     * @ORM\Column(type="decimal", nullable=true)
     */
    private $currentQuantity;

    /**
     * @ORM\Column(type="decimal", nullable=true)
     */
    private $alertQuantity;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="groupe")
     */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameGroup(): ?string
    {
        return $this->nameGroup;
    }

    public function setNameGroup(string $nameGroup): self
    {
        $this->nameGroup = $nameGroup;

        return $this;
    }

    public function getCurrentQuantity(): ?int
    {
        return $this->currentQuantity;
    }

    public function setCurrentQuantity(?int $currentQuantity): self
    {
        $this->currentQuantity = $currentQuantity;

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

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setGroupe($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getGroupe() === $this) {
                $product->setGroupe(null);
            }
        }

        return $this;
    }
}
