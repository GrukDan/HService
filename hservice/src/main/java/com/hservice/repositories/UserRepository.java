package com.hservice.repositories;

import com.hservice.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailAndPassword(String email, String password);

    boolean existsByUserNameAndPassword(String userName, String password);

    Optional<User> findByUserNameAndPassword(String userName, String password);

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.roleName = :roleName")
    Collection<User> findUsersByRoleName(@Param("roleName") String roleName);

    @Query("SELECT DISTINCT u FROM User u JOIN u.projects p WHERE p.projectId = :projectId")
    Collection<User> findUsersByProjectId(@Param("projectId") Long projectId);
}
