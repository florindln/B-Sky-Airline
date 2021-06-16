package com.project.airline.emailSender;

import com.project.airline.model.Flight;
import com.project.airline.model.Ticket;
import com.project.airline.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@EnableScheduling
@Component
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TicketService ticketService;

    public void sendSimpleMessage(
            String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@bsky.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    @Scheduled(fixedDelay = 1000*60*60*24) //1000 is 1 second
    public void remindFlight(){
        List<Ticket> allTickets=ticketService.getAllTickets();
        for(Ticket ticket:allTickets){
            LocalDate departureDate=ticket.getFlightChosen().getDepartureDate().toLocalDate();
            LocalDate today = new Date(System.currentTimeMillis()).toLocalDate();
            int comparison=departureDate.compareTo(today);
            if(comparison==0) {
                Flight flight=ticket.getFlightChosen();
                sendSimpleMessage(ticket.getUserChosen().getEmail(), "Flight reminder",
                        "Your flight from from " +flight.getOrigin()+" to "+flight.getDestination()+" is today");
                System.err.println("Your flight from from " +flight.getOrigin()+" to "+flight.getDestination()+" is today");
            }
        }

    }

}
