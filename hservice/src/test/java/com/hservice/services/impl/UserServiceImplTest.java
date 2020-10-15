package com.hservice.services.impl;

import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.models.User;
import com.hservice.services.RoleService;
import com.hservice.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class UserServiceImplTest {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Test
    void save() throws NotFoundException, AlreadyExistsException {
        User user = User.builder()
                .userName("super-admin")
                .firstName("Dmitriy")
                .lastName("Nagiev")
                .email("nagiev@mail.com")
                .password("qwerty123")
                .role(roleService.findById(1L))
                .build();
        System.out.println(user.toString());
        if(!userService.existsByUserNameAndPassword(user.getUserName(), user.getPassword()))
        userService.save(user);
        user = userService.findByUserNameAndPassword(user.getUserName(), user.getPassword());
        assertNotNull(user.getUserId());
    }

    @Test
    void findAll() {
        roleService.findAll().forEach(role -> System.out.println(role.toString()));
        userService.findAll().forEach(user -> System.out.println(user.toString()));
    }
}
