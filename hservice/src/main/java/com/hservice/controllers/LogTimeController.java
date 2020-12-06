package com.hservice.controllers;

import com.hservice.domain.models.LogTime;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.services.LogTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/log-times")
@RequiredArgsConstructor
public class LogTimeController {

    private final LogTimeService logTimeService;

    @PostMapping
    public LogTime save(@RequestBody LogTime logTime) throws AlreadyExistsException {
        return logTimeService.save(logTime);
    }

    @GetMapping("/by-task/{task}")
    public List<LogTime> getLogTimesByTask(@PathVariable long task) {
        return logTimeService.getLogTimesByTask(task);
    }
}
