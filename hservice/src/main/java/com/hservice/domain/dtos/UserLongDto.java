package com.hservice.domain.dtos;

import com.hservice.domain.models.Role;
import com.hservice.domain.models.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class UserLongDto {
    private Long userId;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String position;
    private String department;
    private String placeOfResidence;
    private Timestamp lastActivity;
    private String avatarUrl;
    private Timestamp dateOfRegistration;

    public UserLongDto(User user){
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.position = user.getPosition();
        this.department = user.getDepartment();
        this.placeOfResidence = user.getPlaceOfResidence();
        this.lastActivity = user.getLastActivity();
        this.avatarUrl = user.getAvatarUrl();
        this.dateOfRegistration = user.getDateOfRegistration();
    }

}
