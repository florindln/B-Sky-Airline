package com.project.airline.controller;

import com.project.airline.model.DTO.BookTicketDTO;
import com.project.airline.model.DTO.TicketDTO;
import com.project.airline.model.Ticket;
import com.project.airline.service.TicketService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    TicketService ticketService;


    @GetMapping("/seat/{seatNumber}/{flightId}")
    public boolean checkSeatAvailable(@PathVariable int seatNumber,@PathVariable int flightId){
        return ticketService.checkSeatAvailable(seatNumber,flightId);
    }


    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable(value = "id") int id) {
        return ticketService.getTicketById(id);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

//    @GetMapping("/ticketsByUser/{id}")
//    public List<Ticket> getTicketsByUser(@PathVariable int userId){
//        return ticketService.getTicketsByUser(userId);
//    }

    @DeleteMapping("/{id}")
    public String deleteTicket(@PathVariable int id) {
        return ticketService.deleteTicket(id);
    }

    @PostMapping("/book/ticket")
    public AsyncResult<Ticket> bookTicket(@RequestBody BookTicketDTO details) throws Exception {
        return ticketService.bookTicket(details);
    }

    @PostMapping()
    public Ticket createTicket(@RequestBody TicketDTO details) {
        return ticketService.addTicket(details);
    }

    @PutMapping("/{id}")
    public void updateTicket(@PathVariable int id,@RequestBody TicketDTO details ) throws NotFoundException {
        ticketService.updateTicket(id,details);
    }
}
