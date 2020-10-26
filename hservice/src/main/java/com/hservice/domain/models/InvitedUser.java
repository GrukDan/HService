package com.hservice.domain.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitedUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invitedUserId;

    @NotBlank(message = "Email code is mandatory")
    @Size(min = 10, max = 50, message = "the length of first name is out of range")
    @Email(message = "email isn't valid")
    private String email;

    @CreationTimestamp
    private Timestamp dateOfInvitation;

    @Enumerated(EnumType.STRING)
    @Size(min = 6, max = 45)
    private InvitedUserStatus status;

    private Timestamp expirationTime;
}
