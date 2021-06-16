package com.project.airline.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirplaneDTO {

    private String brand;
    private String model;
    private int topSpeed;
    private int maxCapacity;
    private int fuelConsumptionPer100Km;
    private String description;
    private String imageUrl;
}
