package com.project.airline.repository;
import com.project.airline.repository.airplane.AirplaneRepository;
import com.project.airline.repository.airplane.AirplaneRepositoryJpa;
import com.project.airline.repository.user.UserRepository;
import com.project.airline.repository.user.UserRepositoryJpa;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
@ComponentScan("com.project.airline.repository")
public class Config {
    @Bean
    public AirplaneRepository airplaneRepository() {
        return new AirplaneRepositoryJpa();
    }

    @Bean
    public UserRepository userRepository() {
        return new UserRepositoryJpa();
    }
}
