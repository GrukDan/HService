package com.hservice.controllers;

import com.hservice.domain.dtos.CommandShortDto;
import com.hservice.domain.models.Command;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.services.CommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public Command save(@RequestBody Command command) throws AlreadyExistsException {
        return commandService.save(command);
    }
}
