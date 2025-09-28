Sure! Here’s a **professional and clear README** for your `speaktext.co` project that covers both the backend and frontend, Docker setup, and usage instructions:

---

# SpeakText.co

SpeakText.co is a web application that converts text to speech using **eSpeak**. The backend is built with **FastAPI**, and the frontend is a **React** application. The project is fully dockerized for easy setup and deployment.

---

## Features

* Convert any text input into speech using eSpeak.
* Customizable voice and speech speed.
* React frontend for easy text input and audio playback.
* Fully containerized for consistent development and production environments.

---

## Project Structure

```
speaktext.co/
│
├─ backend/           # FastAPI backend
│  ├─ main.py
│  ├─ requirements.txt
│  ├─ Dockerfile
│  └─ audio_files/    # Temporary storage for generated audio
│
├─ frontend/          # React frontend
│  ├─ package.json
│  ├─ Dockerfile
│  ├─ src/
│  └─ public/
│
└─ docker-compose.yml # Orchestrates backend and frontend
```

---

## Prerequisites

* [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.
* Optional (if running backend locally): Python 3.12+ and eSpeak installed.

---

## Running the Project with Docker

1. Clone the repository:

```bash
git clone <your-repo-url>
cd speaktext.co
```

2. Build and start the containers:

```bash
docker-compose up --build
```

3. Access the applications:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8000](http://localhost:8000)

---

## Backend API

### Endpoint: `POST /speak/`

**Request Body (JSON):**

```json
{
  "text": "Hello, world!",
  "voice": "en-us",
  "speed": 150
}
```

* `text` (string) – The text to convert to speech. **Required**
* `voice` (string) – eSpeak voice. Default: `"en"`
* `speed` (integer) – Speech speed. Default: `175`

**Response:**

* Returns a `.wav` audio file containing the generated speech.

---

## Frontend Usage

1. Navigate to the frontend URL: [http://localhost:3000](http://localhost:3000)
2. Enter text in the input field and click **Speak**.
3. The app will request speech from the backend and play the resulting audio.

---

## Development

### Backend (without Docker)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (without Docker)

```bash
cd frontend
npm install
npm run dev
```

---

## License

This project is licensed under the MIT License.

---

If you want, I can also **add a “Tips for Deployment” section** to the README that explains how to serve both frontend and backend on the same domain with Nginx. That’s super useful for production.

Do you want me to add that?
