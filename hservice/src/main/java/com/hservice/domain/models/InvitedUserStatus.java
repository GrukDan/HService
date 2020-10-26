package com.hservice.domain.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum InvitedUserStatus {
    INVITED("Приглашен"),
    EXPIRED("Срок регистрации истек");

    private final String statusName;

}
