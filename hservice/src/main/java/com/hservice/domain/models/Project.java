package com.hservice.domain.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
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

    private long lead;

    @CreationTimestamp
    private Date creationDate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_description")
    private Description description;

    @ManyToMany(mappedBy = "projects",
            cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<User> users = new HashSet<>();
}
