package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.User;
import com.tkxdpm_be.models.requests.LoginRequest;
import com.tkxdpm_be.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import utils.ApiException;
import utils.ERROR;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {
   private final UserRepository userRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   public List<User> findAllUser() {
       return userRepository.findAllBy();
   }

   public User login(LoginRequest request) throws ApiException {
      Optional<User> oUser = this.userRepository.findByUsername(request.getUsername());
      if (oUser.isEmpty()) {
         throw new ApiException(ERROR.BAD_REQUEST, "Không tồn tại tên đăng nhập");
      }
      User user = oUser.get();
      if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
         throw new ApiException(ERROR.INVALID_REQUEST, "Thông tin đăng nhập không đúng");
      }
      return user;
   }
}
