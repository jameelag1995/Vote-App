# Voting Web Application Documentation

## Introduction

This React web application allows users to participate in a voting process. The application includes features such as a login page, a voting page with candidate selection, a statistics page for administrators, and support for dark and light modes.

## Features

### 1. Login Page

- Users can log in using their email and password.
- Email and password verification are implemented for user authentication.
- The login page provides a secure entry point for users.

### 2. Voting Page

- Users can view all candidates and cast their votes.
- The voting page allows users to change their votes if needed.
- The interface is user-friendly and accessible.

### 3. Statistics Page for Admins

- Administrators can view a list of all users with their full names.
- Admins can see if a user has voted or not.
- A votes chart displays the distribution of votes for each candidate.

### 4. Dark and Light Modes

- The application supports both dark and light modes.
- Users can toggle between modes based on their preferences.
- The mode selection is managed using React context and hooks.

## Technology Stack

- React
- React Hooks: `useContext`, `createContext`, `useState`, `useEffect`, `useRef`
- Chart.js for displaying voting statistics charts
- Context API for managing dark and light modes
