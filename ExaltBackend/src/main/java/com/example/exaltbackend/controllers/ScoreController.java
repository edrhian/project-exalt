package com.example.exaltbackend.controllers;

import com.example.exaltbackend.bean.GameType;
import com.example.exaltbackend.bean.Score;
import com.example.exaltbackend.repository.UserPatientRepository;
import com.example.exaltbackend.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/scores")
public class ScoreController {

    private final ScoreService scoreService;
    private final UserPatientRepository userPatientRepository;

    @Autowired
    public ScoreController(ScoreService scoreService, UserPatientRepository userPatientRepository) {
        this.scoreService = scoreService;
        this.userPatientRepository = userPatientRepository;
    }

    @GetMapping("/{userPatientId}/{gameType}")
    public ResponseEntity<List<Score>> getScores(@PathVariable Long userPatientId, @PathVariable String gameType){
        List<Score> scores = scoreService.getAllScoresByUserPatientAndGameType(userPatientId, gameType);
        return ResponseEntity.ok(scores);
    }

    @PostMapping("/{idUserPatient}")
    public ResponseEntity<Score> createScore(@RequestBody Score score, @PathVariable Long idUserPatient){
        Score savedScore = scoreService.saveScore(score, idUserPatient);
        return ResponseEntity.ok(savedScore);
    }

    @PutMapping("/{id}")
    public Optional<Score> modifyScore(@PathVariable Long id, @RequestBody Score newScore){
        return scoreService.updateScore(id, newScore);
    }

    @GetMapping("/{userPatientId}/{gameType}/{date}")
    public Score getScore(@PathVariable Long userPatientId, @PathVariable GameType gameType, @PathVariable LocalDate date){
        return scoreService.getScoreByUserPatientAndGameTypeAndDate(userPatientId, gameType, date);
    }
}
