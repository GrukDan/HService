package com.hservice.domain.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Data
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long linkId;

    @NotBlank(message = "link name is mandatory")
    @Size(min = 2, max = 45, message = "the length of link name is out of range")
    private String linkName;

    @NotBlank(message = "link's url is mandatory")
    @Size(min = 2, max = 255, message = "the length of message's url is out of range")
    private String url;

    private long command;

    private long description;
}
