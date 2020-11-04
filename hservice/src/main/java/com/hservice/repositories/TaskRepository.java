package com.hservice.repositories;

import com.hservice.domain.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    boolean existsByTaskCode(String taskCode);

    @Query("SELECT t FROM Task t WHERE t.taskId = (SELECT max(t.taskId) FROM t WHERE t.project=:projectId)")
    Optional<Task> getOneByMaxTaskId(@Param("projectId") long projectId);

    Collection<Task> findAllByTaskExecutor(long taskExecutor);
}
