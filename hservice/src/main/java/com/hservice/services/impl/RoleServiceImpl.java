package com.hservice.services.impl;

import com.hservice.models.Role;
import com.hservice.repositories.RoleRepository;
import com.hservice.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role save(Role entity) {
        return roleRepository.saveAndFlush(entity);
    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    @Override
    public void deleteById(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Collection<Role> findAll() {
        return roleRepository.findAll();
    }
}
