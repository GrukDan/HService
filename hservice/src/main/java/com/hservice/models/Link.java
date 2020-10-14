package com.hservice.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
public class Link {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long linkId;
    private String linkName;
    private String url;
    private long command;
    private long description;
}
