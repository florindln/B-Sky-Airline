package com.project.airline.service;

import com.project.airline.model.DTO.UserDTO;
import com.project.airline.model.Ticket;
import com.project.airline.model.User;
import com.project.airline.repository.user.UserRepositoryJpa;
import javassist.NotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;



@ExtendWith(MockitoExtension.class)
class UserServiceTest {

   @Mock
    UserRepositoryJpa userRepositoryJpa;

    @InjectMocks
    UserService userService;


    @Test
    void getAllUsers() {
        Date smth = Date.valueOf("2015-03-31");

        List<Ticket> tickets=new ArrayList<>();

        User tester1 = new User(99, "Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);
        User tester2 = new User(1, "Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);

        List<User> userList=new ArrayList<>(Arrays.asList(tester1,tester2));

        when(userRepositoryJpa.getUsers()).thenReturn(new ArrayList<User>(Arrays.asList(
                new User(99, "Trump", "Duck", smth,
                        "donald@gmail.com", "123456789", 686.3f,"Admin",tickets),
                new User(1, "Trump", "Duck", smth,
                        "donald@gmail.com", "123456789", 686.3f,"Admin",tickets)
        )));




        List<User> expected = userService.getAllUsers();

        assertEquals(expected,userList);
    }

    @Test
    void getUserById() {
        Date smth = Date.valueOf("2015-03-31");
        List<Ticket> tickets=new ArrayList<>();

        User tester1 = new User(99, "Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);

        when(userRepositoryJpa.getUserById(99)).thenReturn(tester1);


        User created= userService.getUserById(99);

        assertEquals(created,tester1);
    }

    @Test
    void deleteUser() {
        Date smth = Date.valueOf("2015-03-31");
        List<Ticket> tickets=new ArrayList<>();

        User tester1 = new User(99, "Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);

        when(userRepositoryJpa.deleteUser(99)).thenReturn("User with id "+99+" removed");


        String created= userService.deleteUser(99);

        assertEquals(created,"User with id "+99+" removed");
    }

    @Test
    void addUser() throws Exception {
        Date smth = Date.valueOf("2015-03-31");
        List<Ticket> tickets=new ArrayList<>();

        User tester1 = new User(1, "Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);
        User tester2 = new User(1, "Donald", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);

        UserDTO tester1DTO= new UserDTO("Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin");

        when(userRepositoryJpa.addUser(any(UserDTO.class))).thenReturn(tester1);

        User created = userService.addUser(tester1DTO);

        assertEquals(tester1.getFirstName() , created.getFirstName());

        assertEquals(tester1, created);
    }
    @Test
    void updateUser() throws Exception {
        Date smth = Date.valueOf("2015-03-31");
        List<Ticket> tickets=new ArrayList<>();

        User tester1 = new User(1, "Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);
        User desired = new User(1, "Donald", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets);

        UserDTO tester1DTO= new UserDTO("Trump", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin");

        when(userRepositoryJpa.updateUser(1,tester1DTO)).thenReturn(new User(1, "Donald", "Duck", smth,
                "donald@gmail.com", "123456789", 686.3f,"Admin",tickets));


        User created= userService.updateUser(1,tester1DTO);

        assertEquals(created.getFirstName(),desired.getFirstName());

    }
}