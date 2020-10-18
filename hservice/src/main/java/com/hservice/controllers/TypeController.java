package com.hservice.controllers;


import com.hservice.services.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/types")
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;


    @GetMapping("/all")
    public ResponseEntity getAll(){
        return ResponseEntity.ok(typeService.findAll());
    }
}
