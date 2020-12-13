package com.hservice.services.impl;

import com.hservice.domain.dtos.ProjectShortDto;
import com.hservice.domain.models.Project;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.ProjectRepository;
import com.hservice.repositories.TaskRepository;
import com.hservice.services.ProjectService;
import com.hservice.services.UserService;
import com.hservice.util.StringHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final StringHandler stringHandler;
    private final UserService userService;

    @Override
    public Project save(Project entity) throws AlreadyExistsException {
        if (projectRepository.existsByProjectCode(entity.getProjectCode()))
            throw new AlreadyExistsException();
        return projectRepository.save(entity);
    }

    @Override
    public Project findById(Long id) throws NotFoundException {
        Project project = projectRepository.findById(id).orElseThrow(NotFoundException::new);
        project.setMembersAmount(userService.countUsersByProjectId(id));
        project.setTasksAmount(taskRepository.countTasksByProject(id));
        return project;
    }

    @Override
    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public List<ProjectShortDto> getAllDtos() {
        return projectRepository
                .findAll().stream()
                .map(ProjectShortDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectShortDto generateProjectShortDtoByProjectName(String projectName) throws AlreadyExistsException {
        if (projectRepository.existsByProjectName(projectName))
            throw new AlreadyExistsException("Project with project name" + projectName + "already exists");
        String generatedCode = stringHandler.generateProjectCodeByProjectName(projectName);
        if (projectRepository.existsByProjectCode(generatedCode))
            throw new AlreadyExistsException("Project with project code" + generatedCode + "already exists");
        return new ProjectShortDto(projectName, generatedCode);
    }

    @Override
    public boolean existsByProjectCode(String projectCode) {
        return projectRepository.existsByProjectCode(projectCode);
    }

    @Override
    public List<Project> getProjectsPage(int page, int size, boolean order, String parameter) {
        return projectRepository.findAll(
                PageRequest.of(
                        page,
                        size,
                        Sort.by(
                                order ? Sort.Direction.ASC : Sort.Direction.DESC,
                                parameter)))
                .getContent().stream()
                .peek(project -> project.setMembersAmount(userService.countUsersByProjectId(project.getProjectId())))
                .peek(project -> project.setTasksAmount(taskRepository.countTasksByProject(project.getProjectId())))
                .collect(Collectors.toList());
    }

    @Override
    public Long getAllProjectsAmount() {
        return projectRepository.count();
    }
}
