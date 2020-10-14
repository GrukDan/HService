package com.hservice.repositories;

import com.hservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailAndPassword(String email, String password);

    boolean existsByUserNameAndPassword(String userName,String password);

    Optional<User> findByUserNameAndPassword(String userName, String password);
}
