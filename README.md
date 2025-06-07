# Cross-Platform Development Course Final Project: **Exalt**

> **Note:** This repository serves as an academic record of the final project developed during the Cross-Platform Development course. It is not actively maintained and was created for educational purposes.

This is the final project developed for the Cross-Platform Development course at [Institut TIC de Barcelona](https://agora.xtec.cat/iticbcn/). The application was built using **React Native**, **Spring Boot**, and **Python**.

## Introduction

**Exalt** is a cross-platform app designed to monitor the progression of **Alzheimer's disease** in patients by using memory-related games as cognitive assessment tools. The goal is to provide caregivers and healthcare professionals with data on the patient’s cognitive performance over time.

## The Games

The app currently includes **three types of games**, each designed to engage memory and cognitive skills:

- **Memory** – A classic card-matching game where users find matching pairs.
- **Puzzle** – A grid-based game where users complete puzzles by placing pieces in the correct position.
- **Family** – Allows caregivers to upload photos along with personalized questions. The patient is then prompted to select the correct answer based on the image and question (e.g., *"What is this person's name?"*).

## Current Features

- Role-based **sign-in/sign-up system** with password encryption.
- Ability to **save and retrieve** data from the **Memory** game.
- **Score visualization** using charts for the Memory game.
- Upload, modify, and delete images used in the **Family** game.

## Missing Features

- Data saving and chart generation for the **Family** and **Puzzle** games.
- Sending **cognitive performance reports** to the caregiver or doctor.
- **Dynamic puzzle generation** (currently, all pieces are hardcoded).
- No mobile version (only desktop/web)

## Known Issues / Project Flaws

- Missing `.env` configuration file for environment variables.
- No **Docker containerization**.
- No clean code
- Limited **component reuse** in the front-end.

## Collaborators

This was a group project developed by:
- [AleksandraJ22](https://github.com/AleksandraJ22)
- [Aqeedat](https://github.com/Aqeedat-Nabi)
- [edrhian](https://github.com/edrhian)