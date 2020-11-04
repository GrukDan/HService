package com.hservice.controllers;

import com.hservice.services.CommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/commands")
@RequiredArgsConstructor
public class CommandController {

    private final CommandService commandService;

    @GetMapping("/all/dtos")
    public ResponseEntity<?> getAllDtos(){
        return ResponseEntity.ok(commandService.getAllDtos());
    }

}
