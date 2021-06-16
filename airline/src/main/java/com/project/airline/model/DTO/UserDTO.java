package com.project.airline.model.DTO;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Data
@AllArgsConstructor
public class UserDTO {

    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String email;
    private String password;
    private float budget;
    private String role;
}
