package com.hservice.domain.dtos;


import com.hservice.domain.models.Project;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ProjectDto {

    private Long idProject;

    private String projectName;

    private String projectCode;

    public ProjectDto(@NotNull Project project){
        this.idProject = project.getIdProject();
        this.projectName = project.getProjectName();
        this.projectCode = project.getProjectCode();
    }
}
