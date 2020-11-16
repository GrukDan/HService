package com.hservice.controllers;

import com.hservice.domain.models.Role;
import com.hservice.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/all")
    public List<Role> getAll(){
        return (List<Role>) roleService.findAll();
    }

    @GetMapping("/invite-roles")
    public List<Role> getInviteRoles(){
        return roleService.findInviteRoles();
    }
}
