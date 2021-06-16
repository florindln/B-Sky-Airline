import axios from "axios";

const flights_url = "http://localhost:8080/flight";

class FlightService {
  getAllFlights() {
    return axios.get(flights_url);
  }

 
  deleteFlight(id){
    return axios.delete(flights_url+"/"+id)
  }

  addFlight(flight) {
    return axios.post(flights_url, flight);
  }
  getFlightById(id) {
    return axios.get(flights_url + "/" + id);
  }
  updateFlightById(id, flight) {
    return axios.put(flights_url + "/" + id, flight);
  }

  getFlightByOrigin(origin) {
    return axios.get(flights_url + "/fields/" + origin);
  }

  getFlightByOrigDest(origin, destination) {
    return axios.get(flights_url + "/fields/" + origin + "/" + destination);
  }

  getFlightByFields(origin, destination, departure) {
    return axios.get(
      flights_url + "/fields/" + origin + "/" + destination + "/" + departure
    );
  }
}

export default new FlightService();
