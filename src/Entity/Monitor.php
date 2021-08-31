<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MonitorRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=MonitorRepository::class)
 * @ApiResource(
 * normalizationContext= {"groups" = {"monitor_read"}},
 * denormalizationContext={"disable_type_enforcement"=true
 * ,"groups" = {"monitor_write"}} )
 * 
 * @UniqueEntity(
 *     fields={"productId"},
 *     message="Questo Prodotto è già registrato!"
 * )
 */
class Monitor
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *  @Groups({"monitor_read","location_read","monitor_write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     *  @Groups({"monitor_read","location_read","monitor_write"})
     *  @Assert\NotBlank(message="productId del prodotto è obligatorio")
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
     *  @Groups({"monitor_read","location_read","monitor_write"})
     * @Assert\NotBlank(message="la marca del prodotto è obligatorio")

     */
    private $marca;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"monitor_read","location_read","monitor_write"})
     *  @Assert\NotBlank(message="Il modello del prodotto è obligatorio")

     */
    private $model;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"monitor_read","location_read","monitor_write"})
     * @Assert\NotBlank(message="Il grado del prodotto è obligatorio")

     */
    private $grade;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"monitor_read","location_read","monitor_write"})
     *  @Assert\NotBlank(message="lo schermo del prodotto è obligatorio")

     */
    private $display;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"monitor_read","location_read","monitor_write"})
     */
    private $price;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     * @Groups({"monitor_read","location_read","monitor_write"})
     */
    private $priceb2b;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="monitors")
     * @Groups({"monitor_read","location_read","monitor_write"})
     */
    private $location;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"monitor_read","location_read","monitor_write"})
     */
    private $note;

   

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

 

    public function getMarca(): ?string
    {
        return $this->marca;
    }

    public function setMarca(string $marca): self
    {
        $this->marca = $marca;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): self
    {
        $this->model = $model;

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

    public function getDisplay(): ?string
    {
        return $this->display;
    }

    public function setDisplay(string $display): self
    {
        $this->display = $display;

        return $this;
    }

  

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPriceb2b(): ?float
    {
        return $this->priceb2b;
    }

    public function setPriceb2b(?float $priceb2b): self
    {
        $this->priceb2b = $priceb2b;

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

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): self
    {
        $this->note = $note;

        return $this;
    }

}
