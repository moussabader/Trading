package tn.esprit.similator.service;

import tn.esprit.similator.entity.User;

import java.util.List;

public interface IUserService {
    List<User> retrieveAllUsers();
    User retrieveUser(Long userId);
    User addUserAndAssignPortfolio(User user);
    void removeUser(Long userId);
    User modifyUser(User user);
    // User registerUser(User user) throws Exception;
    // User loginUser(String email, String password) throws Exception;
    User changeStatus(Boolean status, Long userId);
}
