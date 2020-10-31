package com.hservice.helper;

import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class StringHandler {

    public String generateProjectCodeByProjectName(String projectName) {
        StringBuilder stringBuilder = new StringBuilder();
         Arrays.stream(projectName
                .trim()
                .toUpperCase()
                .split(" "))
                .map(word->word.charAt(0))
                .forEach(stringBuilder::append);
         return stringBuilder.toString();
    }
}
