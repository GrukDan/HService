package com.hservice.controllers;

import com.hservice.domain.models.Project;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody Project project) throws AlreadyExistsException {
        return ResponseEntity.ok(projectService.save(project));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) throws NotFoundException {
        return ResponseEntity.ok(projectService.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/all/dtos")
    public ResponseEntity<?> getAllDtos(){
        return ResponseEntity.ok(projectService.getAllDtos());
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id){
        projectService.deleteById(id);
    }
}
