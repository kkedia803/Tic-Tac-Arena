# Tic Tac Arena 🎮

A live, real-time two-player Tic Tac Toe game built with React and Socket.io. Challenge your friends in the interactive Tic Tac Arena, where you can create or join game rooms, make moves in sync, and see results instantly with smooth gameplay.


## Features
- **Real-Time Gameplay**: Enjoy instant, seamless moves using Socket.io for live updates.
- **Room Creation & Join**: Create a unique game room or join an existing one with a Game ID.
- **Responsive Design**: Optimized for various screen sizes with a custom, modern interface.
- **Custom Styling**: Unique fonts and a semi-transparent background for an immersive experience.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express
- **Real-Time Communication**: Socket.io
- **Styling**: CSS (custom styles for a sleek look)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) for game state persistence (optional)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kkedia803/Tic-Tac-Arena.git
    cd tic-tac-arena
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    cd server
    node server.js
    ```

4. Start the frontend:
    ```bash
    cd ..
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to play the game.

## How to Play
1. **Create a Game**: Start a new game room to get a unique Game ID. Share this ID with a friend.
2. **Join a Game**: Enter an existing Game ID to join a friend’s room.
3. **Take Turns**: Players alternate turns as X and O. The game resets automatically after a win or draw.

## Future Enhancements
- Persistent game history
- Support for more than two players
- Animated transitions and sounds

## Contributing
Pull requests are welcome. For major changes, please open an issue to discuss your ideas.

---

Enjoy playing Tic Tac Arena with friends, and may the best player win! 🎉
