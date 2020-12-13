package com.hservice.controllers;

import com.hservice.domain.dtos.ProjectShortDto;
import com.hservice.domain.models.Project;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    public List<Project> getAll() {
        return (List<Project>) projectService.findAll();
    }

    @GetMapping("/all/dtos")
    public List<ProjectShortDto> getAllDtos() {
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
    public boolean existsByProjectCode(@RequestParam("projectCode") String projectCode) {
        return projectService.existsByProjectCode(projectCode);
    }

    @GetMapping("/project-table")
    public List<Project> getProjectsPage(@RequestParam("page") int page,
                                               @RequestParam("size") int size,
                                               @RequestParam("order") boolean order,
                                               @RequestParam("parameter") String parameter) {
        return projectService.getProjectsPage(page, size, order, parameter);
    }

    @GetMapping("/amount")
    public Long getAllProjectsAmount() {
        return projectService.getAllProjectsAmount();
    }
}
