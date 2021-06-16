package com.project.airline.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketId;

    private Date buyDate;
    private String seat;

//    @JsonManagedReference
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User userChosen;

//    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "flight_id",nullable = false)
    private Flight flightChosen;

}
