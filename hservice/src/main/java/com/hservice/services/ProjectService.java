package com.hservice.services;

import com.hservice.domain.dtos.ProjectShortDto;
import com.hservice.domain.models.Project;
import com.hservice.exceptions.AlreadyExistsException;

import java.util.List;

public interface ProjectService extends CrudService<Project,Long> {

    List<ProjectShortDto> getAllDtos();

    ProjectShortDto generateProjectShortDtoByProjectName(String projectName) throws AlreadyExistsException;

    boolean existsByProjectCode(String projectCode);

    List<Project> getProjectsPage(int page, int size, boolean order, String parameter);

    Long getAllProjectsAmount();
}
