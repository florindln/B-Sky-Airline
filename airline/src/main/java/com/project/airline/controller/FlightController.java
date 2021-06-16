package com.project.airline.controller;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.FlightDTO;
import com.project.airline.model.Flight;
import com.project.airline.model.Ticket;
import com.project.airline.service.FlightService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/flight")
public class FlightController {

    @Autowired
    FlightService flightService;

    @GetMapping("/{id}")
    public Flight getFlightById(@PathVariable(value = "id") int id) {
        return flightService.getFlightById(id);
    }

    @GetMapping("/fields/{origin}/{destination}/{departureDate}")
    public List<Flight> getFlightByConstraints(@PathVariable String origin, @PathVariable String destination, @PathVariable Date departureDate){
        return flightService.getFlightByFields(origin,destination,departureDate);
    }

    @GetMapping("/fields/{origin}/{destination}")
    public List<Flight> getFlightByOrigDest(@PathVariable String origin, @PathVariable String destination){
        return flightService.getFlightByOrigDest(origin,destination);
    }

    @GetMapping("/fields/{origin}")
    public List<Flight> getFlightByOrigin(@PathVariable("origin") String origin){
        return flightService.getFlightByOrigin(origin);
    }

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @DeleteMapping("/{id}")
    public String deleteFlight(@PathVariable int id) {
        return flightService.deleteFlight(id);

    }

    @PostMapping()
    public Flight createFlight(@RequestBody FlightDTO details) {
        return flightService.addFlight(details);
    }



    @PutMapping("/{id}")
    public void updateFlight(@PathVariable int id,@RequestBody FlightDTO details ) throws NotFoundException {
        flightService.updateFlight(id,details);
    }
}
