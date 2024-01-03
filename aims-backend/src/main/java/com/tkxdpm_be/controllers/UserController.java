package com.tkxdpm_be.controllers;


import com.tkxdpm_be.entities.User;
import com.tkxdpm_be.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequestMapping("/users")
@RequiredArgsConstructor

public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getAllUser () {
        List<User> user = userService.findAllUser();
        return ResponseEntity.ok().body(user);
    }
}
