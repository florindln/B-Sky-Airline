package com.project.airline.repository.airplane;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.AirplaneDTO;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


public class AirplaneRepositoryJpa implements AirplaneRepository {

    @Autowired
    AirplaneJpa airplaneJpa;


    public List<Airplane> getAllPlanes() {
        return airplaneJpa.findAll();
    }

    public Airplane getPlaneById(int id) {
        return airplaneJpa.findById(id).orElse(null);
    }

    public Airplane addPlane(AirplaneDTO request) {
        Airplane airplane=new Airplane();
        BeanUtils.copyProperties(request,airplane);
        return airplaneJpa.save(airplane);
    }

    public Airplane updatePlane(int id,AirplaneDTO details) throws NotFoundException {
        Airplane existingAirplane = airplaneJpa.findById(id)
                .orElseThrow(() -> new NotFoundException("Plane with id " + id + " not found"));


        existingAirplane.setBrand(details.getBrand());
        existingAirplane.setDescription(details.getDescription());
        existingAirplane.setFuelConsumptionPer100Km(details.getFuelConsumptionPer100Km());
        existingAirplane.setModel(details.getModel());
        existingAirplane.setMaxCapacity(details.getMaxCapacity());
        existingAirplane.setTopSpeed(details.getTopSpeed());
        existingAirplane.setImageUrl(details.getImageUrl());

        return airplaneJpa.save(existingAirplane);
    }
    @Override
    public String deletePlane(int id) {
        airplaneJpa.deleteById(id);
        return "Plane with id " + id + " removed";
    }
}
