package com.example.exaltbackend.service;

import com.example.exaltbackend.bean.Photo;

import java.util.List;
import java.util.Optional;

public interface PhotoService {

    List<Photo> getAllPhotos();

    Optional<Photo> getPhotoById(int id);

    Photo createPhoto(Photo photo, Long idUserPatient);

    Photo updatePhoto(int id, Photo photo);

    void deletePhoto(int id);

    List<Photo> getallPhotosByUserPatient(Long userPatientId);
 
    
}
