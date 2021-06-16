package com.project.airline.service;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.AirplaneDTO;
import com.project.airline.repository.airplane.AirplaneRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirplaneService {

    @Autowired
    private AirplaneRepository airplaneRepository;

//    public AirplaneService(){}

//    @Autowired
//    public AirplaneService(AirplaneRepository airplaneRepository) {
//        this.airplaneRepository = airplaneRepository;
//    }

    public List<Airplane> getAllPlanes(){
        return airplaneRepository.getAllPlanes();
    }

    public Airplane getPlaneById(int id) {
        return airplaneRepository.getPlaneById(id);
    }

    public String deletePlane(int id){
        return airplaneRepository.deletePlane(id);
    }

    public Airplane addPlane(AirplaneDTO airplane){
        return airplaneRepository.addPlane(airplane);
    }

    public Airplane updatePlane(int id,AirplaneDTO airplane) throws NotFoundException{
        return airplaneRepository.updatePlane(id,airplane);
    }


}
