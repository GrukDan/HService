package com.hservice.services.impl;

import com.hservice.domain.models.InvitedUser;
import com.hservice.domain.models.InvitedUserStatus;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.InvitedUserRepository;
import com.hservice.services.InvitedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class InvitedUserServiceImpl implements InvitedUserService {

    private final InvitedUserRepository invitedUserRepository;

    @Override
    public InvitedUser save(InvitedUser entity) throws AlreadyExistsException {
        entity.setStatus(InvitedUserStatus.INVITED);
        return invitedUserRepository.save(entity);
    }

    @Override
    public InvitedUser findById(Long id) throws NotFoundException {
        return invitedUserRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        try {
            InvitedUser invitedUser = invitedUserRepository.findById(id).orElseThrow(NotFoundException::new);
            invitedUser.setStatus(InvitedUserStatus.EXPIRED);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Collection<InvitedUser> findAll() {
        return invitedUserRepository.findAll();
    }
}
