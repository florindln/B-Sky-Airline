package com.project.airline.repository.airplane;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.AirplaneDTO;
import javassist.NotFoundException;

import java.util.List;



public interface AirplaneRepository {
    Airplane getPlaneById(int id);

    String deletePlane(int id);

    Airplane addPlane(AirplaneDTO airplane);

    Airplane updatePlane(int id,AirplaneDTO airplane) throws NotFoundException;

    List<Airplane> getAllPlanes();
}
