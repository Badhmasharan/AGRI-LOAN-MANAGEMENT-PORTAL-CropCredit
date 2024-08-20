package com.example.backend.service;

import com.example.backend.model.ImageModel;
import com.example.backend.repository.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepo imageModelRepository;

    public ImageModel storeImage(MultipartFile photo, MultipartFile aadhar, MultipartFile landCertificate) throws IOException {
        ImageModel imageModel = new ImageModel();
        imageModel.setPhotoUpload(photo.getBytes());
        imageModel.setAadharUpload(aadhar.getBytes());
        imageModel.setLandCertificateUpload(landCertificate.getBytes());
        return imageModelRepository.save(imageModel);
    }

    public Optional<ImageModel> getImage(Long id) {
        return imageModelRepository.findById(id);
    }
}
