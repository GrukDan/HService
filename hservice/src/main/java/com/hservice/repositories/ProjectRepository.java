package com.hservice.repositories;

import com.hservice.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {

    boolean existsByProjectCode(String projectCode);
}
