package com.project.airline.repository.flight;

import com.project.airline.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight,Integer> {
    public List<Flight> findByOrigin(String origin);
    public List<Flight> findByOriginAndDestination(String origin,String destination);
    public List<Flight> findByOriginAndDestinationAndDepartureDate(String origin, String Destination, Date departure);
}
