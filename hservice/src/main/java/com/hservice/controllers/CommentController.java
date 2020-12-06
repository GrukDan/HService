package com.hservice.controllers;

import com.hservice.domain.models.Comment;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public Comment save(@RequestBody Comment comment) throws AlreadyExistsException {
        return commentService.save(comment);
    }

    @GetMapping("/by-task/{task}")
    public List<Comment> getCommentsByTask(@PathVariable long task){
        return commentService.findAllByTask(task);
    }
}
