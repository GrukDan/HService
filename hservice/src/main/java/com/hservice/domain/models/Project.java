package com.hservice.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProject;

    @NotBlank(message = "Project name is mandatory")
    @Size(min = 2, max = 45, message = "the length of project name is out of range")
    private String projectName;

    @NotBlank(message = "Project code is mandatory")
    @Size(min = 2, max = 45, message = "the length of project code is out of range")
    private String projectCode;

    @CreationTimestamp
    private Date creationDate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_description")
    private Description description;

    private long lead;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Project)) return false;
        Project project = (Project) o;
        return projectName.equals(project.projectName) &&
                projectCode.equals(project.projectCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectName, projectCode);
    }
}
