import React, { Component } from "react";
import UserService from "../../services/UserService";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      errors: [],
      emailError: false,
      passwordError: false,
      firstNameError: false,
      lastNameError: false,
      dateOfBirthError: false,
    };
  }
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });

    if (typeof this.state.email !== "undefined") {
      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        this.setState({ emailError: true });
      } else  this.setState({ emailError: false });
    }
  };

  handlePasswordChange = (e) => {
    if (this.state.password.length < 8) {
      this.setState({ passwordError: true });
    } else this.setState({ passwordError: false });
    this.setState({ password: e.target.value });
  };
  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });

    if (typeof e.target.value !== "undefined") {
      if (!e.target.value.match(/^[a-zA-Z]+$/)) {
        this.setState({ firstNameError: true });
      } else this.setState({ firstNameError: false });
    }
  };
  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });

    if (typeof e.target.value !== "undefined") {
      if (!e.target.value.match(/^[a-zA-Z]+$/)) {
        this.setState({ lastNameError: true });
      } else this.setState({ lastNameError: false });
    }
  };
  handleDateOfBirthChange = (e) => {
    this.setState({ dateOfBirth: e.target.value });
  };

  handleValidation = () => {
    let formIsValid = true;
    let newErrors = {};

    //Email
    if (!this.state.email) {
      formIsValid = false;
      newErrors["email"] = "Cannot be empty";
    }

    if (typeof this.state.email !== "undefined") {
      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        newErrors["email"] = "Email is not valid";
      }
    }

    if (this.state.password.length < 8) {
      formIsValid = false;
      newErrors["password"] = "Password must by longer than 8 characters";
    }

    if (typeof this.state.firstName !== "undefined") {
      if (!this.state.firstName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        newErrors["firstName"] = "Only letters in first name";
      }
    }

    if (typeof this.state.lastName !== "undefined") {
      if (!this.state.lastName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        newErrors["lastName"] = "Only letters in the last name";
      }
    }

    this.setState({ errors: newErrors });

    return formIsValid;
  };

  submitForm = () => {
    if (this.handleValidation()) {
      {
        alert("Registered successfully");
        this.handleRegister();
      }
    } else {
      alert("Form has errors.");
    }
  };

  handleRegister = () => {
    let newUser = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth,
      role:"User"
    };
    UserService.registerUser(newUser);

    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    });

    console.log("user =>" + JSON.stringify(newUser));
    window.location.reload(false);
    this.setState({ redirect: true });
  };

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect push to="/login" /> : null}
        <h1 className="textFormat">Sign up</h1>
        {this.state.emailError && <div>Email not valid</div>}
        <input
          className="signInInput"
          type="text"
          placeholder="Email"
          onChange={this.handleEmailChange}
          required
        ></input>
        {this.state.passwordError && <div>Password too short</div>}
        <input
          className="signInInput"
          type="password"
          placeholder="Password"
          onChange={this.handlePasswordChange}
        ></input>
        {this.state.firstNameError && <div>First name not valid</div>}
        <input
          className="signInInput"
          type="text"
          placeholder="First name"
          onChange={this.handleFirstNameChange}
        ></input>
        {this.state.lastNameError && <div>Last name not valid</div>}
        <input
          className="signInInput"
          type="text"
          placeholder="Last Name"
          onChange={this.handleLastNameChange}
        ></input>
        {/* {this.state.dateOfBirthError && <div>Birthdate must not be empty</div>} */}
        <div>Birthdate</div>
        <input
          className="specialDate"
          type="date"
          placeholder="BirthDate"
          onChange={this.handleDateOfBirthChange}
        ></input>
        <button
          type="button"
          class="btn btn-primary signButton"
          onClick={this.submitForm}
        >
          Sign Up
        </button>
      </div>
    );
  }
}

export default SignUp;
