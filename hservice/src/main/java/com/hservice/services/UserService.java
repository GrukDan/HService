package com.hservice.services;

import com.hservice.domain.dtos.UserLongDto;
import com.hservice.domain.dtos.UserShortDto;
import com.hservice.domain.models.User;
import com.hservice.exceptions.NotFoundException;

import java.util.Collection;

public interface UserService extends CrudService<User,Long> {

    boolean existsByEmailAndPassword(String email,String password);

    boolean existsByUserNameAndPassword(String userName,String password);

    int countUsersByProjectId(long projectId);

    User findByUserNameAndPassword(String userName, String password) throws NotFoundException;

    Collection<UserShortDto> findProjectLeads();

    Collection<UserShortDto> findUsersByProjectId(Long projectId);

    Collection<UserLongDto> findMembersByProjectId(Long projectId, int page, int size, boolean order, String parameter);
}
