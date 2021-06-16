package com.project.airline.service;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.BookTicketDTO;
import com.project.airline.model.DTO.TicketDTO;
import com.project.airline.model.Flight;
import com.project.airline.model.Ticket;
import com.project.airline.model.User;
import com.project.airline.repository.flight.FlightRepository;
import com.project.airline.repository.ticket.TicketRepository;
import com.project.airline.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.scheduling.annotation.AsyncResult;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    @Mock
    private FlightRepository flightRepository;

    @Mock
    private UserRepository userRepository;

    @Test
    void checkSeatAvailable() {
        String str="2015-03-31";
        Date date=Date.valueOf(str);//converting string into sql date
        String timeStr="12:00:00";
        Time time=Time.valueOf(timeStr);
        List<Ticket> tickets=new ArrayList<>();
        List<Flight> flights=new ArrayList<>();
        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);

        Flight flight=new Flight(99,date, time,time,"a","b",10,new ArrayList<Integer>(),tickets,a);

        when(flightRepository.findById(any(Integer.class))).thenReturn(java.util.Optional.of(flight));

        assertEquals(ticketService.checkSeatAvailable(2,1),true);

    }

    @Test
    void bookTicket() throws Exception {
        Date smth = Date.valueOf("2015-03-31");
        List<Ticket> tickets=new ArrayList<>();
        User tester1 = new User(99, "Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);


        String str="2015-03-31";
        Date date=Date.valueOf(str);//converting string into sql date
        String timeStr="12:00:00";
        Time time=Time.valueOf(timeStr);
        List<Flight> flights=new ArrayList<>();
        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);
        Flight flight=new Flight(99,date, time,time,"a","b",10,new ArrayList<Integer>(),tickets,a);

        BookTicketDTO bookTicketDTO=new BookTicketDTO();
        bookTicketDTO.setFlightId(99);
        bookTicketDTO.setUserId(99);
        float newBudget=tester1.getBudget()-flight.getPrice();

        Ticket toReturn=new Ticket();
        toReturn.setSeat(bookTicketDTO.getSeatText());
        toReturn.setFlightChosen(flight);
        toReturn.setUserChosen(tester1);
        Date now=new Date(System.currentTimeMillis());
        toReturn.setBuyDate(now);
        flight.getBookedSeats().add(bookTicketDTO.getSeatNumber());

        assertEquals(toReturn.getBuyDate(),now);
        assertEquals(toReturn.getFlightChosen(),flight);
        assertEquals(toReturn.getUserChosen(),tester1);
    }
}