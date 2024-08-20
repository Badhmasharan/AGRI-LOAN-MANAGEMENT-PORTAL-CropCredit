package com.example.backend.repository;

import com.example.backend.model.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<AdminModel, Integer>  {
    AdminModel findByEmail(String email);
}
