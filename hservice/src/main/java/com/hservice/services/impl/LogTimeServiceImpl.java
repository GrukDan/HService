package com.hservice.services.impl;

import com.hservice.domain.models.LogTime;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.LogTimeRepository;
import com.hservice.services.LogTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LogTimeServiceImpl implements LogTimeService {

    private final LogTimeRepository logTimeRepository;

    @Override
    public LogTime save(LogTime entity) throws AlreadyExistsException {
        return logTimeRepository.save(entity);
    }

    @Override
    public LogTime findById(Long id) throws NotFoundException {
        return logTimeRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        logTimeRepository.deleteById(id);
    }

    @Override
    public Collection<LogTime> findAll() {
        return null;
    }

    @Override
    public List<LogTime> getLogTimesByTask(long task) {
        return logTimeRepository.findAllByTask(task);
    }
}
