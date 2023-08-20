package com.project.airline.controller;


import com.project.airline.model.User;
import com.project.airline.model.DTO.UserDTO;
import com.project.airline.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserService userService;


    @GetMapping("/{id}")
    public User getUserById(@PathVariable(value = "id") int id) {
        return userService.getUserById(id);
    }

    @GetMapping("/e/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/register")
    public User register(@RequestBody UserDTO details) throws Exception {
//        User user=new User();
//        user.setDateOfBirth(details.getDateOfBirth());
//        user.setPassword(details.getPassword());
//        user.setFirstName(details.getFirstName());
//        user.setEmail(details.getEmail());
//        user.setLastName(details.getLastName());
        return userService.addUser(details);
    }


    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }



    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);

    }

    @PostMapping()
    public User createUser(@RequestBody UserDTO details) throws Exception {
        return userService.addUser(details);

    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id,@RequestBody UserDTO details ) throws Exception {
       return userService.updateUser(id,details);
    }


}
