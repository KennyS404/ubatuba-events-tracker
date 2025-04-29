# Ubatuba Events Tracker

## Project Overview

Ubatuba Events Tracker is a full-stack web application designed to help users discover, create, and manage local events in Ubatuba, São Paulo. This platform provides an intuitive user interface for browsing events, with robust backend services supporting data management and user authentication.

## Features

### Core Requirements

- **Event Discovery**: Browse a comprehensive list of upcoming events in Ubatuba
- **Search & Filtering**: Find events by title or filter by categories
- **Event Details**: View complete information about any event
- **Event Management**: Create, edit, and delete events (authenticated users)
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **RESTful API**: Complete backend API for data operations

### Additional Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Personal Event Management**: Users can manage their own created events
- **Categories**: Events are organized by categories for easier discovery
- **Image Upload**: Support for event images to enhance visual appeal
- **Internationalization**: Complete bilingual support (English/Portuguese)
- **Dark/Light Mode**: Customizable interface theme for user preference
- **Animated Transitions**: Smooth animations between page navigation
- **Date/Time Localization**: Properly formatted dates based on user's locale
- **Welcome Page**: Dedicated landing page highlighting platform features
- **Visual Feedback**: Loading indicators and status messages for better UX

## Technical Stack

### Frontend
- React 19.0.0
- TypeScript 5.7.2
- React Router 7.5.2
- Tailwind CSS 4.1.4
- Framer Motion 12.9.2
- React DatePicker 8.3.0
- Lucide React (icons)

### Backend
- Python
- FastAPI
- SQLAlchemy ORM
- JWT Authentication
- Pydantic for validation

### Database
- PostgreSQL 14

### Infrastructure
- Docker & Docker Compose
- Uvicorn ASGI server

## Installation & Setup

### Prerequisites
- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Quick Start with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/kennys404/ubatuba-events-tracker.git
   cd ubatuba-events-tracker
   ```

2. Create environment files:
   
   For the backend (backend/.env):
   ```
   DATABASE_URL=postgresql://ubatuba:ubatuba_pass@db:5432/ubatuba_events
   SECRET_KEY=j8a9t2wuBRn7Vds3Kp5hXqYzFcM4eG6L
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```
   
   For the frontend (frontend/.env):
   ```
   VITE_API_URL=http://localhost:8000
   ```

3. Start the application with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Stopping the Application
```bash
docker-compose down
```

## Usage Guide

### User Registration & Authentication
- Navigate to the "Register" page to create a new account
- Log in using your credentials
- Upon successful login, you'll be redirected to the events page

### Browsing Events
- The main page displays all upcoming events
- Use the search bar to find events by title
- Use the category dropdown to filter events by type

### Creating an Event
- Log in to your account
- Click on "New Event" in the navigation menu
- Fill in the event details (title, description, date, location, category)
- Optionally upload an event image
- Submit the form to create your event

### Managing Your Events
- Navigate to "My Events" in the navigation menu
- View, edit, or delete events you've created

### Changing Display Settings
- Toggle between light and dark mode using the theme switch
- Change language between English and Portuguese using the language selector

## API Documentation

The backend provides a RESTful API with the following endpoints:

### Authentication

**POST /api/auth/register** - Register a new user
```
Body: { "username": "string", "email": "string", "password": "string", "full_name": "string" }
```

**POST /api/auth/login** - Log in and receive access token
```
Body: Form data with username and password
```

**GET /api/auth/me** - Get current user information (requires authentication)

### Events

**GET /api/events** - List all events

Query parameters:
- search: Filter by title (optional)
- category: Filter by category (optional)
- skip: Pagination offset (optional)
- limit: Maximum results (optional)

**GET /api/events/my** - List events created by the authenticated user
- Same query parameters as GET /api/events

**GET /api/events/{id}** - Get detailed information about a specific event

**GET /api/events/{id}/image** - Get the image for a specific event

**POST /api/events** - Create a new event (requires authentication)
```
Multipart form data with event details and optional image
```

**PUT /api/events/{id}** - Update an existing event (requires authentication, event ownership)
```
Multipart form data with event details and optional image
```

**DELETE /api/events/{id}** - Delete an event (requires authentication, event ownership)

## Acknowledgements

This project was developed as part of a coding challenge to demonstrate full-stack development capabilities. It showcases modern web development practices, including responsive design, API integration, and containerization.

## License

This project is licensed under the MIT License - see the LICENSE file for details.