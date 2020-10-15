package com.hservice.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    private long commentator;
}
