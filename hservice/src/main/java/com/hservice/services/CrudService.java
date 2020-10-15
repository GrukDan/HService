package com.hservice.services;

import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;

import java.io.Serializable;
import java.util.Collection;

public interface CrudService<T,PK extends Serializable> {

    T save(T entity) throws AlreadyExistsException;

    T findById(PK id) throws NotFoundException;

    void deleteById(PK id);

    Collection<T> findAll();
}
