package com.project.airline.service;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.AirplaneDTO;
import com.project.airline.model.DTO.FlightDTO;
import com.project.airline.model.Flight;
import com.project.airline.model.Ticket;
import com.project.airline.model.User;
import com.project.airline.repository.airplane.AirplaneJpa;
import com.project.airline.repository.airplane.AirplaneRepository;
import com.project.airline.repository.airplane.AirplaneRepositoryJpa;
import com.project.airline.repository.flight.FlightRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FlightServiceTest {

    @Mock
    private FlightRepository flightRepository;

    @InjectMocks
    private FlightService flightService;

    @Mock
    private AirplaneRepositoryJpa airplaneRepositoryJpa;

    @Test
    void getFlightByFields() {
        String str="2015-03-31";
        Date date=Date.valueOf(str);//converting string into sql date
        String timeStr="12:00:00";
        Time time=Time.valueOf(timeStr);

        List<Flight> flights=new ArrayList<>();
        List<Ticket> tickets=new ArrayList<>();

        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);

        Flight flight=new Flight(99,date, time,time,"a","b",10,new ArrayList<Integer>(),tickets,a);
        List<Flight> flightList=new ArrayList<>(Arrays.asList(flight));

        when(flightRepository.findByOriginAndDestinationAndDepartureDate("a","b",date)).thenReturn(flightList);

        assertEquals( flightService.getFlightByFields("a","b",date),flightList);

    }

    @Test
    void getFlightByOrigin() {
        String str="2015-03-31";
        Date date=Date.valueOf(str);//converting string into sql date
        String timeStr="12:00:00";
        Time time=Time.valueOf(timeStr);

        List<Flight> flights=new ArrayList<>();
        List<Ticket> tickets=new ArrayList<>();

        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);

        Flight flight=new Flight(99,date, time,time,"a","there",10,new ArrayList<Integer>(),tickets,a);
        List<Flight> flightList=new ArrayList<>(Arrays.asList(flight));

        when(flightRepository.findByOrigin("a")).thenReturn(flightList);

        assertEquals( flightService.getFlightByOrigin("a"),flightList);


    }

    @Test
    void getAllFlights() {
        String str="2015-03-31";
        Date date=Date.valueOf(str);//converting string into sql date
        String timeStr="12:00:00";
        Time time=Time.valueOf(timeStr);

        List<Flight> flights=new ArrayList<>();
        List<Ticket> tickets=new ArrayList<>();

        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);
        Airplane b=new Airplane(2,"NoBrand","777Max",1,2,
                3,"Stand size plane","asfas",flights);
        Flight flight=new Flight(99,date, time,time,"here","there",10,new ArrayList<Integer>(),tickets,a);

        Flight flight2=new Flight(99,date, time,time,"here","there",10,new ArrayList<Integer>(),tickets,b);

        List<Flight> flightList=new ArrayList<>(Arrays.asList(flight,flight2));

        when(flightRepository.findAll()).thenReturn(flightList);

        assertEquals( flightService.getAllFlights(),flightList);


    }

    @Test
    void addFlight() {
        String str="2015-03-31";
        Date date=Date.valueOf(str);//converting string into sql date
        String timeStr="12:00:00";
        Time time=Time.valueOf(timeStr);

        List<Flight> flights=new ArrayList<>();
        List<Ticket> tickets=new ArrayList<>();

        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);
        Airplane b=new Airplane(2,"NoBrand","777Max",1,2,
                3,"Stand size plane","asfas",flights);
        Flight flight=new Flight(99,date, time,time,"here","there",10,new ArrayList<Integer>(),tickets,a);

        Flight flight2=new Flight(99,date, time,time,"here","there",10,new ArrayList<Integer>(),tickets,b);

        FlightDTO flightDto=new FlightDTO(date, time,time,"here","there",10,1);

        when(flightRepository.save(any(Flight.class))).thenReturn(flight);
        when(airplaneRepositoryJpa.getPlaneById(any(Integer.class))).thenReturn(a);

//        assertEquals( flightService.addFlight(flight),flight2);
        assertEquals( flightService.addFlight(flightDto),new Flight(99,date, time,time,"here","there",10,new ArrayList<Integer>(),tickets,a));
    }


}