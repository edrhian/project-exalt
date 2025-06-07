package com.example.exaltbackend.service;

import com.example.exaltbackend.bean.GameType;
import com.example.exaltbackend.bean.Score;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScoreService {


    List<Score> getAllScoresByUserPatientAndGameType( Long userPatientId, String gameType);

    Optional<Score> updateScore(@PathVariable long id, @RequestBody Score newPuntuacion);

    Score saveScore(Score score, Long idUserPatient);

    Score getScoreByUserPatientAndGameTypeAndDate(Long userPatient, GameType gameType, LocalDate date);
}
