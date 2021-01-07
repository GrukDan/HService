package com.hservice.services.impl;

import com.hservice.domain.models.Task;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.TaskRepository;
import com.hservice.services.ProjectService;
import com.hservice.services.TaskService;
import com.hservice.util.StringHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectService projectService;
    private final StringHandler stringHandler;

    @Override
    public Task save(Task entity) throws AlreadyExistsException {
        try {
            entity.setTaskCode(generateTaskShortDtoByProject(entity.getProject()));
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
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

    private String generateTaskShortDtoByProject(long projectId) throws NotFoundException {
        Task task = taskRepository.getOneByMaxTaskId(projectId).orElseGet(Task::new);

        int numberCode = nonNull(task.getTaskCode())
                ? Integer.parseInt(stringHandler.getNumberFromTaskCode(task.getTaskCode())) + 1
                : 1;
        String projectCode = projectService.findById(projectId).getProjectCode();
        return stringHandler.generateTaskCode(projectCode, numberCode);
    }

    @Override
    public List<Task> findAlByExecutor(long executor) {
        return (List<Task>) taskRepository.findAllByTaskExecutor(executor);
    }

    @Override
    public List<Task> findTasksByProjectId(Long projectId, int page, int size, boolean order, String parameter) {
        return taskRepository.findAllByProject(
                projectId,
                PageRequest.of(
                        page,
                        size,
                        Sort.by(order ? Sort.Direction.ASC : Sort.Direction.DESC,
                                parameter)))
                .getContent();
    }
}
