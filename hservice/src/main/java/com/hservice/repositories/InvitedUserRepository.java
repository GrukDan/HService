package com.hservice.repositories;

import com.hservice.domain.models.InvitedUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitedUserRepository extends JpaRepository<InvitedUser,Long> {
}
