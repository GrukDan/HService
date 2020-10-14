package com.hservice.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
public class Description {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long descriptionId;
    private String content;
}
