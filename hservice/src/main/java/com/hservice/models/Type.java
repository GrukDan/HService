package com.hservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Type {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long typeId;
    private String typeName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "description")
    private Description descriptionByDescription;

}
