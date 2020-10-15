package com.hservice.services.impl;

import com.hservice.exceptions.NotFoundException;
import com.hservice.models.Status;
import com.hservice.repositories.StatusRepository;
import com.hservice.services.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;

    @Override
    public Status save(Status entity) {
        return statusRepository.save(entity);
    }

    @Override
    public Status findById(Long id) throws NotFoundException {
        return statusRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        statusRepository.deleteById(id);
    }

    @Override
    public Collection<Status> findAll() {
        return statusRepository.findAll();
    }
}
