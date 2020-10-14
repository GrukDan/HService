package com.hservice.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
public class Status {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long statusId;
    private String statusName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "description")
    private Description description;
}
