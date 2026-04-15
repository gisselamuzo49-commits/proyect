# Task Manager Project (MERN Stack)

Welcome to the **Task Manager** project! This is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) and containerized with Docker for an effortless development experience.

## 🚀 Technologies

* **Frontend:** React + Vite (Modern, Premium UI)
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Infrastructure:** Docker & Docker Compose

## 📁 Project Structure

```
.
├── backend/            # Express.js REST API
├── fronted/            # React + Vite Application
└── docker-compose.yml  # Docker orchestration file
```

## 📋 Prerequisites

To run this project, you only need to have installed:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (must be running in the background)
* Git (to clone the repository)

You do **not** need to install Node.js or MongoDB locally, Docker will handle all the environments automatically!

## 🛠️ How to run the application

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gisselamuzo49-commits/Practica-1.git
   cd Practica-1
   ```

2. **Start the containers:**
   Run the following command at the root of the project:
   ```bash
   docker compose up --build -d
   ```

3. **Access the application:**
   * **Frontend (UI):** Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
   * **Backend API (Express):** Running on `http://localhost:5000/api/tasks`
   * **Database (MongoDB):** Running internally on port `27017`

## 🛑 Stopping the application

To stop the services safely without deleting the code, run:
```bash
docker compose down
```

## 🤝 Contributing

1. Clone the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request pointing to the `main` branch.
