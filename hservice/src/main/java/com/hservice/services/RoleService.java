package com.hservice.services;

import com.hservice.domain.models.Role;

import java.util.List;

public interface RoleService extends CrudService<Role, Long> {
    List<Role> findInviteRoles();
}
