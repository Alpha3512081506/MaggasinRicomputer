<?php

namespace App\Entity;

use App\Repository\LocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LocationRepository::class)
 */
class Location
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="location")
     */
    private $prodcuts;

    public function __construct()
    {
        $this->prodcuts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Product[]
     */
    public function getProdcuts(): Collection
    {
        return $this->prodcuts;
    }

    public function addProdcut(Product $prodcut): self
    {
        if (!$this->prodcuts->contains($prodcut)) {
            $this->prodcuts[] = $prodcut;
            $prodcut->setLocation($this);
        }

        return $this;
    }

    public function removeProdcut(Product $prodcut): self
    {
        if ($this->prodcuts->removeElement($prodcut)) {
            // set the owning side to null (unless already changed)
            if ($prodcut->getLocation() === $this) {
                $prodcut->setLocation(null);
            }
        }

        return $this;
    }
}
