package com.hservice.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logTimeId;
    @NotBlank
    private String workTime;
    private long task;
    private long executor;
    @CreationTimestamp
    private Timestamp loggingTime;
    @ManyToOne
    @JoinColumn(name = "activity_type", nullable = false)
    private Type activityType;
    @ManyToOne
    @JoinColumn(name = "description")
    private Description description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LogTime)) return false;
        LogTime logTime = (LogTime) o;
        return task == logTime.task &&
                executor == logTime.executor &&
                Objects.equals(logTimeId, logTime.logTimeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(logTimeId, task, executor);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("LogTime{");
        sb.append("activityType=").append(activityType);
        sb.append(", description=").append(description);
        sb.append(", executor=").append(executor);
        sb.append(", loggingTime=").append(loggingTime);
        sb.append(", logTimeId=").append(logTimeId);
        sb.append(", task=").append(task);
        sb.append(", workTime='").append(workTime).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
