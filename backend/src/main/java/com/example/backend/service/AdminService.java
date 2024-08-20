package com.example.backend.service;

import com.example.backend.model.AdminModel;
import com.example.backend.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepository;

    public boolean isAdminPresent(AdminModel data) {
        AdminModel admin = adminRepository.findByEmail(data.getEmail());
        return admin != null && admin.getPassword().equals(data.getPassword());
    }

    public AdminModel saveAdmin(AdminModel admin) {
        return adminRepository.save(admin);
    }

}