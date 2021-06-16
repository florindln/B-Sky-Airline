package com.project.airline.repository.airplane;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.AirplaneDTO;
import com.project.airline.model.Flight;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

public class FakeAirplaneRepository implements AirplaneRepository {

    @Setter
    @Getter
    private List<Airplane> allAirplanes= new ArrayList<>();

    public FakeAirplaneRepository() {
        List<Flight> flights=new ArrayList<>();
        allAirplanes.add(new Airplane(50,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights));
        allAirplanes.add(new Airplane(51,"BongBong","MaxModel",777,50,
                40,"Fictional plane","asfaasass",flights));
    }

    @Override
    public Airplane getPlaneById(int id){
        for (Airplane airplane : allAirplanes){
            if(airplane.getAirplaneId()==id)
                return airplane;
        }
        return null;
    }

    @Override
    public String deletePlane(int id){
        Airplane airplane= getPlaneById(id);
        if ( airplane==null)
            return "plane with id "+id+" not found";
        allAirplanes.remove(airplane);
        return "plane with id "+id+" removed";
    }

    @Override
    public Airplane addPlane(AirplaneDTO request){
//        for (Airplane u:allAirplanes){
//            if (u.getAirplaneId()==airplane.getAirplaneId())
//                return null;
//        }
        Airplane airplane=new Airplane();
        BeanUtils.copyProperties(request,airplane);
        allAirplanes.add(airplane);
        return airplane;
    }

    @Override
    public Airplane updatePlane(int id,AirplaneDTO airplane){
        Airplane old= getPlaneById(id);
        if(old==null)
            return null;
        old.setBrand(airplane.getBrand());
        old.setDescription(airplane.getDescription());
        old.setFuelConsumptionPer100Km(airplane.getFuelConsumptionPer100Km());
        old.setModel(airplane.getModel());
        old.setMaxCapacity(airplane.getMaxCapacity());
        old.setTopSpeed(airplane.getTopSpeed());
        return old;
    }

    public List<Airplane> getAllPlanes() {
        return allAirplanes;
    }


}
