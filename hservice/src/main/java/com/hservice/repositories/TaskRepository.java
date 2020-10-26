package com.hservice.repositories;

import com.hservice.domain.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    boolean existsByTaskCode(String taskCode);
}
