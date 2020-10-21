package com.hservice.dtos;


import com.hservice.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserShortDto {

    private Long userId;

    private String userName;

    private String firstName;

    private String lastName;

    private String roleName;

    public UserShortDto(User user){
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.roleName = user.getRole().getRoleName();
    }
}
