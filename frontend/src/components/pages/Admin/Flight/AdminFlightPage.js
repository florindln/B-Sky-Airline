import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useEffect, useState } from "react";
import FlightService from "../../../../services/FlightService";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import AddFlight from "./AddFlight";
import paginationFactory from 'react-bootstrap-table2-paginator';

// import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, { numberFilter,textFilter,dateFilter } from 'react-bootstrap-table2-filter';

function AdminFlightPage(props) {
  useEffect(() => {
    FlightService.getAllFlights().then((response) => {
      setFlights(response.data);
    });
  }, []);

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
            editFlight(row.flightId);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          id={row.flightId}
          onClick={() => {
            removeFlight(row.flightId);
          }}
        >
          Delete
        </button>
      </div>
    );
  }

  // console.log(flights);
  const columns = [
    {
      dataField: "origin",
      text: "origin",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "destination",
      text: "destination",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "departureDate",
      text: "Departure Date",
      sort: true,
      filter: dateFilter()
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
      dataField: "price",
      text: "Flight Price",
        filter: numberFilter(),
      sort: true,
    },
    {
      dataField: "Administer",
      text: "Administer",
      sort: false,
      formatter: rankFormatter,
    },
  ];

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

  const removeFlight = (id) => {
    // history.push(`/flight/admin/edit/${id}`);
    FlightService.deleteFlight(id).then((res) => {
      setFlights(flights.filter((flight) => flight.flightId !== id));
    });
  };

  const editFlight = (theId) => {
    history.push(`/flight/admin/edit/${theId}`);
  };

  return (
    <div>
      {/* <button onClick={()=>{editFlight()}}>buttn</button> */}

      <div style={{ "overflow-x": "auto" }}>
        <BootstrapTable
          keyField="id"
          bootstrap4={true}
          filter={ filterFactory() }
          data={flights}
          columns={columns}
          
          pagination={ paginationFactory() }
        />
      </div>
      <AddFlight />
    </div>
  );
}

export default AdminFlightPage;
