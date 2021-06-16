package com.project.airline.service;

import com.project.airline.model.DTO.UserDTO;
import com.project.airline.model.User;
import com.project.airline.repository.user.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;



    public List<User> getAllUsers(){
        return userRepository.getUsers();
    }

    public User getUserById(int id) {
        return userRepository.getUserById(id);
    }

    public User getUserByEmail(String email){return userRepository.getUserByEmail(email);}

    public String deleteUser(int id){
        return userRepository.deleteUser(id);
    }

    public User addUser(UserDTO User) throws Exception {
        return userRepository.addUser(User);
    }

    public User updateUser(int id,UserDTO User) throws Exception {
        return userRepository.updateUser(id,User);
    }

}
