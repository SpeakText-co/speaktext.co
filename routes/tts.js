// server/tts.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid text input' });
  }

  const fileName = `output_${Date.now()}.wav`;
  const outputPath = path.join(os.tmpdir(), fileName);

  // Command to run eSpeak (Linux)
  const command = `espeak "${text.replace(/"/g, '\\"')}" -w ${outputPath}`;

  exec(command, (error) => {
    if (error) {
      console.error('eSpeak error:', error);
      return res.status(500).json({ error: 'Text-to-speech failed' });
    }

    res.download(outputPath, 'speech.wav', (err) => {
      fs.unlink(outputPath, () => {}); // Clean up temp file
      if (err) {
        console.error('File send error:', err);
      }
    });
  });
};
