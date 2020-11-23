package com.hservice.domain.dtos;

import com.hservice.domain.models.User;
import lombok.Data;

import java.util.Collections;
import java.util.Map;

@Data
public class AuthResponse {
    private User user;
    private String status;
    private boolean mustRegister;
    private String token;
    private Map<String,String> errors;

    public AuthResponse(User user){
        this.user = user;
        this.mustRegister = user.isInvited();
        checkErrors();
    }

    private void checkErrors(){
        if(user.isExpired()){
            errors = Collections.singletonMap("error.expired",String.format("registration expired on %s",user.getExpirationTime().toString()));
        }
    }
}
