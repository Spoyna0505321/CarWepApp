package com.backend.backendcarapp.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public Map<String, String> uploadImage(MultipartFile file) {
        try {

            Map<String, Object> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "nexus/profile-photos"
                    )
            );

            String url = (String) result.get("secure_url");
            String publicId = (String) result.get("public_id");

            return Map.of(
                    "url", url,
                    "publicId", publicId
            );

        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not upload image to Cloudinary", e
            );
        }
    }

    public void deleteImage(String publicId) {
        try {

            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.emptyMap()
            );

        } catch (Exception e) {
            throw new RuntimeException(
                    "Could not delete image from Cloudinary", e
            );
        }
    }
}