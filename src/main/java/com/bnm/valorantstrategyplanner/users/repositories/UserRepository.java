package com.bnm.valorantstrategyplanner.users.repositories;

import com.bnm.valorantstrategyplanner.users.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
}
