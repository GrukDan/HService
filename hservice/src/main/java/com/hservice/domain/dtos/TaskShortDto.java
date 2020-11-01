package com.hservice.domain.dtos;

import com.hservice.domain.models.Task;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaskShortDto {

    private Long taskId;
    private String taskName;
    private String taskCode;

    public TaskShortDto(Task task) {
        this.taskId = task.getTaskId();
        this.taskName = task.getTaskName();
        this.taskCode = task.getTaskCode();
    }

    public TaskShortDto(String taskName, String taskCode) {
        this.taskName = taskName;
        this.taskCode = taskCode;
    }

    public TaskShortDto(String taskCode){
        this.taskCode = taskCode;
    }
}
