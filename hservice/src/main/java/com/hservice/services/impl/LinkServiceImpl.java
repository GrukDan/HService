package com.hservice.services.impl;

import com.hservice.exceptions.NotFoundException;
import com.hservice.models.Link;
import com.hservice.repositories.LinkRepository;
import com.hservice.services.LinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class LinkServiceImpl implements LinkService {

    private final LinkRepository linkRepository;

    @Override
    public Link save(Link entity) {
        return linkRepository.save(entity);
    }

    @Override
    public Link findById(Long id) throws NotFoundException {
        return linkRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        linkRepository.deleteById(id);
    }

    @Override
    public Collection<Link> findAll() {
        return null;
    }
}
