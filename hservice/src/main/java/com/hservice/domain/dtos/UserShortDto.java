package com.hservice.domain.dtos;


import com.hservice.domain.models.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class UserShortDto {

    private Long userId;

    private String userName;

    private String firstName;

    private String lastName;

    private String roleName;

    public UserShortDto(@NotNull User user){
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.roleName = user.getRole().getRoleName();
    }
}
