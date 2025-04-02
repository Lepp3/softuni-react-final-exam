# Camera World WebApp 
                                            Documentation 

## Overview 
This project is a web application that allows users to post, comment on, and recommend/remove recommendation on cameras posted by other users. Guests can browse the camera catalog, view individual camera details, and see user profiles along with their posted and recommended camera. 
## Used Libraries 

### Frontend
- **React v19**: A library for building user interfaces.

### Backend
- **Node.js**: For server-side development.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **Mongoose**: For MongoDB object modeling.
- **Bcrypt**: For password hashing.
- **JWT**: For authentication.


## Installation

To run the project locally, follow these steps:

### 1. Start the Server:
1. Navigate to the server folder in an integrated terminal:
    ```bash
    cd server
    ```
2. Install all dependencies:
    ```bash
    npm install
    ```
3. Run the server:
    ```bash
    npm run dev
    ```
   The server will run on [https://localhost:3030/](https://localhost:3030/).

### 2. Prepare the Database:
- Ensure **MongoDB Compass** is installed and running.
- Verify there is no `camera-shop` collection in the database.

### 3. Start the Application:
1. Navigate to the client folder:
    ```bash
    cd client
    ```
2. Install all dependencies:
    ```bash
    npm install
    ```
3. Run the application:
    ```bash
    npm run dev
    ```
   The application will run on [https://localhost:5173/](https://localhost:5173/).

## Functionality

### Guest Features:
- **Login/Register**: Access the app as a registered user or create an account.
- **Explore Catalog**: Browse a list of cameras in the catalog.
- **View Details**: See individual camera details.
- **View User Profiles**: Visit user pages and see their liked or created posts.

### Authenticated User Features:
- **Create Posts**: Share new camera listings.
- **Edit/Delete Posts**: Modify or remove your own listings.
- **Comment**: Leave comments on camera posts.
- **Recommend**: Recommend cameras or remove your recommendation.
- **Delete Comments**: Remove comments from your posts.

### Data Management:
- **Authentication**: Handled by the local server.
- **Data Storage**: Data is stored in the MongoDB database.

## Architecture
### Components:
- **Catalog**: Displays the list of cameras.
- **PostForm**: Allows users to create or edit camera posts.
- **PostDetails**: Shows details of a single post and its comments.
- **Profile**: Displays user information and their liked/created posts.

### Services:
- **AuthService**: Manages user authentication (login, register, JWT).
- **PostService**: Handles CRUD operations for posts.
- **CommentService**: Manages comments on posts.

---

Feel free to tweak anything further as per your needs, Lyuben! 🚀