package com.hservice.services.impl;

import com.hservice.domain.models.Task;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.TaskRepository;
import com.hservice.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Task save(Task entity) throws AlreadyExistsException {
        if (taskRepository.existsByTaskCode(entity.getTaskCode()))
            throw new AlreadyExistsException();
        return taskRepository.save(entity);
    }

    @Override
    public Task findById(Long id) throws NotFoundException {
        return taskRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Collection<Task> findAll() {
        return taskRepository.findAll();
    }
}
