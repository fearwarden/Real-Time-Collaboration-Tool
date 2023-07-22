package com.bnm.valorantstrategyplanner.users;

import com.bnm.valorantstrategyplanner.users.services.UserService;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@Data
public class UserController {

    private final UserService userService;
}
