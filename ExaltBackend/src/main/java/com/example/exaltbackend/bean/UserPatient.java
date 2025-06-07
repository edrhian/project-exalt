package com.example.exaltbackend.bean;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "USER_PATIENT")
public class UserPatient implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "patient_name")
    private String fullName;
    @Column(unique = true)
    private String dni;
    @Column(name = "hospital_name")
    private String hospital;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name="user_admin_id",nullable=false)
    private UserAdmin userAdmin;
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Score> scoreList;
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Photo> photoList;
    
    public UserPatient() {
    }

    public UserPatient(String fullName, String dni, String hospital, UserAdmin userAdmin, List<Score> scoreList) {
        this.fullName = fullName;
        this.dni = dni;
        this.hospital = hospital;
        this.userAdmin = userAdmin;
        this.scoreList = scoreList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public UserAdmin getUserAdmin() {
        return userAdmin;
    }

    public void setUserAdmin(UserAdmin userAdmin) {
        this.userAdmin = userAdmin;
    }

    public List<Score> getScoreList() {
        return scoreList;
    }

    public void setScoreList(List<Score> scoreList) {
        this.scoreList = scoreList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPatient that = (UserPatient) o;
        return id == that.id && Objects.equals(fullName, that.fullName) && Objects.equals(dni, that.dni) && Objects.equals(hospital, that.hospital) && Objects.equals(userAdmin, that.userAdmin) && Objects.equals(scoreList, that.scoreList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fullName, dni, hospital, userAdmin, scoreList);
    }

    @Override
    public String toString() {
        return "UserPatient{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", dni='" + dni + '\'' +
                ", hospital='" + hospital + '\'' +
                ", userAdmin=" + userAdmin +
                ", scoreList=" + scoreList +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
