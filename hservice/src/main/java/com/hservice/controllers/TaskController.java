package com.hservice.controllers;

import com.hservice.domain.models.Task;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody Task task) throws AlreadyExistsException, NotFoundException {
        return ResponseEntity.ok(taskService.save(task));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) throws NotFoundException {
        return ResponseEntity.ok(taskService.findById(id));
    }

    @GetMapping("/by-executor")
    public ResponseEntity<?> getTasksByExecutor(@RequestParam("executor") long executor){
        return ResponseEntity.ok(taskService.findAlByExecutor(executor));
    }
}
