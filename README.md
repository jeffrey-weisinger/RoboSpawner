# RoboSpawner

RoboSpawner is a 3D webgame developed by Jeffrey Weisinger during the summer of 2022.

I made a webgame this summer involving Robots, Webpack, and THREE.js. Play the demo today!

## About:

**Motivation:**
RoboSpawner was inspired by 2D .io games from my childhood that I played late at night with my friends. I liked the idea of having a game so accessible on the web, and I wanted to recreate something similar. In this project, I took things a level further and made my game in 3D!
    
Tools used, How you made it (I'm going to be using a Q and A format)
  
**How do you communicate between the server and the client?**
    
Robospawner has its foundation in speedy socket.io requests being sent from server to client. No HTTP Requests, Ajax, or Postman required! Without this, the game would be laggy and unplayable. 
    
**What tools did you use in development?**
    
I used nodemon and live-server to quickly restart my server! This is really easy to implement, and speeds up the development process considerably.
I used Webpack to make dependencies and debugging easier to manage in "development" mode, and I can play a faster, compressed game in "production" mode.
I used JQuery for querying my HTML page. This definitely made my code a lot easier to read!

**How did you make your models?**

I made my animated models in Blender. I rigged them using lots of bone armatures, then I made any necessary animations. From there, I exported them into gltf files, and used them with the Three.js GLTFReader.

**How do you display all the models in the browser?**
  
Three.js. Lots of it. I take the updates coming back every 1/30th of a second from the browser and I linearly interpolate them to make more in-between updates. From there, I pass the information to the AnimationMixer for each model, and then display everything in the browser using the Three.js renderer. 
	
**How do you detect projectile collisions?**
	
 I used a spatial hashmap, (inspired by SimonDev on YouTube) so I don't need to check every object on the server for a possible collision, every 1/30th of a second. Subdividing the X-Y plane into small squares, I only need to check the collisions that could be happening within the square that the projectile is located in. I use a similar logic for deciding what the player can see, and for when robots can "see" the player. This took some time to set up, but saved me a lot of unnecessary computations.

**Who worked on this project?**
Just me! (Jeffrey Weisinger) 

Don't want to read the above? Watch my video below:


## Video
--Video Goes Here--
--Maybe some cool Screenshots--

## Demo:
Make sure that you have the **most recent** versions of npm and node.js on your computer before installing this demo.  
Navigate to the directory where you'd like to install RoboSpawner. Then, in the terminal, type:

    git clone https://github.com/jeffrey-weisinger/RoboSpawner.git
  
Then, install all the dependencies by typing 

    npm install
  
After all packages are installed, run the demo by typing

    npm start
  
and open localhost:4000 in the browser of your choice (Google Chrome may work best). Finally, click "Singleplayer Demo." Enjoy!


## How to Play (Demo):
Survive an enemy invasion by building a robot army to defend yourself!

You spawn with 100 **gears**. Buy robots from the store using **gears**, and then drag them from your robots inventory onto the battlefield to deploy them. 

Both **chips** and **gears** can be found laying on the ground. Click to pick them up.

Drag **chips** from your **chips** inventory onto robot profiles to power up your army (currently, the **chips** themselves have no effect).

Different robots have different strengths and weaknesses. You can only deploy 5 of them at once, so choose wisely.

You lose when your health hits 0. Beat all 8 levels to win the game!

## Future Updates (TODO)
- Chips will boost the stats of individual robots, giving your army a better chance against the enemy invasion.
- I'm adding a "special ability" for each robot
- A wider variety of challenging enemies

## Sources Cited:
SimonDev Spatial Hashmap: https://www.youtube.com/watch?v=sx4IIQL0x7c&t=676s




