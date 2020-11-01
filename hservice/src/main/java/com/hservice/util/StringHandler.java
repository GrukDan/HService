package com.hservice.util;

import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class StringHandler {

    private final String codeSeparator = "-";

    public String generateProjectCodeByProjectName(String projectName) {
        StringBuilder stringBuilder = new StringBuilder();
        Arrays.stream(projectName
                .trim()
                .toUpperCase()
                .split(" "))
                .map(word -> word.charAt(0))
                .forEach(stringBuilder::append);
        return stringBuilder.toString();
    }

    public String generateTaskCode(String projectCode, int number) {
        return projectCode +
                codeSeparator +
                number;
    }

    public String getNumberFromTaskCode(String taskCode) {
        String[] words = taskCode.split(codeSeparator);
        return words[words.length - 1];
    }
}
