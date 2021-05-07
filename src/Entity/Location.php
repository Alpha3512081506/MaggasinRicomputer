<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\LocationRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=LocationRepository::class)
 * @ApiResource(
 * normalizationContext= {
 * "groups" = {"location_read"}}
 * )
 */
class Location
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"location_read"})
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="location")
     * @Groups({"location_read"})
     *
     */
    private $prodcuts;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"location_read", "product_read"})
     * @Assert\NotNull(message="Il nome della location è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters")
     */
    private $locationName;

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

    public function getLocationName(): ?string
    {
        return $this->locationName;
    }

    public function setLocationName(string $locationName): self
    {
        $this->locationName = $locationName;

        return $this;
    }
}
