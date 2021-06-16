package com.project.airline.repository.user;

import com.project.airline.model.DTO.UserDTO;
import com.project.airline.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

public class FakeUserRepository implements UserRepository {
    @Getter
    @Setter
    private List<User> users = new ArrayList<>();



    @Override
    public User getUserById(int id){
        for (User user : users){
            if(user.getUserId()==id)
                return user;
        }
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return null;
    }

    @Override
    public String deleteUser(int id){
        User user= getUserById(id);
        if ( user==null)
            return "not found";
        users.remove(user);
        return "deleted";
    }

    @Override
    public User addUser(UserDTO user){
        User newUser=new User();
        BeanUtils.copyProperties(user,newUser);
        users.add(newUser);
        return newUser;
    }

    @Override
    public User updateUser(int id,UserDTO user){
        User old= getUserById(id);
        if(old==null)
            return null;
        old.setEmail(user.getEmail());
        old.setDateOfBirth(user.getDateOfBirth());
        old.setFirstName(user.getFirstName());
        old.setPassword(user.getPassword());
        old.setLastName(user.getLastName());
        old.setEmail(user.getEmail());
        return old;
    }

    @Override
    public User updateBudget(int id, float budget) throws Exception {
        return null;
    }
}
