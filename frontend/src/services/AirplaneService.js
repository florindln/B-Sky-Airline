import axios from 'axios';

const base_url=process.env.REACT_APP_DEPLOYMENT_HOST;

const airplanes_url=base_url+"/airplane";

// // Add a request interceptor
// axios.interceptors.request.use( config => {
//     const user = JSON.parse(localStorage.getItem('user'));
  
//     if(user && user.Authorization){
//       const token = user.Authorization;
//       config.headers.Authorization =  token;
//     }
  
//     return config;
//   });

class AirplaneService{
    getAllPlanes(){
        console.log("query "+airplanes_url);
        return axios.get(airplanes_url);
    }
    createPlane(airplane){
        return axios.post(airplanes_url,airplane)
    }
    deletePlane(id){
        return axios.delete(airplanes_url+"/"+id)
    }
    getPlaneById(id){
        return axios.get(airplanes_url+"/"+id)
    }
    updatePlaneById(id,airplane){
        return axios.put(airplanes_url+"/"+id,airplane)
    }
}

export default new AirplaneService();