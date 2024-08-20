package com.example.backend.repository;

import com.example.backend.model.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<ImageModel,Long> {

}
