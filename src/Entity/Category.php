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
     * @Groups({"category_read","product_read"})
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

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->productDesktops = new ArrayCollection();
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
}
