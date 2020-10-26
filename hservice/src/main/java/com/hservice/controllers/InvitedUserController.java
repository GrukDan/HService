package com.hservice.controllers;

import com.hservice.services.InvitedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/invated-user")
@RequiredArgsConstructor
public class InvitedUserController {

    private final InvitedUserService invitedUserService;

}
