import React, { Component } from "react";
import "./ProfilePage.css";
import AuthenticationService from "../../../services/AuthenticationService";
import UserService from "../../../services/UserService";
import FlightHistory from "./FlightHistory";
import FlightCard from "../../BookTicket/FlightCard";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.handleFlightChange = this.handleFlightChange.bind(this);
    this.state = {
      // userEmail:"",
      userState: {},
      flightFromInspect: {},
      isUserLoaded:false,
      isFlightInspected:false
    };
  }

  componentDidMount() {
    const email = AuthenticationService.getCurrentUserEmail();
    UserService.getUserByEmail(email).then((response) => {
      // console.log(response.data)
      this.setState({ userState: response.data });

      const role = AuthenticationService.getCurrentUserRole();
      console.log(role);
      this.setState({isUserLoaded:true})
    });

    // const userEmail = AuthenticationService.getCurrentUser();
    // this.setState({userEmail:userEmail})

    // this.getUser()
  }

  // getUser(){
  //   UserService.getUserByEmail(this.state.userEmail).then((response) =>{
  //     console.log(response.data)
  //    this.setState({userState:response.data})

  //  })
  // }

  handleFlightChange(flight) {  
    this.setState({ flightFromInspect: flight });
    this.setState({ isFlightInspected: !this.state.isFlightInspected });
  }

  render() {
    return (
      <div className="page-content page-container" id="page-content">
        {/* <button onClick={()=> console.log(AuthenticationService.getCurrentUserRole())}>Log profile ingo</button> */}
        {/* <button onClick={()=> console.log(this.state.userState)}>Log state</button> */}
        {/* <div className="padding"> */}
          <div>
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-12 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-xl-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        {" "}
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />{" "}
                      </div>
                      <h6 className="f-w-600">
                        {this.state.userState.firstName +
                          " " +
                          this.state.userState.lastName}
                      </h6>
                      {/* <p>Web Designer</p>{" "} */}
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-xl-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">
                            {this.state.userState.email}
                          </h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Date of birth</p>
                          <h6 className="text-muted f-w-400">
                            {this.state.userState.dateOfBirth}
                          </h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Budget</p>
                          <h6 className="text-muted f-w-400">
                            {this.state.userState.budget} EUR
                          </h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Flight History
                      </h6>
                      <div className="d-flex flex-column justify-content-center">
                        {this.state.isUserLoaded && (
                          
                          <FlightHistory
                            user={this.state.userState}
                            onFlightChange={this.handleFlightChange}
                          />
                        )}
                        {this.state.isFlightInspected && (
                          <FlightCard 
                          flight={this.state.flightFromInspect} 
                          
                          />
                        )}
                      </div>
                      {/* <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
