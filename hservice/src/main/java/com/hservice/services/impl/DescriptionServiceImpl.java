package com.hservice.services.impl;

import com.hservice.exceptions.NotFoundException;
import com.hservice.models.Description;
import com.hservice.repositories.DescriptionRepository;
import com.hservice.services.DescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class DescriptionServiceImpl implements DescriptionService {

    private final DescriptionRepository descriptionRepository;

    @Override
    public Description save(Description entity) {
        return descriptionRepository.save(entity);
    }

    @Override
    public Description findById(Long id) throws NotFoundException {
        return descriptionRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        descriptionRepository.deleteById(id);
    }

    @Override
    public Collection<Description> findAll() {
        return descriptionRepository.findAll();
    }
}
