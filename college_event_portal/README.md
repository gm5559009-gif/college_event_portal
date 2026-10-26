# CampusLive — College Event Portal

A responsive front-end project for **Front End Development Frameworks for Web Applications**.

## Features
- Responsive navigation bar with mobile menu
- Hero section and event categories
- Event cards with category, event image, date, time, venue and registration
- Category filtering, live search and sort controls
- Registration modal with form validation
- Duplicate registration prevention
- Registrations stored in browser `localStorage`
- Responsive layouts for desktop, tablet and mobile
- Accessible labels, semantic sections and reduced-motion support

## Run in VS Code
1. Extract `college_event_portal.zip`.
2. Open the `college_event_portal` folder in Visual Studio Code.
3. Install the **Live Server** extension (if not installed).
4. Right-click `index.html` → **Open with Live Server**.
5. Your browser will open the CampusLive portal.

You can also open `index.html` directly in a browser, but Live Server is recommended.

## Project structure
```
college_event_portal/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Customize the project
- **Events:** Edit the `events` array near the top of `script.js`.
- **Colors/layout:** Edit CSS variables at the top of `style.css`.
- **Branding/text:** Edit `index.html`.
- **Images:** Replace the event image URLs with your own hosted images.

## Important demo note
This is a front-end-only academic project. Registration details are saved in that browser's local storage and are not sent to a college server. Use sample data for demonstrations; do not collect real sensitive student data. For production, add a secure backend, authentication, database, server-side validation and privacy notice.
