package com.hservice.email;

import com.hservice.domain.models.User;

import javax.mail.MessagingException;

public interface EmailService {

    void sendEmailToUser(User user) throws MessagingException;
}
