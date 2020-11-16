package com.hservice.repositories;

import com.hservice.domain.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    List<Role> findAllByRoleNameIn(Collection<String> roleNames);
}
