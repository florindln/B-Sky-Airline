package com.project.airline.model.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class TicketDTO {

    private Date buyDate;
    private String seat;
    private int userId;
    private int flightId;

}
