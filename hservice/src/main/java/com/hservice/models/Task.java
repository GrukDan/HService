package com.hservice.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long taskId;
    private String taskName;
    private String taskCode;
    private long project;
    private long taskCreator;
    private long taskExecutor;
    private Timestamp dueDate;

    @CreationTimestamp
    private Timestamp created;

    @UpdateTimestamp
    private Timestamp updated;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.MERGE)
    @JoinColumn(name = "type", nullable = false)
    private Type type;

    @ManyToOne
    @JoinColumn(name = "priority", nullable = false)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "status",  nullable = false)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "description")
    private Description description;
}
