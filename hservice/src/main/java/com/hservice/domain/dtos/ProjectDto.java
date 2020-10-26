package com.hservice.domain.dtos;


import com.hservice.domain.models.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {

    private Long idProject;

    private String projectName;

    private String projectCode;

    public ProjectDto(Project project){
        this.idProject = project.getIdProject();
        this.projectName = project.getProjectName();
        this.projectCode = project.getProjectCode();
    }
}
