Student Registration System:
A JavaScript DOM project — built as part of my college assignment
This is a simple browser-based app I built to manage student records — things like registering new students, editing their info, and deleting entries. Nothing fancy, but it works well and the data actually sticks around even after you refresh (thanks to localStorage).
The whole thing runs off three files, so no build tools or setup required — just open the HTML file in a browser and you're good to go.

**GitHub Repository:** https://github.com/Zishan-Khan7/Student-Registration-System

## Files Structure:
├── index.html       # The main HTML structure of the application
├── style.css        # Custom CSS for styling and responsiveness
├── script.js       # Core JavaScript logic and DOM manipulation
└── README.md        # Project documentation and overview

## Form validation

The form won't submit unless all fields pass these checks:

- **Name** — letters and spaces only
- **Student ID** — must be a number
- **Email** — standard email format (`user@example.com`)
- **Contact** — numeric, at least 10 digits.