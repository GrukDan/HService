package com.hservice.services.impl;

import com.hservice.domain.models.Role;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.RoleRepository;
import com.hservice.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role save(Role entity) {
        return roleRepository.saveAndFlush(entity);
    }

    @Override
    public Role findById(Long id) throws NotFoundException {
        return roleRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Collection<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> findInviteRoles() {
        return roleRepository.findAllByRoleNameIn(Arrays.asList("DEVELOPER", "TESTER"));
    }
}
