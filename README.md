# Video Streaming Platform

This is a full-stack web application for streaming video content, built with Django and React. It provides a comprehensive platform for users to browse, search, and watch a catalog of movies and series, similar to popular streaming services.

## Features

- **User Authentication**: Secure user registration and login system using JWT for authentication.
- **Dynamic Content Catalog**: An extensive catalog of movies and series that can be managed through the Django admin panel.
- **Advanced Search**: A powerful search engine that uses NLTK for natural language processing, allowing users to find content easily.
- **Filtering System**: Users can filter content by category, genre, and actors to discover new titles.
- **Video Streaming**: Efficient video streaming with support for subtitles, providing a seamless viewing experience.
- **Content Discovery**: Special sections for "New Content of the Week" and "Trending Searches" to help users discover popular and new titles.
- **Responsive Frontend**: A modern and responsive user interface built with React and Tailwind CSS, ensuring a great experience on all devices.

## Tech Stack

### Backend

- **Framework**: Django & Django REST Framework
- **Authentication**: Djoser & Simple JWT
- **Search**: NLTK for text processing
- **Database**: SQLite3
- **Other**: Corsheaders, Django Filters

### Frontend

- **Framework**: React
-- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Video Playback**: Video.js

## Project Structure

The project is organized into two main parts: the backend (Django) and the frontend (React).

```
/
├── apps/                # Django applications
│   ├── catalogue/       # Manages content, seasons, chapters, and streaming
│   ├── category/        # Manages categories, actors, and genres
│   ├── lists/           # Manages custom and dynamic lists
│   ├── search/          # Handles search functionality
│   └── user/            # Manages user accounts
├── client/              # React frontend application
│   ├── src/
│   └── ...
├── core/                # Core Django project settings
├── manage.py            # Django's command-line utility
└── requirements.txt     # Backend dependencies
```

## Setup and Installation

To get the project up and running on your local machine, follow these steps.

### Prerequisites

- Python 3.x
- Node.js and npm

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd home-project
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Download NLTK data:**
    Open a Python shell (`python`) and run the following commands:
    ```python
    import nltk
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('wordnet')
    ```

5.  **Run database migrations:**
    ```bash
    python manage.py migrate
    ```

6.  **Start the Django development server:**
    ```bash
    python manage.py runserver
    ```
    The backend will be running at `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install npm dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Vite development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173`.

## API Endpoints

The backend provides several API endpoints to interact with the application.

-   `/api/auth/`: User authentication (login, register, etc.).
-   `/api/catalogue/`: Access to the content catalog.
-   `/api/catalogue/stream/<content_id>/[chapter_id]/`: Video streaming.
-   `/api/category/`: List of categories, actors, and genres.
-   `/api/lists/`: Endpoints for custom lists, new content, and trending searches.
