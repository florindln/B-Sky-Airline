import axios from 'axios';

const user_Url="http://localhost:8080/user";

// Add a request interceptor
axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user && user.Authorization){
      const token = user.Authorization;
      config.headers.Authorization =  token;
    }
  
    return config;
  });

class UserService{
    getAllUsers(){
        return axios.get(user_Url);
    }
    registerUser(user){
        return axios.post(user_Url+"/register",user);
    }
    getUserByEmail(email){
        return axios.get(user_Url+"/e/"+email)
    }
    getUserById(id){
        return axios.get(user_Url+"/"+id)
    }
    updateUserById(id,user){
        return axios.put(user_Url+"/"+id,user)
    }
}

export default new UserService();