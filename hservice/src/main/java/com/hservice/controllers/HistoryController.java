package com.hservice.controllers;


import com.hservice.domain.models.History;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.services.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/histories")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping("/all/{task}")
    public Collection<History> getAllByTask(@PathVariable("task") long task) {
        return historyService.findAllByTask(task);
    }

    @PostMapping
    public History save(@RequestBody History history) throws AlreadyExistsException {
        return historyService.save(history);
    }
}
