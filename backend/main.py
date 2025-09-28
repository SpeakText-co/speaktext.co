# filename: main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
import subprocess
import uuid
import os


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="eSpeak API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Directory to store temporary audio files
TEMP_DIR = "audio_files"
os.makedirs(TEMP_DIR, exist_ok=True)

class TTSRequest(BaseModel):
    text: str
    voice: str = "en"  # default voice
    speed: int = 175   # default speed


@app.post("/api/speak/")
def speak(request: TTSRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Generate unique filename
    filename = f"{uuid.uuid4()}.wav"
    filepath = os.path.join(TEMP_DIR, filename)

    # Build eSpeak command
    command = [
        "espeak",
        f"-v{request.voice}",
        f"-s{request.speed}",
        "-w", filepath,
        request.text
    ]

    try:
        # Run eSpeak
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Error generating speech: {e}")

    # Return the generated file
    return FileResponse(filepath, media_type="audio/wav", filename=filename)
