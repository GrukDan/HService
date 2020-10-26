package com.hservice.services.impl;

import com.hservice.domain.models.History;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.HistoryRepository;
import com.hservice.services.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    @Override
    public History save(History entity) {
        return historyRepository.save(entity);
    }

    @Override
    public History findById(Long id) throws NotFoundException {
        return historyRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        historyRepository.deleteById(id);
    }

    @Override
    public Collection<History> findAll() {
        return historyRepository.findAll();
    }

    @Override
    public Collection<History> findAllByTask(long task) {
        return historyRepository.findAllByTask(task);
    }
}
