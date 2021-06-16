package com.project.airline.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "airplane")
//@JsonIgnoreProperties({"flights"})
public class Airplane {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int airplaneId;

    private String brand;
    private String model;
    private int topSpeed;
    private int maxCapacity;
    private int fuelConsumptionPer100Km;
    private String description;
    private String imageUrl;

    @JsonBackReference
    @OneToMany(mappedBy = "airplanePicked",cascade = CascadeType.ALL)
    List<Flight> flights;

}
