package com.hservice.controllers;


import com.hservice.domain.models.History;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.services.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/histories")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping("/all/{task}")
    public ResponseEntity<?> getAllByTask(@PathVariable("task") long task){
        return
                ResponseEntity.ok(historyService.findAllByTask(task));
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody History history) throws AlreadyExistsException {
        return ResponseEntity.ok(historyService.save(history));
    }
}
