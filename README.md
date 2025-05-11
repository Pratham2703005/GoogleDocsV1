# Google Docs v1

A real-time collaborative document editor inspired by Google Docs. This mini-project allows multiple users to work on the same document simultaneously from different devices.

![Google Docs v1 Interface](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-11%20194539-CBrraymj3P7kmT2UGIOkXRdlM6gnuK.png)

## 🚀 Live Demo

Try it now: [https://google-docs-v1.vercel.app/](https://google-docs-v1.vercel.app/)

## ✨ Features

- **Instant Room Creation**: When you visit the application, a unique document room is automatically created
- **Real-time Collaboration**: Multiple users can edit the same document simultaneously
- **Rich Text Editing**: Format text with various styling options (bold, italic, lists, headings, etc.)
- **Persistent Storage**: Documents are saved automatically to MongoDB
- **Shareable URLs**: Simply share the document URL with others to collaborate

![Collaborative Editing](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-11%20194839-mzriAC8sSZwUIItyOqGUsKEE91UEfz.png)

## 🛠️ Tech Stack

This project is built with the MERN stack plus Socket.io:

- **M**ongoDB - Document storage
- **E**xpress - Backend server
- **R**eact - Frontend UI
- **N**ode.js - Runtime environment
- **Socket.io** - Real-time communication

## 🏗️ Architecture

### Frontend

The frontend is built with React and uses:

- **Quill** - Rich text editor
- **Socket.io-client** - Real-time communication with the server
- **React Router** - Navigation and document ID management
- **UUID** - Generation of unique document IDs

### Backend

The backend server handles:

- Socket.io connections for real-time updates
- MongoDB operations to save and retrieve documents
- Express server for API endpoints

## 💻 Code Overview

### How It Works

1. When a user visits the application, they are redirected to a new document with a unique ID
2. The frontend connects to the backend via Socket.io
3. If the document exists in the database, it's loaded; otherwise, a new document is created
4. Any changes made by a user are:
   - Sent to the server via Socket.io
   - Broadcasted to all other connected users
   - Periodically saved to the database

### Key Components

#### Frontend

- **App.jsx**: Sets up routing and generates unique document IDs
- **TextEditor.jsx**: Implements the Quill editor with Socket.io integration

#### Backend

- **server.js**: Handles Socket.io connections and MongoDB operations
- **document.js** (model): Defines the MongoDB schema for documents
