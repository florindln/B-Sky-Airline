package com.project.airline.repository.user;

import com.project.airline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpa extends JpaRepository<User,Integer> {
    User findByEmail(String email);
}
