package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ImageModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] photoUpload;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] aadharUpload;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] landCertificateUpload;
}
