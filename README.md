# Movie Recommender System

An interactive movie recommendation system using various filtering techniques, evaluated through metrics, and deployed as a web application.

<p align="center">
  <img src="gifs/movie.gif" alt="Demo" width="600"/>
</p>

## Project Overview

This project aims to help users discover new movies they may enjoy based on movies they've already liked. It started as a data science exploration in Jupyter Notebook and evolved into a full-stack application.

## Features

- Content-based filtering (genres/tags)
- Collaborative filtering:
  - Item-based cosine similarity
  - User-based cosine similarity
  - SVD (matrix factorization)
- Evaluation with precision@10 and recall@10
- Frontend: React (TypeScript)
- Backend: Flask API
- Interactive search and movie rating interface

## What I Did

### 1. Data Exploration

- Used the [MovieLens dataset](https://grouplens.org/datasets/movielens/latest/)
- Cleaned and inspected user ratings and movie metadata in Jupyter Notebook

### 2. Recommendation Techniques

- **Content-Based Filtering:** Used movie genres and cosine similarity
- **Collaborative Filtering:**
  - Item-based: Found similar movies using user rating patterns
  - User-based: Found similar users and their liked movies
- **SVD (TruncatedSVD):** Used dimensionality reduction to model latent factors

### 3. Evaluation

- Split data into train/test by user
- Measured **Precision@10** and **Recall@10** for each model
- Found that **SVD outperformed** both cosine-based methods

| Model      | Precision@10 | Recall@10 |
| ---------- | ------------ | --------- |
| Item-based | 0.0931       | 0.1228    |
| User-based | 0.0974       | 0.0847    |
| SVD        | 0.2102       | 0.1849    |

### 4. Web App

- Built a user interface in **React** with TypeScript
- Created a backend API using **Flask**
- Users can:
  - Search movies (fuzzy search)
  - Select and rate known movies
  - Get personalized recommendations

## Running the App

### 1. Backend (Python/Flask)

```bash
cd backend
python app.py

```

## 1. Frontend (React)

```bash
cd frontend
npm install
npm run dev

```
