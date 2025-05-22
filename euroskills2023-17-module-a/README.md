# Marketable IT Skills Project Repository

## Title of the Project

Design & Implementation: Promo Website

## Skill domain(s)

- Web Technologies

## Task Origin

This project task is based on test projects based on the EuroSkills Gdansk 2023 competition Module-A test project submitted by Cyril Wanner (CH) and Sebastian Häni (CH). Tasks from these competitions are updated, modularized, and standardized to form the basis of the project task repository within the Erasmus+ "Marketable IT Skills" project.

## Content

- [Project Description](project-description.md)
- [Media Files](tree/main/src//assets)

## How to develop and deploy the project?

1. Create a new GitHub repository based on the following template repository: [https://github.com/marketable-it-skills/mits-html-and-vanila-js-v1](https://github.com/marketable-it-skills/mits-html-and-vanila-js-v1)
2. Create your solution in the `/src` folder.
3. When you push a commit to GitHub, an auto-deployment process will start according to the GitHub Actions defined in the repository (`.github` folder). During this process, a Docker image will be built and stored in the Github Container Registry.
4. Modify the following line in the `docker-compose.yml` according to your GitHub username and your repository name: `image: ghcr.io/<your-github-account/<your-repo-name>/<your-repo-name>:latest`
5. Start the Docker container using the `docker compose up -d` command.
6. Your deployment will be accessible at the `http://localhost` URL.

## About the Project

This repository is part of the **"Marketable IT Skills: Integrating Real-World Challenges into Vocational Education"** project [1-5]. The project is supported by the **Erasmus+ programme** of the European Union. It is coordinated by the **HTTP Foundation** (Hungary) in cooperation with the partner institution **Helsinki Business College OY** (Finland). The primary goal of the project is to support IT vocational education by providing a collection of project tasks and a web application with an evaluation support system. These tasks aim to reflect labor market expectations, simulate real workplace challenges, and support talent management. The project's task collection draws upon competition materials of WorldSkills, EuroSkills and different national and international competition. The web application is being developed as part of the project activities.
