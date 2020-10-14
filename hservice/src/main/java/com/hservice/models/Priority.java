package com.hservice.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
public class Priority {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long priorityId;
    private String priorityName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "description")
    private Description description;
}
