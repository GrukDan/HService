package com.hservice.passay;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.stereotype.Component;

@Component
public class PassayGeneratorImpl implements PassayGenerator {

    @Override
    public String generatePassword() {
        CharacterRule digits = new CharacterRule(EnglishCharacterData.Digit);
        CharacterRule alphabetical = new CharacterRule(EnglishCharacterData.Alphabetical);

        PasswordGenerator passwordGenerator = new PasswordGenerator();
        return passwordGenerator.generatePassword(6, digits,alphabetical);
    }

    @Override
    public String generateAlphabetCode(int length) {
        CharacterRule alphabetical = new CharacterRule(EnglishCharacterData.Alphabetical);
        PasswordGenerator codeGenerator = new PasswordGenerator();
        return codeGenerator.generatePassword(length,alphabetical);
    }
}
