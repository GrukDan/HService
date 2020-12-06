package com.hservice.services;

import com.hservice.domain.models.Comment;

import java.util.List;

public interface CommentService extends CrudService<Comment,Long>{
    List<Comment> findAllByTask(long task);
}
