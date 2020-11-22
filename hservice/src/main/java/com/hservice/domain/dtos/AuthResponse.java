package com.hservice.domain.dtos;

import lombok.Data;

import java.util.Map;

@Data
public class AuthResponse {
    private String status;
    private Map<String,String> errors;
}
