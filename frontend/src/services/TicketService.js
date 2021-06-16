import axios from 'axios';

const ticketUrl="http://localhost:8080/ticket";

// Add a request interceptor
axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user && user.Authorization){
      const token = user.Authorization;
      config.headers.Authorization =  token;
    }
  
    return config;
  });

class TicketService{

  checkSeatAvailable(seatNumber,flightId){
    return axios.get(ticketUrl+"/"+"seat"+"/"+seatNumber+"/"+flightId)
  }

    getAllTickets(){
        return axios.get(ticketUrl);
    }
    bookTicket(ticket){
        return axios.post(ticketUrl+"/book/ticket",ticket)
    }
   
}

export default new TicketService();