package com.example.backend.controller;

import com.example.backend.model.AdminModel;
import com.example.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/isAdminPresent")
    public ResponseEntity<Boolean> isAdminPresent(@RequestBody AdminModel data) {
        boolean isPresent = adminService.isAdminPresent(data);
        return ResponseEntity.ok(isPresent);
    }

}
