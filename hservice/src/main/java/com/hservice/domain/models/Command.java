package com.hservice.domain.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Command {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commandId;

    @NotBlank(message = "command name is mandatory")
    @Size(min = 2, max = 60, message = "the length of command name is out of range")
    private String commandName;

    @CreationTimestamp
    private Timestamp creationDate;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "membership",
            joinColumns = {@JoinColumn(name = "command_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private Set<User> users = new HashSet<>();
}
