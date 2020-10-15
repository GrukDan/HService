package com.hservice.exceptions.exceptionHandler;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FieldValidationError {
    private String object;
    private String field;
    private Object rejectedValue;
    private String message;

    public FieldValidationError(String object, String message) {
        this.object = object;
        this.message = message;
    }
}
