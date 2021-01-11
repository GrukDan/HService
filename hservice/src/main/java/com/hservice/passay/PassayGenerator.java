package com.hservice.passay;

/**
 * Random sequence generation
 */
public interface PassayGenerator {

    String generatePassword();

    /**
     *
     * @param length the length of the returned character sequence
     * @return random alphabetical sequence
     */
    String generateAlphabetCode(int length);
}
