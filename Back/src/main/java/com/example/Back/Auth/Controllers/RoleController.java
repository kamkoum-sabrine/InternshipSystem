package com.example.Back.Auth.Controllers;

import com.example.Back.Auth.Models.Role;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    @Autowired
    RoleService roleService;
    @GetMapping("/all")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }
}
