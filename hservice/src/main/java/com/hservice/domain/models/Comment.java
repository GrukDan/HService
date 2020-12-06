package com.hservice.domain.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @CreationTimestamp
    private Timestamp creationTime;

    @NotBlank(message = "comment is mandatory")
    @Size(min = 2, max = 250, message = "the length of comment is out of range")
    private String content;

    private long task;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "commentator", nullable = false)
    private User commentator;
}
