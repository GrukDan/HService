package com.hservice.services;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public interface CrudService<T,PK extends Serializable> {

    T save(T entity);

    T findById(PK id);

    void deleteById(PK id);

    Collection<T> findAll();
}
