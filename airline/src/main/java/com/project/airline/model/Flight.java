package com.project.airline.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "flight")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flightId;


    private Date departureDate;
    private Time departureTime;
    private Time arrivalTime;
    private String origin;
    private String destination;
    private float price;

    @ElementCollection
    @CollectionTable(name = "bookedSeat",joinColumns = @JoinColumn(name = "flightId"))
    private List<Integer> bookedSeats;


    @JsonBackReference
    @OneToMany(mappedBy = "flightChosen",cascade = CascadeType.ALL)
    private List<Ticket> tickets;

//    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "airplane_id",nullable = false)
    Airplane airplanePicked;


}
