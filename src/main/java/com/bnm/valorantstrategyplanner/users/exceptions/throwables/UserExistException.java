package com.bnm.valorantstrategyplanner.users.exceptions.throwables;

public class UserExistException extends RuntimeException {
    public UserExistException() {
        super("User exist.");
    }
}
