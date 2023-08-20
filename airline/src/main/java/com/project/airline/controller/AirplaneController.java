package com.project.airline.controller;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.AirplaneDTO;
import com.project.airline.model.Flight;
import com.project.airline.service.AirplaneService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/airplane")
public class AirplaneController {

    //private static AirplaneLogic airplaneLogic =new AirplaneLogic(new FakeAirplaneRepositoryOld());

    @Autowired
    private AirplaneService airplaneService;

//    private AirplaneService airplaneService=new AirplaneService(new AirplaneRepositoryJpa());




    @GetMapping("/{id}")
    public Airplane getAirplaneById(@PathVariable(value = "id") int id) {
        return airplaneService.getPlaneById(id);
    }


    @GetMapping
    public List<Airplane> getAllAirplanes() {
        return airplaneService.getAllPlanes();
    }



    @DeleteMapping("/{id}")
    public String deletePlane(@PathVariable int id) {
        return airplaneService.deletePlane(id);

    }

    @PostMapping()
    public Airplane createAirplane(@RequestBody AirplaneDTO details) {


       return airplaneService.addPlane(details);

    }

    @PutMapping("/{id}")
    public Airplane updateAirplane(@PathVariable int id,@RequestBody AirplaneDTO details ) throws NotFoundException {

        return airplaneService.updatePlane(id,details);
    }

}
