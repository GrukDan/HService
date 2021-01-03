package com.hservice.email;

import com.hservice.domain.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String from;

    @Value("${home.page.url}")
    private String homePageUrl;

    private final String subject = "You are invited to the system HService";
    private final JavaMailSender javaMailSender;

    @Override
    public void sendEmailToUser(User user) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        String htmlMsg = "<h2>You are invited to the system HService</h3>"
                + String.format("<h4>Your login: %s</h4>", user.getUserName())
                + String.format("<h4>Your password: %s</h4>", user.getPassword())
                + String.format("<h4>Term expires: %s</h4>", user.getExpirationTime())
                + String.format("<a url='%s'>Click to start:</a>", homePageUrl)
                + "<img src='https://churchillsquareconsulting.com/wp-content/uploads/2017/06/Project-Management-Fundamentals.jpg'>";

        message.setContent(htmlMsg, "text/html");
        message.setFrom(from);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        javaMailSender.send(message);
    }
}
