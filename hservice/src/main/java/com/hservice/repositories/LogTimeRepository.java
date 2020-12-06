package com.hservice.repositories;

import com.hservice.domain.models.LogTime;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogTimeRepository extends CrudRepository<LogTime,Long> {
    List<LogTime> findAllByTask(long task);
}
