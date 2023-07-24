package com.bnm.valorantstrategyplanner.users.dto.response;

import com.bnm.valorantstrategyplanner.users.enums.Role;
import com.bnm.valorantstrategyplanner.users.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class UserDto implements Serializable {

    private String id;
    private String email;
    private Role role;

    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.role = user.getRole();
    }
}
