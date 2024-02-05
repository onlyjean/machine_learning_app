# Full-Stack Machine Learning Web Application

## Introduction
This project is a full-stack web application that demonstrates the integration of machine learning models into a web interface. It utilizes a Python-based machine learning backend with a React frontend to provide users with interactive predictions based on input data. This application is designed to showcase how machine learning models can be deployed effectively to make predictions in real-time.

## Features
- Interactive web interface built with React
- Backend API developed with Flask to serve machine learning predictions
- Integration of a machine learning model to predict real-time outcomes based on user input
- Containerized application deployment using Docker

## Live Demo
You can access a live demo of the application here: [https://main.dsxr40yvbyhag.amplifyapp.com/](https://main.dsxr40yvbyhag.amplifyapp.com/)

## Technologies
- **Frontend:** React for building the user interface
- **Backend:** Flask for handling API requests and serving machine learning model predictions
- **Machine Learning:** Python with libraries such as Pandas, NumPy, and Scikit-Learn for model development
- **Deployment:** Docker for containerization and AWS Amplify for hosting

## Setup and Installation
Ensure you have Docker installed on your machine. Follow these steps to run the application locally:

```bash
# Clone the repository
git clone https://github.com/onlyjean/machine_learning_app.git
cd machine_learning_app

# Build the Docker container
docker build -t ml-web-app .

# Run the application
docker run -p 8000:8000 ml-web-app
