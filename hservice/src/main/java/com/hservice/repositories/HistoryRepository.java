package com.hservice.repositories;

import com.hservice.models.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface HistoryRepository extends JpaRepository<History,Long> {

    Collection<History> findAllByTask(long task);

}
