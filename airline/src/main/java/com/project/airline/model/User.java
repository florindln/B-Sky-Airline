package com.project.airline.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String email;
    private String password;
    private float budget;
    private String role;

//    @JsonBackReference
    @OneToMany(mappedBy = "userChosen",cascade = CascadeType.ALL)
    private List<Ticket> tickets;

}
