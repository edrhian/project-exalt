package com.example.exaltbackend.controllers;

import com.example.exaltbackend.bean.Photo;
import com.example.exaltbackend.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/photos")
public class PhotoController {
    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping
    public ResponseEntity<List<Photo>> getAllPhotos() {
        List<Photo> photos = photoService.getAllPhotos();
        return new ResponseEntity<>(photos, HttpStatus.OK);
    }

    //
    /*
     * @GetMapping("/{id}")
     * public ResponseEntity<Photo> getPhotoById(@PathVariable int id) {
     * Photo photo = photoService.getPhotoById(id);
     * return new ResponseEntity<>(photo, HttpStatus.OK);
     * }
     */

    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable int id) {
        Optional<Photo> optionalPhoto = photoService.getPhotoById(id);
        if (optionalPhoto.isPresent()) {
            Photo photo = optionalPhoto.get();
            return new ResponseEntity<>(photo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//("http://localhost:8080/photos/${userPatient}")
    @PostMapping("/user/{idUserPatient}")
    public ResponseEntity<Photo> createPhoto(@RequestBody Photo photo, @PathVariable Long idUserPatient) {
        Photo createdPhoto = photoService.createPhoto(photo, idUserPatient);
        return ResponseEntity.ok(createdPhoto);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Photo> updatePhoto(@PathVariable int id, @RequestBody Photo photo) {
        Photo updatedPhoto = photoService.updatePhoto(id, photo);
        return new ResponseEntity<>(updatedPhoto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable int id) {
        photoService.deletePhoto(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<Photo>> getAllPhotosByUser(@PathVariable Long idUser) {

        List<Photo> photos = photoService.getallPhotosByUserPatient(idUser);
        if (!photos.isEmpty()) {
            return new ResponseEntity<List<Photo>>(photos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

}
