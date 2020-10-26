package com.hservice.domain.models;

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
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @CreationTimestamp
    private Timestamp changeTime;

    @NotBlank(message = "history action is mandatory")
    @Size(min = 2, max = 70, message = "the length of history action is out of range")
    private String action;

    private long changer;

    private long task;
}
