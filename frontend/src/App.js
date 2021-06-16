import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import Airplanes from "./components/Airplanes/Airplanes";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import FlightsPage from "./components/pages/FlightsPage/FlightsPage";
import BookTicket from "./components/BookTicket/BookTicket";
import React, { useState, useEffect } from "react";
import AuthenticationService from "./services/AuthenticationService";
import UserService from "./services/UserService";
import AdminAirplanePage from "./components/pages/Admin/Airplane/AdminAirplanePage";
import AdminFlightPage from "./components/pages/Admin/Flight/AdminFlightPage";
import UpdateAirplane from './components/pages/Admin/Airplane/UpdateAirplane'
import UpdateFlight from './components/pages/Admin/Flight/UpdateFlight'

function App() {
  const [user, setUser] = useState();

  //   useEffect(() => {
  //     const email=AuthenticationService.getCurrentUserEmail();
  //     UserService.getUserByEmail(email).then((response) =>{
  //      setUser(response.data)
  //   });
  // })

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/user/register" exact component={LoginPage} />
          <Route path="/airplanes" exact component={Airplanes} />
          <Route path="/airplane/admin" exact component={AdminAirplanePage} />
          <Route path="/flight/admin" exact component={AdminFlightPage}/>
          <Route
            path="/flight/admin/edit/:id"
            exact
            component={UpdateFlight}
          ></Route>
          <Route
            path="/airplane/admin/edit/:id"
            exact
            component={UpdateAirplane}
          ></Route>
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/flights/:origin" exact component={FlightsPage} />
          <Route
            path="/flights/:origin/:destination"
            exact
            component={FlightsPage}
          />
          <Route
            path="/flights/:origin/:destination/:departure"
            exact
            component={FlightsPage}
          />
          <Route path="/ticket/book/:ticId" exact component={BookTicket} />
        </Switch>
        <Footer />
      </Router>

      {/* <AirplaneComponent/> */}

      {/* <Hom ePage/> */}
      {/* <LoginPage /> */}
    </div>
  );
}

export default App;
