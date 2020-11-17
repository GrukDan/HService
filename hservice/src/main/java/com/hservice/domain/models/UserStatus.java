package com.hservice.domain.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserStatus {
    INVITED("Приглашен"),
    EXPIRED("Срок регистрации истек"),
    CREATED("Создан");

    private final String statusName;

}
