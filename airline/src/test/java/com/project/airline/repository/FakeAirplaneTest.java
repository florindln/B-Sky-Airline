package com.project.airline.repository;

import com.project.airline.model.Airplane;
import com.project.airline.model.DTO.AirplaneDTO;
import com.project.airline.model.Flight;
import com.project.airline.repository.airplane.FakeAirplaneRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

class FakeAirplaneTest {


    @Test
    void getAirplaneTest() {
        FakeAirplaneRepository fakeAirplaneRepository =new FakeAirplaneRepository();
        List<Flight> flights=new ArrayList<>();
        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);

        List<Airplane> airplanes=new ArrayList<Airplane>();
        airplanes.add(a);
        fakeAirplaneRepository.setAllAirplanes(airplanes);
        Assertions.assertEquals(a, fakeAirplaneRepository.getPlaneById(1));

    }

    @Test
    void removeAirplaneTest() {
        FakeAirplaneRepository fakeAirplaneRepository =new FakeAirplaneRepository();
        List<Flight> flights=new ArrayList<>();
        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);
        Airplane b=new Airplane(50,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);


        Assertions.assertEquals(fakeAirplaneRepository.getPlaneById(50),b);

        fakeAirplaneRepository.deletePlane(50);
        Assertions.assertEquals(fakeAirplaneRepository.getPlaneById(50),null);
    }

    @Test
    void updateAirplaneTest() {
        FakeAirplaneRepository fakeAirplaneRepository =new FakeAirplaneRepository();
        List<Flight> flights=new ArrayList<>();
        Airplane a=new Airplane(1,"Boeing","777Max",500,100,
                130,"Stand size plane","asfas",flights);
        Airplane b=new Airplane(2,"Boeing","777Max",666,100,
                130,"Stand size plane","asfas",flights);

        AirplaneDTO aDto=new AirplaneDTO("Boeing","777Max",500,100,
                130,"Stand size plane","asfas");
        AirplaneDTO bDto=new AirplaneDTO("Dadda","Smth",666,100,
                130,"Stand size plane","asfas");


        fakeAirplaneRepository.updatePlane(50,bDto);
        Assertions.assertEquals(666, fakeAirplaneRepository.getPlaneById(50).getTopSpeed());

    }
}