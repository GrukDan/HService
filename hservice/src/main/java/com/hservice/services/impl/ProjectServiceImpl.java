package com.hservice.services.impl;

import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.models.Project;
import com.hservice.repositories.ProjectRepository;
import com.hservice.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public Project save(Project entity) throws AlreadyExistsException {
        if(projectRepository.existsByProjectCode(entity.getProjectCode()))
            throw new AlreadyExistsException();
        return projectRepository.save(entity);
    }

    @Override
    public Project findById(Long id) throws NotFoundException {
        return projectRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public Collection<Project> findAll() {
        return projectRepository.findAll();
    }
}
