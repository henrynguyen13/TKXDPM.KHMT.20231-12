package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.User;
import com.tkxdpm_be.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {
   private final UserRepository userRepository;

   public List<User> findAllUser() {
       return userRepository.findAllBy();
   }
}
