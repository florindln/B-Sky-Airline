import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useEffect, useState } from "react";
import FlightService from "../../../services/FlightService";
import BootstrapTable from "react-bootstrap-table-next";
import "moment-duration-format";
import "moment";
import "./FlightsPage.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

// import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
// import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

function FlightsPage(props) {
  useEffect(() => {
    // FlightService.getAllFlights().then((response) => {
    //   setFlights(response.data);
    // });

    // setFlights(props.location.state.flights);
    // handleSearchOrigin()

    // if(typeof destination!=="undefined" || typeof departure!=="undefined")
    //   {
    //     handleSearchAllFields()
    //   }
    // else{handleSearchOrigin()}

    if (typeof dest !== "undefined") {
      if (typeof depart !== "undefined") {
        handleSearchAllFields();
      } else {
        handleSearchOrigDest();
      }
    } else {
      handleSearchOrigin();
    }
  }, []);

  const [isOriginKnown, setIsOriginKnown] = useState(false);
  const [isDestinationKnown, setIsDestinationKnown] = useState(false);
  const [isDepartureDateKnown, setIsDepartureDateKnown] = useState(false);

  // const origin = props.match.params.origin;
  // const destination = props.match.params.destination;
  // const departure = props.match.params.departure;
  // console.log(origin+" "+destination+" "+departure)

  const [origin, setOrigin] = useState(props.match.params.origin);
  const [dest, setDest] = useState(props.match.params.destination);
  const [depart, setDepart] = useState(props.match.params.departure);

  const handleSearchOrigDest = () => {
    FlightService.getFlightByOrigDest(origin, dest).then((response) => {
      setFlights(response.data);
      setIsDestinationKnown(true);
      setIsOriginKnown(true);
    });
  };

  const handleSearchAllFields = () => {
    FlightService.getFlightByFields(origin, dest, depart).then((response) => {
      setFlights(response.data);
      setIsDestinationKnown(true);
      setIsDepartureDateKnown(true);
      setIsOriginKnown(true);
    });
  };

  const handleSearchOrigin = () => {
    FlightService.getFlightByOrigin(origin).then((response) => {
      setFlights(response.data);
      setIsOriginKnown(true);
    });
  };

  // const params=useParams();
  // console.log(params);
  // const retrieveData=(props)=>{
  //   console.log(props.flights)
  // }

  // retrieveData(props)

  const [flights, setFlights] = useState([]);

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      >
        <button
          type="button"
          class="btn btn-info"
          id={row.flightId}
          onClick={() => {
            changePage(row.flightId);
          }}
        >
          Book
        </button>
      </div>
    );
  }

  // console.log(flights);
  const columns = [
    !isDestinationKnown
      ? {
          dataField: "destination",
          text: "destination",
          sort: true,
        }
      : "",
    !isDepartureDateKnown && {
      dataField: "departureDate",
      text: "Departure Date",
      sort: true,
    },
    {
      dataField: "departureTime",
      text: "Departure Time",
      sort: true,
    },
    {
      dataField: "arrivalTime",
      text: "Arrival Time",
      sort: true,
    },
    {
      dataField: "duration",
      text: "Flight Duration",
      sort: true,
    },
    {
      dataField: "price",
      text: "Flight Price €",
      //   filter: numberFilter()
      sort: true,
    },
    {
      dataField: "bookFlight",
      text: "Book Flight",
      sort: false,
      formatter: rankFormatter,
    },
  ];

  const addDurationToEachFlight = (flights) => {
    flights.map((flight) => {
      //   console.log(        flight.id + " id " + flight.arrivalTime + " and " + flight.departureTime      );
      var arrival = flight.arrivalTime;
      var departure = flight.departureTime;

      var ms = moment(arrival, "HH:mm:ss").diff(moment(departure, "HH:mm:ss"));
      var d = moment.duration(ms);
      var result = d.format("hh:mm");

      //   console.log("result"+result)

      flight.duration = result;
    });
  };

  const selectFlightById = (id) => {
    var flightNeeded;
    flights.map((flight) => {
      if (flight.flightId == id) {
        flightNeeded = flight;
      }
    });
    return flightNeeded;
  };

  const history = useHistory();

  const changePage = (theId) => {
    var flightNeeded = selectFlightById(theId);
    // console.log(flightNeeded)

    history.push({
      pathname: "/ticket/book/" + theId,
      state: {
        flightSent: flightNeeded,
      },
    });
  };

  return (
    <div>
      {/* <button onClick={()=>{changePage()}}>buttn</button> */}
      <div className="">
        <div className="container ">
          <div className="row justify-content-center h2">Flights from:</div>
          <div className="row justify-content-center h3">
            {isOriginKnown && flights[0].origin}
            {isDestinationKnown && " to " + flights[0].destination}
            {isDepartureDateKnown && " on " + flights[0].departureDate}
          </div>
        </div>
      </div>
      <div style={{ "overflow-x": "auto" }}>
        <BootstrapTable
          keyField="id"
          bootstrap4={true}
          data={flights}
          columns={columns}
        />
        {addDurationToEachFlight(flights)}
      </div>
    </div>
  );
}

export default FlightsPage;
