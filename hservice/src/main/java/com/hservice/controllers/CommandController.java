package com.hservice.controllers;

import com.hservice.domain.dtos.CommandShortDto;
import com.hservice.services.CommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api/commands")
@RequiredArgsConstructor
public class CommandController {

    private final CommandService commandService;

    @GetMapping("/all/dtos")
    public Collection<CommandShortDto> getAllDtos() {
        return commandService.getAllDtos();
    }
}
