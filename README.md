Ghosts of Javascriptmas Past - Snowball Wars
=============
**HolidayJS 2015 Hackathon Project

[Play Now - http://snowballwars.herokuapp.com/](http://snowballwars.herokuapp.com/)

## Goals
- Clone [Agar.io](https://github.com/huytd/agar.io-clone) 
- Christmasify the game (falling snow, music, colors, snowflakes, logos) 
- Add Santa's Naughty list - kills
- Integrate Backand to maintain high scores and utilize social logins 
- Publish app on Heroku
- Win Awesome Prizes

## Technology Utilized
- Javascript
- Node.js
- Socket.IO
- Backand / Angular.js

 
You are the white snow ball in the center of the screen. Use your mouse to point in the direction you want to move.

Your objective is to gain mass and grow larger by consuming snow flakes and other players / snowballs. 

Other players are moving snowballs of various sizes. You can only consume other players that are smaller than you, 
and larger players will consume you. Be careful and survive as long as possible!


---

## How to Play
>You can check out a more elaborated how to play on our [wiki](https://github.com/huytd/agar.io-clone/wiki/How-to-Play)

#### Game Basics
- Move your mouse on the screen to move your character
- Eat food and other players in order to grow your character (food re-spawns every time a player eats it)
- A player's **mass** is the number of food particles eaten
- **Objective**: Try to get fat and eat other players

#### Gameplay Rules
- Players who haven't eaten yet cannot be eaten
- Everytime a player joins the game, **3** food particles will spawn
- Everytime a food particle is eaten by a player, **1** new food particle will respawn
- The more food you eat, the slower you move

---

#### Requirements
To run the game, you'll need: 
- NodeJS with NPM installed
- socket.io 
- Express


#### Downloading the Dependencies
After cloning the source code from Github, you need to run the following command to download all the dependencies (socket.io, express, etc.).

```
npm install
```

#### Running the Server
After downloading all the dependencies, you can run the server with the following command:

```
npm start
```

The game will then be accessible at `http://localhost:3000`.
