package com.hservice.models;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Data
public class Command {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long commandId;
    private String commandName;
    private Timestamp creationDate;
}
