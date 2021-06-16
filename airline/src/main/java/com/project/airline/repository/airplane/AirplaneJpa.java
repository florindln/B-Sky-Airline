package com.project.airline.repository.airplane;

import com.project.airline.model.Airplane;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AirplaneJpa extends JpaRepository<Airplane,Integer> {

}
