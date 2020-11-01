package com.hservice.services;

import com.hservice.domain.dtos.ProjectShortDto;
import com.hservice.domain.models.Project;
import com.hservice.exceptions.AlreadyExistsException;

import java.util.Collection;

public interface ProjectService extends CrudService<Project,Long> {

    Collection<ProjectShortDto> getAllDtos();

    ProjectShortDto generateProjectShortDtoByProjectName(String projectName) throws AlreadyExistsException;

    boolean existsByProjectCode(String projectCode);
}
