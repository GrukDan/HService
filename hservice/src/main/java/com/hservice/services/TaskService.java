package com.hservice.services;

import com.hservice.domain.models.Task;

import java.util.Collection;

public interface TaskService extends CrudService<Task,Long> {

    Collection<Task> findAlByExecutor(long executor);

    Collection<Task> findTasksByProjectId(Long projectId, int page, int size, boolean order, String parameter);
}
