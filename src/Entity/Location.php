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
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="location",cascade={"persist"})
     * @Groups({"location_read"})
     *
     */
    private $prodcuts;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     * "location_read", "productd_read",
     * "printer_read",
     * "notebook_read","component_read","monitor_read"
     * })
     * @Assert\NotNull(message="Il nome della location è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters")
     */
    private $locationName;

    /**
     * @ORM\OneToMany(targetEntity=ProductDesktop::class, mappedBy="location")
     */
    private $productDesktops;

    /**
     * @ORM\OneToMany(targetEntity=NoteBook::class, mappedBy="location")
     */
    private $noteBooks;

    /**
     * @ORM\OneToMany(targetEntity=Monitor::class, mappedBy="location")
     */
    private $monitors;

    /**
     * @ORM\OneToMany(targetEntity=Printer::class, mappedBy="location")
     */
    private $printers;

    /**
     * @ORM\OneToMany(targetEntity=Component::class, mappedBy="location")
     */
    private $components;

    public function __construct()
    {
        $this->prodcuts = new ArrayCollection();
        $this->productDesktops = new ArrayCollection();
        $this->noteBooks = new ArrayCollection();
        $this->monitors = new ArrayCollection();
        $this->printers = new ArrayCollection();
        $this->components = new ArrayCollection();
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

    /**
     * @return Collection|ProductDesktop[]
     */
    public function getProductDesktops(): Collection
    {
        return $this->productDesktops;
    }

    public function addProductDesktop(ProductDesktop $productDesktop): self
    {
        if (!$this->productDesktops->contains($productDesktop)) {
            $this->productDesktops[] = $productDesktop;
            $productDesktop->setLocation($this);
        }

        return $this;
    }

    public function removeProductDesktop(ProductDesktop $productDesktop): self
    {
        if ($this->productDesktops->removeElement($productDesktop)) {
            // set the owning side to null (unless already changed)
            if ($productDesktop->getLocation() === $this) {
                $productDesktop->setLocation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|NoteBook[]
     */
    public function getNoteBooks(): Collection
    {
        return $this->noteBooks;
    }

    public function addNoteBook(NoteBook $noteBook): self
    {
        if (!$this->noteBooks->contains($noteBook)) {
            $this->noteBooks[] = $noteBook;
            $noteBook->setLocation($this);
        }

        return $this;
    }

    public function removeNoteBook(NoteBook $noteBook): self
    {
        if ($this->noteBooks->removeElement($noteBook)) {
            // set the owning side to null (unless already changed)
            if ($noteBook->getLocation() === $this) {
                $noteBook->setLocation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Monitor[]
     */
    public function getMonitors(): Collection
    {
        return $this->monitors;
    }

    public function addMonitor(Monitor $monitor): self
    {
        if (!$this->monitors->contains($monitor)) {
            $this->monitors[] = $monitor;
            $monitor->setLocation($this);
        }

        return $this;
    }

    public function removeMonitor(Monitor $monitor): self
    {
        if ($this->monitors->removeElement($monitor)) {
            // set the owning side to null (unless already changed)
            if ($monitor->getLocation() === $this) {
                $monitor->setLocation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Printer[]
     */
    public function getPrinters(): Collection
    {
        return $this->printers;
    }

    public function addPrinter(Printer $printer): self
    {
        if (!$this->printers->contains($printer)) {
            $this->printers[] = $printer;
            $printer->setLocation($this);
        }

        return $this;
    }

    public function removePrinter(Printer $printer): self
    {
        if ($this->printers->removeElement($printer)) {
            // set the owning side to null (unless already changed)
            if ($printer->getLocation() === $this) {
                $printer->setLocation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Component[]
     */
    public function getComponents(): Collection
    {
        return $this->components;
    }

    public function addComponent(Component $component): self
    {
        if (!$this->components->contains($component)) {
            $this->components[] = $component;
            $component->setLocation($this);
        }

        return $this;
    }

    public function removeComponent(Component $component): self
    {
        if ($this->components->removeElement($component)) {
            // set the owning side to null (unless already changed)
            if ($component->getLocation() === $this) {
                $component->setLocation(null);
            }
        }

        return $this;
    }
}
