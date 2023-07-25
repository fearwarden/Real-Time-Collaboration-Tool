package com.bnm.valorantstrategyplanner.auth;

import com.bnm.valorantstrategyplanner.auth.dto.request.LoginDto;
import com.bnm.valorantstrategyplanner.auth.dto.request.RegisterDto;
import com.bnm.valorantstrategyplanner.auth.dto.response.JwtAuthenticationResponse;
import com.bnm.valorantstrategyplanner.auth.services.AuthService;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Data
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Validated RegisterDto body) {
        this.authService.register(body.getEmail(), body.getFirstName(), body.getLastName(), body.getPassword(), body.getConfirmationPassword());
        return new ResponseEntity<>("User successfully registered.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody @Validated LoginDto body) {
        return ResponseEntity.ok(this.authService.login(body.getEmail(), body.getPassword()));
    }
}
