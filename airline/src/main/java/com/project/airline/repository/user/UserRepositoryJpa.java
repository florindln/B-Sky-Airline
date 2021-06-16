package com.project.airline.repository.user;

import com.project.airline.model.DTO.UserDTO;
import com.project.airline.model.User;
import javassist.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

public class UserRepositoryJpa implements UserRepository {

    @Autowired
    UserJpa userJpa;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public User getUserById(int id) {
        return userJpa.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userJpa.findByEmail(email);
    }

    public List<User> getUsers() {
        return userJpa.findAll();
    }

    public User addUser(UserDTO user) throws Exception {
        User existingUser = userJpa.findByEmail(user.getEmail());
        if (existingUser != null)
            throw new Exception("Email already in use");
        User newUser = new User();
        BeanUtils.copyProperties(user, newUser);
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return userJpa.save(newUser);

    }

    public User updateBudget(int id, float budget) throws Exception {
        User existingUser = userJpa.findById(id)
                .orElseThrow(() -> new NotFoundException("User with id " + id + " not found"));

        existingUser.setBudget(budget);

        return userJpa.save(existingUser);

    }

    public User updateUser(int id, UserDTO details) throws Exception {
        User existingUser = userJpa.findById(id)
                .orElseThrow(() -> new NotFoundException("User with id " + id + " not found"));

        User existingUser2 = userJpa.findByEmail(details.getEmail());
        if (existingUser2 != null)
            throw new Exception("Email already in use");

        existingUser.setEmail(details.getEmail());
        existingUser.setPassword(details.getPassword());
        existingUser.setLastName(details.getLastName());
        existingUser.setFirstName(details.getFirstName());
        existingUser.setDateOfBirth(details.getDateOfBirth());


        return userJpa.save(existingUser);

    }

    public String deleteUser(int id) {
        userJpa.deleteById(id);
        return "User with id " + id + " removed";
    }

}
