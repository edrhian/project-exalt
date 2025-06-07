package com.example.exaltbackend.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="SCORE")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name="date")
    private LocalDate date;

    @Column(name="max_level")
    private int maxLevel;

    @Enumerated(EnumType.STRING)
    @Column(name="game_type")
    private GameType gameType;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name="user_patient_id", nullable=false)
    private UserPatient userPatient;

    public Score() {
    }

    public Score(LocalDate date, int maxLevel, GameType gameType, UserPatient userPatient) {
        this.date = date;
        this.maxLevel = maxLevel;
        this.gameType = gameType;
        this.userPatient = userPatient;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getMaxLevel() {
        return maxLevel;
    }

    public void setMaxLevel(int maxLevel) {
        this.maxLevel = maxLevel;
    }

    public GameType getGameType() {
        return gameType;
    }

    public void setGameType(GameType gameType) {
        this.gameType = gameType;
    }

    public UserPatient getUserPatient() {
        return userPatient;
    }

    public void setUserPatient(UserPatient userPatient) {
        this.userPatient = userPatient;
    }

    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                ", date=" + date +
                ", maxLevel=" + maxLevel +
                ", gameType=" + gameType +
                ", userPatient=" + userPatient +
                '}';
    }
}
