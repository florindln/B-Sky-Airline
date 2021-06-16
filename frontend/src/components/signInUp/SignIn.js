import React, { Component } from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      password: "",
      error: "",
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  doLogin = async (event) => {
    event.preventDefault();

    AuthenticationService.signin(this.state.username, this.state.password).then(      
      () => {
        window.location.reload(false);
        this.setState({ redirect: true })
        
        // this.props.history.push("/profile");
      },
      (error) => {
        console.log("Login fail: error = { " + error.toString() + " }");
        this.setState({
          error:
            "Can not login successfully ! Please check username/password again",
        });
      }
    );
  };
  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect push to="/profile" /> : null}
        <form onSubmit={this.doLogin}>
          <h1 className="textFormat">Login</h1>
          {/* <input className="signInInput" type="text" placeholder="Email"></input> */}
          <input
            className="signInInput"
            autoFocus
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            placeholder="Enter Email"
            autoComplete="username"
            onChange={this.changeHandler}
            cy-test="usr"
          />

          {/* <input
          className="signInInput"
          type="password"
          placeholder="Password"
        ></input> */}
          <input
            type="password"
            className="signInInput"
            name="password"
            id="password"
            value={this.state.password}
            placeholder="Enter Password"
            autoComplete="password"
            onChange={this.changeHandler}
            cy-test="pswrd"
          />
          <button type="submit" class="btn btn-primary signButton">
            Sign in
          </button>
          <div>
            {this.state.error && (
              <alert color="danger">{this.state.error}</alert>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
