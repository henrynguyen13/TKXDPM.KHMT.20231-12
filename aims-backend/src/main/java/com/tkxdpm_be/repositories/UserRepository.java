package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.CartItem;
import com.tkxdpm_be.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    List<User> findAllBy();
}
