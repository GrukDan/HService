package com.hservice.services.impl;

import com.hservice.domain.models.Priority;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.PriorityRepository;
import com.hservice.services.PriorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class PriorityServiceImpl implements PriorityService {

    private final PriorityRepository priorityRepository;

    @Override
    public Priority save(Priority entity) {
        return priorityRepository.save(entity);
    }

    @Override
    public Priority findById(Long id) throws NotFoundException {
        return priorityRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        priorityRepository.deleteById(id);
    }

    @Override
    public Collection<Priority> findAll() {
        return priorityRepository.findAll();
    }
}
