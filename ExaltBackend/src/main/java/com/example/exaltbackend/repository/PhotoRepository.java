package com.example.exaltbackend.repository;

import com.example.exaltbackend.bean.Photo;
import com.example.exaltbackend.bean.UserPatient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    // trial of photo repository
    Optional<Photo> findById(int id);

    List<Photo> findByUserPatient(UserPatient userPatient);// devuelve las fotos de un user en concreto
}
