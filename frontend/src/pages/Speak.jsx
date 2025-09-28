import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;


function Speak() {
  const [text, setText] = useState('')
  const [voice, setVoice] = useState('en')
  const [speed, setSpeed] = useState(175)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/api/speak/`, { text, voice, speed }, {
        responseType: 'blob', // important for file download
      })

      // Create a URL for the downloaded blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      
      // Extract filename from headers if available
      const disposition = response.headers['content-disposition']
      let filename = 'speech.wav'
      if (disposition && disposition.includes('filename=')) {
        filename = disposition.split('filename=')[1].replace(/"/g, '')
      }

      // Create a temporary link to download
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()

      setMessage(`File downloaded: ${filename}`)
    } catch (err) {
      console.error(err)
      setMessage('Error generating speech.')
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Text to Speech</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows="4"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Voice:</label>
          <input
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Speed:</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit">Speak & Download</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  )
}

export default Speak
