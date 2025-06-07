package com.example.exaltbackend.service;

import com.example.exaltbackend.bean.Photo;
import com.example.exaltbackend.bean.UserPatient;
import com.example.exaltbackend.repository.PhotoRepository;
import com.example.exaltbackend.repository.UserPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;
    private final UserPatientRepository userPatientRepository;

    @Autowired
    public PhotoServiceImpl(PhotoRepository photoRepository, UserPatientRepository userPatientRepository) {
        this.photoRepository = photoRepository;
        this.userPatientRepository = userPatientRepository;
    }

    @Override
    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

    @Override
    public Optional<Photo> getPhotoById(int id) {
        return photoRepository.findById(id);
    }

    @Override
    public Photo createPhoto(Photo photo, Long idUserPatient) {
        Optional<UserPatient> userPatient = userPatientRepository.findById(idUserPatient);
        if (userPatient.isPresent()) {
            photo.setUserPatient(userPatient.get());
        }
        // need to get the 2nd part string of the response in react
        return photoRepository.save(photo);
    }

    @Override
    public Photo updatePhoto(int id, Photo newPhoto) {
        return photoRepository.findById(id)
                .map(photo -> {
                    photo.setPhoto(newPhoto.getPhoto());
                    photo.setQuestion((newPhoto.getQuestion()));
                    photo.setIncorrectAnswerA((newPhoto.getIncorrectAnswerA()));
                    photo.setIncorrectAnswerB((newPhoto.getIncorrectAnswerB()));
                    photo.setIncorrectAnswerC((newPhoto.getIncorrectAnswerC()));
                    photo.setCorrectAnswer((newPhoto.getCorrectAnswer()));
                    return photoRepository.save(photo);
                })
                .orElseThrow();
    }
/*    if (photoRepository.findById(id)) {
        photo.setId(id);
        return photoRepository.save(photo);
    } else {
        throw new RuntimeException("Photo with ID " + id + " not found");
    }*/

    @Override
    public void deletePhoto(int id) {
        if (photoRepository.existsById(id)) {
            photoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Photo with ID " + id + " not found");
        }
    }

    @Override
    public List<Photo> getallPhotosByUserPatient(Long userPatientId) {
        Optional<UserPatient> userPatient = userPatientRepository.findById(userPatientId);
        List<Photo> todasFotos = null;
        if (userPatient.isPresent()) {
            todasFotos = photoRepository.findByUserPatient(userPatient.get());

        } else {

        }
        return todasFotos;
    }
}
