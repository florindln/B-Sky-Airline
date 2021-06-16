package com.project.airline.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
@AllArgsConstructor
public class FlightDTO {
    private Date departureDate;
    private Time departureTime;
    private Time arrivalTime;
    private String origin;
    private String destination;
    private float price;
    private int airplaneId;
}
