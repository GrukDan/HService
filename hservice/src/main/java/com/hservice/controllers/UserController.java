package com.hservice.controllers;


import com.hservice.domain.dtos.AuthRequest;
import com.hservice.domain.dtos.AuthResponse;
import com.hservice.domain.dtos.UserLongDto;
import com.hservice.domain.dtos.UserShortDto;
import com.hservice.domain.models.User;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/project-leads")
    public Collection<UserShortDto> getProjectLeads() {
        return userService.findProjectLeads();
    }

    @GetMapping("/executors/{projectId}")
    public Collection<UserShortDto> getUserShortDtosByProjectId(@PathVariable("projectId") Long projectId){
        return userService.findUsersByProjectId(projectId);
    }

    @GetMapping("/members/{projectId}")
    public Collection<UserLongDto> getUserLongDtosByProjectId(@PathVariable("projectId") Long projectId,
                                                              @RequestParam("page") int page,
                                                              @RequestParam("size") int size,
                                                              @RequestParam("order") boolean order,
                                                              @RequestParam("parameter") String parameter){
        return userService.findMembersByProjectId(projectId,page,size,order,parameter);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) throws NotFoundException {
        return userService.findById(id);
    }

    @PostMapping("/registration")
    public User save(@RequestBody @Valid User user) throws AlreadyExistsException {
        return userService.save(user);
    }

    @PostMapping("/update")
    public User update(@RequestBody User user) throws AlreadyExistsException, NotFoundException {
        return userService.update(user);
    }

    @PostMapping("/invite")
    public User inviteUser(@RequestBody User user) throws AlreadyExistsException, MessagingException {
        return userService.invite(user);
    }

    @PostMapping("/auth")
    public AuthResponse auth(@RequestBody AuthRequest authRequest) throws NotFoundException {
        return userService.auth(authRequest);
    }
}
