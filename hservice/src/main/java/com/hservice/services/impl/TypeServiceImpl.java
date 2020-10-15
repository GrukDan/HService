package com.hservice.services.impl;

import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.models.Type;
import com.hservice.repositories.TypeRepository;
import com.hservice.services.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class TypeServiceImpl implements TypeService {

    private final TypeRepository typeRepository;

    @Override
    public Type save(Type entity) throws AlreadyExistsException {
        if (typeRepository.existsByTypeName(entity.getTypeName()))
            throw new AlreadyExistsException();
        return typeRepository.save(entity);
    }

    @Override
    public Type findById(Long id) throws NotFoundException {
        return typeRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        typeRepository.deleteById(id);
    }

    @Override
    public Collection<Type> findAll() {
        return typeRepository.findAll();
    }
}
