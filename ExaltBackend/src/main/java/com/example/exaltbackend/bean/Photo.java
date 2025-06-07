package com.example.exaltbackend.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Arrays;
import java.util.Objects;


@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Lob
    @Column(name = "photo")
    private byte[] photo;

    //private Integer photo;
    @Column(name = "question")
    private String question;
    @Column(name = "incorrect_answer_a")
    private String incorrectAnswerA;
    @Column(name = "incorrect_answer_b")
    private String incorrectAnswerB;
    @Column(name = "incorrect_answer_c")
    private String incorrectAnswerC;
    @Column(name = "correct_answer")
    private String correctAnswer;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_patient_id", nullable = false)
    @JsonIgnore
    private UserPatient userPatient;

    public Photo(byte[] photo, String question, String incorrectAnswerA, String incorrectAnswerB, String incorrectAnswerC, String correctAnswer, UserPatient userPatient) {
        this.photo = photo;
        this.question = question;
        this.incorrectAnswerA = incorrectAnswerA;
        this.incorrectAnswerB = incorrectAnswerB;
        this.incorrectAnswerC = incorrectAnswerC;
        this.correctAnswer = correctAnswer;
        this.userPatient = userPatient;
    }

    public Photo() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getIncorrectAnswerA() {
        return incorrectAnswerA;
    }

    public void setIncorrectAnswerA(String incorrectAnswerA) {
        this.incorrectAnswerA = incorrectAnswerA;
    }

    public String getIncorrectAnswerB() {
        return incorrectAnswerB;
    }

    public void setIncorrectAnswerB(String incorrectAnswerB) {
        this.incorrectAnswerB = incorrectAnswerB;
    }

    public String getIncorrectAnswerC() {
        return incorrectAnswerC;
    }

    public void setIncorrectAnswerC(String incorrectAnswerC) {
        this.incorrectAnswerC = incorrectAnswerC;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public UserPatient getUserPatient() {
        return userPatient;
    }

    public void setUserPatient(UserPatient userPatient) {
        this.userPatient = userPatient;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Photo photo = (Photo) o;
        return id == photo.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Photo{" +
                "id=" + id +
                ", photo=" + Arrays.toString(photo) +
                ", question='" + question + '\'' +
                ", incorrectAnswerA='" + incorrectAnswerA + '\'' +
                ", incorrectAnswerB='" + incorrectAnswerB + '\'' +
                ", incorrectAnswerC='" + incorrectAnswerC + '\'' +
                ", correctAnswer='" + correctAnswer + '\'' +
                ", userPatient=" + userPatient +
                '}';
    }
}