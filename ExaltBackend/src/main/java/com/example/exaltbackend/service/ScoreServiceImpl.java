package com.example.exaltbackend.service;

import com.example.exaltbackend.bean.GameType;
import com.example.exaltbackend.bean.Score;
import com.example.exaltbackend.bean.UserPatient;
import com.example.exaltbackend.repository.ScoreRepository;
import com.example.exaltbackend.repository.UserPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ScoreServiceImpl implements ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserPatientRepository userPatientRepository;

    @Autowired
    public ScoreServiceImpl(ScoreRepository scoreRepository, UserPatientRepository userPatientRepository) {
        this.scoreRepository = scoreRepository;
        this.userPatientRepository = userPatientRepository;
    }

    @Override
    public List<Score> getAllScoresByUserPatientAndGameType(Long userPatientId, String gameType) {
        Optional<UserPatient> userPatient = userPatientRepository.findById(userPatientId);
        return scoreRepository.findByUserPatientAndGameType(userPatient.get(), GameType.valueOf(gameType));
    }

    @Override
    public Optional<Score> updateScore(@PathVariable long id, @RequestBody Score newPuntuacion) {
        return scoreRepository.findById(id)
                .map(score -> {
                    score.setMaxLevel(newPuntuacion.getMaxLevel());
                    return scoreRepository.save(score);
                });
    }

    @Override
    public Score saveScore(Score score, Long idUserPatient) {
        Optional<UserPatient> userPatient = userPatientRepository.findById(idUserPatient);
        if(userPatient.isPresent()) {
            score.setUserPatient(userPatient.get());
        }
        return scoreRepository.save(score);
    }

    @Override
    public Score getScoreByUserPatientAndGameTypeAndDate(Long userPatientId, GameType gameType, LocalDate date) {
        Optional<UserPatient> userPatient = userPatientRepository.findById(userPatientId);
        if (userPatient.isPresent()){
            return scoreRepository.getScoreByUserPatientAndGameTypeAndDate(userPatient.get(), gameType, date);
        }
        return null;
    }
}
