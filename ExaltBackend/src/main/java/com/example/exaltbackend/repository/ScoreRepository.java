package com.example.exaltbackend.repository;

import com.example.exaltbackend.bean.GameType;
import com.example.exaltbackend.bean.Score;
import com.example.exaltbackend.bean.UserPatient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {

    Score getScoreByUserPatientAndGameTypeAndDate(UserPatient userPatient, GameType gameType, LocalDate date);

    List<Score> findByUserPatientAndGameType(UserPatient userPatient, GameType gameType);


}
