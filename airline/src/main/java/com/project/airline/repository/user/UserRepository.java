package com.project.airline.repository.user;

import com.project.airline.model.DTO.UserDTO;
import com.project.airline.model.User;
import javassist.NotFoundException;

import java.util.List;

public interface UserRepository {
    User getUserById(int id);

    User getUserByEmail(String email);

    String deleteUser(int id);

    User addUser(UserDTO user) throws Exception;

    User updateUser(int id,UserDTO user) throws Exception;

    User updateBudget(int id,float budget) throws Exception;

    List<User> getUsers();
}
