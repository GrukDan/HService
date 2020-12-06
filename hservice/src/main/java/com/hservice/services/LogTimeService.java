package com.hservice.services;

import com.hservice.domain.models.LogTime;

import java.util.List;

public interface LogTimeService extends CrudService<LogTime, Long> {
    List<LogTime> getLogTimesByTask(long task);
}
