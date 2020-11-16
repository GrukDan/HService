package com.hservice.controllers;


import com.hservice.domain.models.Priority;
import com.hservice.services.PriorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api/priorities")
@RequiredArgsConstructor
public class PriorityController {

    private final PriorityService priorityService;

    @GetMapping("/all")
    public Collection<Priority> getAll() {
        return priorityService.findAll();
    }
}
