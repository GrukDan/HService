package com.hservice.services;

import com.hservice.dtos.ProjectDto;
import com.hservice.models.Project;

import java.util.Collection;

public interface ProjectService extends CrudService<Project,Long> {

    Collection<ProjectDto> getAllDtos();
}
