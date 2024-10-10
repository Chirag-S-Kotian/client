# CDrive Frontend

Welcome to the CDrive frontend repository! This application serves as the user interface for CDrive, a secure cloud storage solution that allows users to upload, manage, and share their files effortlessly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Configuration](#api-configuration)
- [Developer](#developer)
- [License](#license)

## Features

- User Authentication: Users can register and log in to access their files securely.
- File Management: Upload, view, and delete files with a simple interface.
- Responsive Design: Optimized for both mobile and desktop devices.
- Intuitive UI: Beautifully animated and user-friendly design powered by [Framer Motion](https://www.framer.com/motion/).
- Dark Mode Support: The application adapts to the user's system theme.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.
- **Framer Motion**: A library for creating animations in React.
- **Lucide**: A collection of icons for UI design.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Installation

To get started with the CDrive frontend, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Chirag-S-Kotian/client.git
   ```
2. Navigate into the project directory:
   ```bash
   cd client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Configuration

The frontend communicates with a backend API. To configure the API endpoint, create a `.env.local` file in the root directory of the project and add the following variables:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_URL=http://localhost:3000
```

Make sure the backend server is running on the specified port.

## Developer

### Chirag S Kotian

Feel free to reach out for any questions or collaborations!

#
