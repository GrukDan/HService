package com.hservice.services;

import com.hservice.domain.dtos.AuthRequest;
import com.hservice.domain.dtos.AuthResponse;
import com.hservice.domain.dtos.UserLongDto;
import com.hservice.domain.dtos.UserShortDto;
import com.hservice.domain.models.User;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;

import javax.mail.MessagingException;
import java.util.Collection;

public interface UserService extends CrudService<User,Long> {

    boolean existsByEmailAndPassword(String email,String password);

    boolean existsByUserNameAndPassword(String userName,String password);

    int countUsersByProjectId(long projectId);

    User findByUserNameAndPassword(String userName, String password) throws NotFoundException;

    Collection<UserShortDto> findProjectLeads();

    Collection<UserShortDto> findUsersByProjectId(Long projectId);

    Collection<UserLongDto> findMembersByProjectId(Long projectId, int page, int size, boolean order, String parameter);

    User invite(User user) throws AlreadyExistsException, MessagingException;

    User update(User updatedUser) throws NotFoundException, AlreadyExistsException;

    AuthResponse auth(AuthRequest authRequest) throws NotFoundException;
}
