import axios from "axios";
import UserService from './UserService'

const api_url="http://localhost:8080"

class AuthenticationService {
  signin = (email, password) => {
      return axios.post(api_url+"/login", {email, password})
        .then(response => {
          if (response.data.Authorization) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
  }

  signOut() {
    localStorage.removeItem("user");
  }

  // register = async(firstname, lastname, email, dateOfBirth, password,role) => {
  //   return axios.post("/user/register", {
  //     firstname,
  //     lastname,
  //     email,
  //     dateOfBirth,
  //     password,
  //     role
  //   });
  // }

  getCurrentUserEmail(){
    try{
    var authorizationUser= JSON.parse(localStorage.getItem('user'));
    // console.log(authorizationUser);
    // console.log(authorizationUser.Authorization)
    var sec=authorizationUser.Authorization;
    var third=sec.substring(7);
    var jwt = require("jsonwebtoken");
    var objct= jwt.decode(third);
    // console.log(objct)
    
    return objct.sub
    
    // console.log(toReturn)
    }
    catch{
      console.log("no user defined")
    } 
  }
  getCurrentUserRole(){
    try{
    var authorizationUser= JSON.parse(localStorage.getItem('user'));
    // console.log(authorizationUser);
    // console.log(authorizationUser.Authorization)
    var sec=authorizationUser.Authorization;
    var third=sec.substring(7);
    var jwt = require("jsonwebtoken");
    var objct= jwt.decode(third);
    // console.log(objct)
    
    return objct.role
    
    // console.log(toReturn)
    }
    catch{
      console.log("no user defined")
    } 
  }

}

export default new AuthenticationService();