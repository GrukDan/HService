package com.hservice.repositories;

import com.hservice.domain.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status,Long> {

    boolean existsByStatusName(String statusName);
}
