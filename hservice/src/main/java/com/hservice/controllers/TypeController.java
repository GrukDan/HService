package com.hservice.controllers;


import com.hservice.domain.models.Type;
import com.hservice.services.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api/types")
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;

    @GetMapping("/all")
    public Collection<Type> getAll(){
        return typeService.findAll();
    }
}
