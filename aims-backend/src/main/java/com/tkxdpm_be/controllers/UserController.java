package com.tkxdpm_be.controllers;


import com.tkxdpm_be.entities.User;
import com.tkxdpm_be.models.requests.LoginRequest;
import com.tkxdpm_be.services.UserService;
import lombok.RequiredArgsConstructor;
import model.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utils.ApiException;

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

    @PostMapping
    public BaseResponse<User> login(@RequestBody LoginRequest request) throws ApiException {
        BaseResponse<User> response = new BaseResponse<>();
        response.setData(this.userService.login(request));
        return response;
    }
}
