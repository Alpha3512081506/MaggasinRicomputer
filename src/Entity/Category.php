<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 * @ApiResource(
 * normalizationContext={
 * "groups"={"category_read"}
 * }
 * )
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"category_read"})
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="category",cascade={"all"})
     * @Groups({"category_read"})
     *
     */
    private $products;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     * "category_read","product_read","printer_read",
     * "notebook_read","component_read","monitor_read"
     * })
     * @Assert\NotBlank(message="Il nome della categoria è obligatorio")
     * @Assert\Length(
     *      min = 4,
     *      max = 50,
     *      minMessage = "nom poi avere meno di {{ limit }} characters long",
     *      maxMessage = "Nom poi avere piu {{ limit }} characters"
     * )
     */
    private $categoryName;

    /**
     * @ORM\OneToMany(targetEntity=ProductDesktop::class, mappedBy="category")
     */
    private $productDesktops;

    /**
     * @ORM\OneToMany(targetEntity=NoteBook::class, mappedBy="category")
     */
    private $noteBooks;

    /**
     * @ORM\OneToMany(targetEntity=Monitor::class, mappedBy="category")
     */
    private $monitors;

    /**
     * @ORM\OneToMany(targetEntity=Printer::class, mappedBy="category")
     */
    private $printers;

    /**
     * @ORM\OneToMany(targetEntity=Component::class, mappedBy="category")
     */
    private $components;

    /**
     * @ORM\Column(type="integer", nullable=true)
     *  @Groups({"category_read"})
     * 
     */
    private $alertQuantity;

    public function __construct()
    {
        $this->products = new ArrayCollection();
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
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }

        return $this;
    }

    public function getCategoryName(): ?string
    {
        return $this->categoryName;
    }

    public function setCategoryName(string $categoryName): self
    {
        $this->categoryName = $categoryName;

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
            $productDesktop->setCategory($this);
        }

        return $this;
    }

    public function removeProductDesktop(ProductDesktop $productDesktop): self
    {
        if ($this->productDesktops->removeElement($productDesktop)) {
            // set the owning side to null (unless already changed)
            if ($productDesktop->getCategory() === $this) {
                $productDesktop->setCategory(null);
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
            $noteBook->setCategory($this);
        }

        return $this;
    }

    public function removeNoteBook(NoteBook $noteBook): self
    {
        if ($this->noteBooks->removeElement($noteBook)) {
            // set the owning side to null (unless already changed)
            if ($noteBook->getCategory() === $this) {
                $noteBook->setCategory(null);
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
            $monitor->setCategory($this);
        }

        return $this;
    }

    public function removeMonitor(Monitor $monitor): self
    {
        if ($this->monitors->removeElement($monitor)) {
            // set the owning side to null (unless already changed)
            if ($monitor->getCategory() === $this) {
                $monitor->setCategory(null);
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
            $printer->setCategory($this);
        }

        return $this;
    }

    public function removePrinter(Printer $printer): self
    {
        if ($this->printers->removeElement($printer)) {
            // set the owning side to null (unless already changed)
            if ($printer->getCategory() === $this) {
                $printer->setCategory(null);
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
            $component->setCategory($this);
        }

        return $this;
    }

    public function removeComponent(Component $component): self
    {
        if ($this->components->removeElement($component)) {
            // set the owning side to null (unless already changed)
            if ($component->getCategory() === $this) {
                $component->setCategory(null);
            }
        }

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
