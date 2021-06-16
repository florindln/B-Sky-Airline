package com.project.airline.service;

import com.project.airline.model.DTO.BookTicketDTO;
import com.project.airline.model.DTO.TicketDTO;
import com.project.airline.model.Flight;
import com.project.airline.model.Ticket;
import com.project.airline.model.User;
import com.project.airline.repository.flight.FlightRepository;
import com.project.airline.repository.ticket.TicketRepository;
import com.project.airline.repository.user.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.sql.Date;
import java.util.List;

@Service
public class TicketService {
    
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FlightRepository flightRepository;



    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }
    public Ticket getTicketById(int id){
        return ticketRepository.findById(id).orElse(null);
    }

    public List<Ticket> getTicketsByUser(int userId){
        User user=userRepository.getUserById(userId);
        return user.getTickets();
    }

    public boolean checkSeatAvailable(int number, int flightId){
        Flight flight= flightRepository.findById(flightId)
                .orElseThrow(()->new EntityNotFoundException("No flight found"));
        if (flight.getBookedSeats().contains(number) || flight.getAirplanePicked().getMaxCapacity()<number)
            return false;
        else
            return true;
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public AsyncResult<Ticket> bookTicket(BookTicketDTO bookTicketDTO) throws Exception {
        User user= userRepository.getUserById(bookTicketDTO.getUserId());
        Flight flight=flightRepository.findById(bookTicketDTO.getFlightId())
                .orElseThrow(()->new EntityNotFoundException("No flight found"));

        if(user.getBudget()<flight.getPrice())
            throw new Exception("Budget too low to book ticket");

        float newBudget=user.getBudget()-flight.getPrice();

        Ticket toReturn=new Ticket();
        toReturn.setSeat(bookTicketDTO.getSeatText());
        toReturn.setFlightChosen(flight);
        toReturn.setUserChosen(user);
        Date now=new Date(System.currentTimeMillis());
        toReturn.setBuyDate(now);

        if(!flight.getBookedSeats().contains(bookTicketDTO.getSeatNumber()))
            flight.getBookedSeats().add(bookTicketDTO.getSeatNumber());
        flightRepository.save(flight);

        userRepository.updateBudget(user.getUserId(),newBudget);

        return new AsyncResult<Ticket>(ticketRepository.save(toReturn));

//        return ticketRepository.save(toReturn);
    }

    public Ticket addTicket(TicketDTO details){

        User user=userRepository.getUserById(details.getUserId());
        Flight flight=flightRepository.findById(details.getFlightId()).orElse(null);

        if(user==null)
            throw new EntityNotFoundException("No user found");
        if(flight==null)
            throw new EntityNotFoundException("No flight found");

        Ticket toCreate=new Ticket();
        BeanUtils.copyProperties(details,toCreate);
        toCreate.setUserChosen(user);
        toCreate.setFlightChosen(flight);

        return ticketRepository.save(toCreate);

    }

    public Ticket updateTicket(int id,TicketDTO details) throws NotFoundException {
        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(()->new NotFoundException("Ticket with id "+id+" not found"));

        User user=userRepository.getUserById(details.getUserId());
        Flight flight=flightRepository.findById(details.getFlightId()).orElse(null);

        if(user==null)
            throw new NotFoundException("No user found");
        if(flight==null)
            throw new NotFoundException("No flight found");


        existingTicket.setBuyDate(details.getBuyDate());
        existingTicket.setSeat(details.getSeat());
        existingTicket.setFlightChosen(flight);
        existingTicket.setUserChosen(user);

        return ticketRepository.save(existingTicket);

    }

    public String deleteTicket(int id){
        ticketRepository.deleteById(id);
        return "Ticket with id "+id+" removed";
    }
}
