package com.hservice.controllers;


import com.hservice.exceptions.NotFoundException;
import com.hservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/project-leads")
    public ResponseEntity<?> getProjectLeads() {
        return ResponseEntity.ok(userService.findProjectLeads());
    }

    @GetMapping("/executors/{projectId}")
    public ResponseEntity<?> getUserShortDtosByProjectId(@PathVariable("projectId") Long projectId){
        return ResponseEntity.ok(userService.findUsersByProjectId(projectId));
    }

    @GetMapping("/members/{projectId}")
    public ResponseEntity<?> getUserLongDtosByProjectId(@PathVariable("projectId") Long projectId,
                                                        @RequestParam("page") int page,
                                                        @RequestParam("size") int size,
                                                        @RequestParam("order") boolean order,
                                                        @RequestParam("parameter") String parameter){
        return ResponseEntity.ok(userService.findMembersByProjectId(projectId,page,size,order,parameter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) throws NotFoundException {
        return ResponseEntity.ok(userService.findById(id));
    }
}
