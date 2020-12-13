package com.hservice.services;

import com.hservice.domain.models.Task;

import java.util.List;

public interface TaskService extends CrudService<Task,Long> {

    List<Task> findAlByExecutor(long executor);

    List<Task> findTasksByProjectId(Long projectId, int page, int size, boolean order, String parameter);
}
