package com.project.airline.service;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.FlightDTO;
import com.project.airline.model.Flight;
import com.project.airline.model.User;
import com.project.airline.repository.airplane.AirplaneRepository;
import com.project.airline.repository.flight.FlightRepository;
import com.project.airline.repository.user.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.sql.Date;
import java.util.List;

@Service
public class FlightService {

    @Autowired
    FlightRepository flightRepository;

    @Autowired
    private AirplaneRepository airplaneRepository;

    @Autowired
    UserRepository userRepository;



    public List<Flight> getFlightByFields(String origin, String destination, Date departure){
        return flightRepository.findByOriginAndDestinationAndDepartureDate(origin,destination,departure);
    }

    public List<Flight> getFlightByOrigDest(String origin, String destination){
        return flightRepository.findByOriginAndDestination(origin,destination);
    }



    public List<Flight> getFlightByOrigin(String origin){
        return flightRepository.findByOrigin(origin);
    }

    public List<Flight> getAllFlights(){
        return flightRepository.findAll();
    }
    public Flight getFlightById(int id){
        return flightRepository.findById(id).orElse(null);
    }
    public Flight addFlight(FlightDTO flightDTO){

        Airplane airplane=airplaneRepository.getPlaneById(flightDTO.getAirplaneId());
        if(airplane==null)
            throw new EntityNotFoundException("No airplane found");

        Flight toCreate=new Flight();
        BeanUtils.copyProperties(flightDTO,toCreate);
        toCreate.setAirplanePicked(airplane);

        return flightRepository.save(toCreate);

    }

    public Flight updateFlight(int id,FlightDTO details) throws NotFoundException {
        Flight existingFlight = flightRepository.findById(id)
                .orElseThrow(()->new NotFoundException("Flight with id "+id+" not found"));

        Airplane airplane=airplaneRepository.getPlaneById(details.getAirplaneId());
        if(airplane==null)
            throw new NotFoundException("No airplane found");

        existingFlight.setArrivalTime(details.getArrivalTime());
        existingFlight.setDepartureDate(details.getDepartureDate());
        existingFlight.setDestination(details.getDestination());
        existingFlight.setOrigin(details.getOrigin());
        existingFlight.setDepartureTime(details.getDepartureTime());
        existingFlight.setPrice(details.getPrice());
        existingFlight.setAirplanePicked(airplane);

        return flightRepository.save(existingFlight);

    }

    public String deleteFlight(int id){
        flightRepository.deleteById(id);
        return "Flight with id "+id+" removed";
    }
}
