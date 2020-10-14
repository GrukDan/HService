package com.hservice.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Data
public class History {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long historyId;

    @CreationTimestamp
    private Timestamp changeTime;

    private long changer;
    private String action;
}
