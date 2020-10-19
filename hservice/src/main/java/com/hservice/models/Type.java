package com.hservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeId;

    @NotBlank(message = "Last type name is mandatory")
    @Size(min = 4, max = 45, message = "the length of type name is out of range")
    private String typeName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "description")
    private Description description;
}
