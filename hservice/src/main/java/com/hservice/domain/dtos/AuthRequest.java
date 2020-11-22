package com.hservice.domain.dtos;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
