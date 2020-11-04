package com.hservice.services;

import com.hservice.domain.models.Task;

import java.util.Collection;

public interface TaskService extends CrudService<Task,Long> {
    Collection<Task> findAlByExecutor(long executor);
}
