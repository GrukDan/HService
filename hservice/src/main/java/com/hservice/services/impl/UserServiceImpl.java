package com.hservice.services.impl;

import com.hservice.domain.dtos.UserShortDto;
import com.hservice.domain.models.User;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.UserRepository;
import com.hservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User save(User entity) throws AlreadyExistsException {
        if (userRepository.existsByUserNameAndPassword(entity.getUserName(), entity.getPassword())
                || userRepository.existsByEmailAndPassword(entity.getEmail(), entity.getPassword()))
            throw new AlreadyExistsException(String.format("User with user name: %s already exists", entity.getUserName()));
        return userRepository.save(entity);
    }

    @Override
    public User findById(Long id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public boolean existsByEmailAndPassword(String email, String password) {
        return userRepository.existsByEmailAndPassword(email, password);
    }

    @Override
    public boolean existsByUserNameAndPassword(String userName, String password) {
        return userRepository.existsByUserNameAndPassword(userName, password);
    }

    @Override
    public User findByUserNameAndPassword(String userName, String password) throws NotFoundException {
        return userRepository.findByUserNameAndPassword(userName, password).orElseThrow(NotFoundException::new);
    }

    @Override
    public Collection<UserShortDto> findProjectLeads() {
        return fromUsers(userRepository.findUsersByRoleName("ADMIN"));
    }

    @Override
    public Collection<UserShortDto> findUsersByProjectId(Long projectId) {
        return fromUsers(userRepository.findUsersByProjectId(projectId));
    }

    private Collection<UserShortDto> fromUsers(Collection<User> users) {
        return Optional.of(users)
                .get().stream()
                .map(UserShortDto::new)
                .sorted(Comparator.comparing(UserShortDto::getFirstName))
                .collect(Collectors.toList());
    }
}
