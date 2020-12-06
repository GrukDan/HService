package com.hservice.services.impl;

import com.hservice.domain.models.Comment;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.CommentRepository;
import com.hservice.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Comment save(Comment entity) {
        return commentRepository.save(entity);
    }

    @Override
    public Comment findById(Long id) throws NotFoundException {
        return commentRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public Collection<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> findAllByTask(long task) {
        return commentRepository.findAllByTask(task);
    }
}
