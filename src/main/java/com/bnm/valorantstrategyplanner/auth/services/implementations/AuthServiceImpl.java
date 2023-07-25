package com.bnm.valorantstrategyplanner.auth.services.implementations;

import com.bnm.valorantstrategyplanner.auth.services.AuthService;
import com.bnm.valorantstrategyplanner.auth.services.JwtService;
import com.bnm.valorantstrategyplanner.users.exceptions.throwables.PasswordDidNotMatchException;
import com.bnm.valorantstrategyplanner.users.exceptions.throwables.UserExistException;
import com.bnm.valorantstrategyplanner.users.models.User;
import com.bnm.valorantstrategyplanner.users.repositories.UserRepository;
import com.bnm.valorantstrategyplanner.utils.PasswordManagerImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public void register(String email, String firstName, String lastName, String password, String confirmationPassword) {
        Optional<User> optionalUser = this.userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            throw new UserExistException();
        }

        if (!password.equals(confirmationPassword)) {
            throw new PasswordDidNotMatchException();
        }

        User user = new User();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword(PasswordManagerImpl.hashPassword(password));
        this.userRepository.save(user);
    }
}
