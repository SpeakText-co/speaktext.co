# Use official Python image
FROM python:3.12-slim

# Install eSpeak
RUN apt-get update && apt-get install -y espeak && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app files
COPY . .

# Create audio folder
RUN mkdir -p audio_files

# Expose port
EXPOSE 8000

# Run app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
