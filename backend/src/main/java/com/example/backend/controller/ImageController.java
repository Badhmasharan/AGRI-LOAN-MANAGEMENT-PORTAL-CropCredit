package com.example.backend.controller;

import com.example.backend.model.ImageModel;
import com.example.backend.service.ImageService;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<ImageModel> uploadImage(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("aadhar") MultipartFile aadhar,
            @RequestParam("landCertificate") MultipartFile landCertificate) {
        try {
            ImageModel imageModel = imageService.storeImage(photo, aadhar, landCertificate);
            return ResponseEntity.ok(imageModel);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

     @GetMapping("/{id}/{type}")
    public ResponseEntity<Resource> getImage(@PathVariable Long id, @PathVariable String type) {
        try {
            ImageModel imageModel = imageService.getImage(id)
                    .orElseThrow(() -> new RuntimeException("Image not found"));
            
            byte[] imageData;
            switch (type) {
                case "photo":
                    imageData = imageModel.getPhotoUpload();
                    break;
                case "aadhar":
                    imageData = imageModel.getAadharUpload();
                    break;
                case "landCertificate":
                    imageData = imageModel.getLandCertificateUpload();
                    break;
                default:
                    return ResponseEntity.badRequest().build();
            }

            if (imageData == null) {
                return ResponseEntity.notFound().build();
            }

            ByteArrayResource resource = new ByteArrayResource(imageData);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Adjust if needed
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=image.jpg")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
