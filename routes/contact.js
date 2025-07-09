module.exports = (req, res) =>  {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // 📝 Log or handle the contact (e.g., send email or store in DB)
  console.log("Contact Form Submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  return res.json({ message: "Thanks for contacting us! We'll get back to you soon." });
};
