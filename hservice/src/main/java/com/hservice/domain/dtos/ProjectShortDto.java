package com.hservice.domain.dtos;

import com.hservice.domain.models.Project;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ProjectShortDto {
    private Long projectId;
    private String projectName;
    private String projectCode;

    public ProjectShortDto(@NotNull Project project) {
        projectId = project.getIdProject();
        projectName = project.getProjectName();
        projectCode = project.getProjectCode();
    }

    public ProjectShortDto(String projectName, String projectCode) {
        this.projectName = projectName;
        this.projectCode = projectCode;
    }
}
