package com.hservice.controllers;

import com.hservice.domain.dtos.ProjectShortDto;
import com.hservice.domain.models.Project;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public Project save(@Valid @RequestBody Project project) throws AlreadyExistsException {
        return projectService.save(project);
    }

    @GetMapping("/{id}")
    public Project getById(@PathVariable("id") Long id) throws NotFoundException {
        return projectService.findById(id);
    }

    @GetMapping("/all/data")
    public Collection<Project> getAll() {
        return projectService.findAll();
    }

    @GetMapping("/all/dtos")
    public Collection<ProjectShortDto> getAllDtos() {
        return projectService.getAllDtos();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        projectService.deleteById(id);
    }

    @GetMapping("/project-code")
    public ProjectShortDto generateProjectCodeByProjectName(@RequestParam("projectName") String projectName) throws AlreadyExistsException {
        return projectService.generateProjectShortDtoByProjectName(projectName);
    }

    @GetMapping("/exists")
    public boolean existsByProjectCode(@RequestParam("projectCode") String projectCode){
        return projectService.existsByProjectCode(projectCode);
    }
}
