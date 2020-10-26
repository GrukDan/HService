package com.hservice.services;

import com.hservice.domain.dtos.ProjectDto;
import com.hservice.domain.models.Project;

import java.util.Collection;

public interface ProjectService extends CrudService<Project,Long> {

    Collection<ProjectDto> getAllDtos();
}
