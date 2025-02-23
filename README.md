 # Task Management Application

## Overview
This Task Management Application allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections:
- **To-Do**
- **In Progress**
- **Done**

All changes are saved instantly to the database to ensure data persistence. The application is designed to be clean, minimalistic, and fully responsive for both desktop and mobile users.

## Features
- **Task Management**: Add, edit, and delete tasks with real-time updates.
- **Drag-and-Drop Interface**: Users can move tasks between different categories.
- **Real-Time Synchronization**: Updates propagate instantly across all connected clients using Socket.io.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Live Status Updates**: Instantly reflect changes across sessions.

## Technologies Used
### Frontend
- **React.js (Vite.js)** - For building a fast and responsive UI.
- **Tailwind CSS** - For a minimal and modern design.
- **@dnd-kit/core** & **@dnd-kit/sortable** - For implementing drag-and-drop functionality.
- **Socket.io-client** - For real-time updates.

### Backend
- **Express.js** - For handling server-side logic.
- **MongoDB (without Mongoose)** - As the database for storing tasks.
- **Socket.io** - For real-time event-driven communication.

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB database set up
- Firebase project configured for authentication

### Steps
#### 1. Clone the repository:
```sh
git clone https://github.com/Litonuddinnil/Job_Task_Client_Site
cd task-management-app
```
#### 2. Install dependencies:
```sh
npm install
```
#### 3. Set up environment variables:
Create a `.env` file in the root directory and add:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
FIREBASE_API_KEY=your_firebase_api_key
```
#### 4. Start the backend server:
```sh
npm run server
```
#### 5. Start the frontend:
```sh
npm run dev
```

## Usage
1. Register or log in using Firebase Authentication.
2. Create a new task by entering a title, description, category, deadline, and budget.
3. Drag and drop tasks between "To-Do", "In Progress", and "Done" sections.
4. Edit or delete tasks as needed.
5. All updates are synchronized in real-time across connected clients.

## Contributing
Contributions are welcome! Feel free to submit pull requests or report issues.

## License
This project is licensed under the MIT License.

