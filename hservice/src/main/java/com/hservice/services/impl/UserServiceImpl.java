package com.hservice.services.impl;

import com.hservice.domain.dtos.AuthRequest;
import com.hservice.domain.dtos.AuthResponse;
import com.hservice.domain.dtos.UserLongDto;
import com.hservice.domain.dtos.UserShortDto;
import com.hservice.domain.models.User;
import com.hservice.domain.models.UserStatus;
import com.hservice.email.EmailService;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.passay.PassayGenerator;
import com.hservice.repositories.UserRepository;
import com.hservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PassayGenerator passayGenerator;
    private final EmailService emailService;

    @Override
    public User save(User entity) throws AlreadyExistsException {
        entity.checkStatus();
        if (!userRepository.existsByUserNameAndPassword(entity.getUserName(), entity.getPassword())) {
            entity.setStatus(UserStatus.CREATED);
            return userRepository.save(entity);
        }
        throw new AlreadyExistsException(String.format("User with user name: %s already exists", entity.getUserName()));
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
        return toUserShortDtos(userRepository.findUsersByRoleName("ADMIN"));
    }

    @Override
    public Collection<UserShortDto> findUsersByProjectId(Long projectId) {
        return toUserShortDtos(userRepository.findUsersByProjectId(projectId));
    }

    private Collection<UserShortDto> toUserShortDtos(Collection<User> users) {
        return Optional.of(users)
                .get().stream()
                .map(UserShortDto::new)
                .sorted(Comparator.comparing(UserShortDto::getFirstName))
                .collect(Collectors.toList());
    }

    private Collection<UserLongDto> toUserLongDtos(Collection<User> users) {
        return Optional.of(users)
                .get().stream()
                .map(UserLongDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<UserLongDto> findMembersByProjectId(Long projectId, int page, int size, boolean order, String parameter) {
        return toUserLongDtos(userRepository
                .findUsersByProjectId(
                        projectId,
                        PageRequest.of(page, size, Sort.by(order ? Sort.Direction.ASC : Sort.Direction.DESC, parameter)))
                .getContent());
    }

    @Override
    public int countUsersByProjectId(long projectId) {
        return userRepository.countUsersByProjectId(projectId);
    }

    @Override
    public User invite(User user) throws AlreadyExistsException, MessagingException {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new AlreadyExistsException(String.format("User with email: %s already exists", user.getEmail()));
        }

        do {
            user.setPassword(passayGenerator.generatePassword());
        } while (userRepository.existsByEmailAndPassword(user.getEmail(), user.getPassword()));

        user.setStatus(UserStatus.INVITED);
        user.setUserName(user.getEmail());
        //emailService.sendEmailToUser(user);
        return save(user);
    }

    @Override
    public User update(User updatedUser) throws NotFoundException, AlreadyExistsException {
        User user = findById(updatedUser.getUserId());
        user.update(updatedUser);
        return save(user);
    }

    @Override
    public AuthResponse auth(AuthRequest authRequest) throws NotFoundException {
        User user = userRepository.findByUserNameAndPassword(authRequest.getUsername(), authRequest.getPassword())
                .orElseThrow(NotFoundException::new);
        if(user.isExpired())userRepository.save(user);
        return new AuthResponse(user);
    }
}
