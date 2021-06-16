import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useEffect, useState } from "react";
import FlightService from "../../../services/FlightService";
import BootstrapTable from "react-bootstrap-table-next";
import "moment-duration-format";
import "moment";
// import "./FlightsPage.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FlightCard from "../../BookTicket/FlightCard";

// import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
// import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

function FlightHistory(props) {
  useEffect(() => {
    setTickets(props.user.tickets);
  });

  const [tickets, setTickets] = useState([]);

  const [flightToShow, setFlightToShow] = useState();
  const [isFlightToShow, setIsFlightToShow] = useState(false);

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      >
        <button
          type="button"
          class="btn btn-info"
          id={row.ticketId}
          onClick={() => {
            inspectFlight(row.ticketId);
          }}
        >
          Inspect
        </button>
      </div>
    );
  }

  // console.log(flights);
  const columns = [
    {
      dataField: "buyDate",
      text: "Buy Date",
      sort: true,
    },
    {
      dataField: "seat",
      text: "Seat",
      sort: true,
    },
    {
      dataField: "inspectFlight",
      text: "Inspect Flight",
      sort: false,
      formatter: rankFormatter,
    },
  ];

  const selectTicketById = (id) => {
    var ticketNeeded;
    tickets.map((ticket) => {
      if (ticket.ticketId == id) {
        ticketNeeded = ticket;
      }
    });
    return ticketNeeded;
  };

  const history = useHistory();

  const inspectFlight = (theId) => {
    var ticketNeeded = selectTicketById(theId);
    // console.log(ticketNeeded)

    var flight = ticketNeeded.flightChosen;
    console.log(flight);

   

    // setFlightToShow(flight);
    props.onFlightChange(flight);
//    setIsFlightToShow(true);
    // history.push({
    //   pathname: '/ticket/book/'+theId,
    //   state: {
    //     flightSent: ticketNeeded,
    //   },
    // });
  };

  return (
    <div>
      {/* <button onClick={()=>{changePage()}}>buttn</button> */}
      <div style={{ "overflow-x": "auto" }}>
        <BootstrapTable
          keyField="id"
          bootstrap4={true}
          data={tickets}
          columns={columns}
        />
        {/* {isFlightToShow && <FlightCard flight={flightToShow} />} */}
      </div>
    </div>
  );
}

export default FlightHistory;
