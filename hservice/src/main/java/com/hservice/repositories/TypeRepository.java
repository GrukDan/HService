package com.hservice.repositories;

import com.hservice.domain.models.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type,Long> {
    boolean existsByTypeName(String typeName);
}
