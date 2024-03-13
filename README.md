# Colorbot

Welcome to my Gamebotting repository, the perfect starting point for your botting endeavors.

This repository is packed with essential tools to empower your projects. We harness the capabilities of [RobotJS](https://robotjs.io/) for mouse movements and screenshot capture, ensuring you can automate interactions seamlessly within your game environment. For control and accessibility, we integrate [node-global-key-listener](https://www.npmjs.com/package/node-global-key-listener), allowing you to initiate your bot with just a press of the F1 key. Additionally, we employ [node-notifier](https://www.npmjs.com/package/node-notifier) for real-time visual feedback when your bot activates or takes a break. Moreover, we include [clipboardy](https://www.npmjs.com/package/clipboardy) in our toolkit to facilitate easy saving of current mouse position coordinates or color to your clipboard, eliminating the need for manual screenshots for in-game button or color identification.

Say goodbye to the hassle of generating screenshots to obtain in-game coordinates or colors. With a simple press of <kbd>F3</kbd>, you can instantly capture the current mouse position, and <kbd>F4</kbd> lets you grab the hex color of your cursor's current location.

For an in-depth look at how to leverage these tools to break the game "Kick ja chup" and elevate your botting skills, check out my blog post: [How to Master the Art of Gamebotting](https://medium.com/@nickkrueger/hello-world-fb48121fcd56) 

## Features and Key Bindings
To utilize the features of this toolkit, simply initiate it with:


```npm run start```

Here's a breakdown of what you can do with simple key presses:

<kbd>F1</kbd>: Launch your bot. This starts the automation process.

<kbd>F2</kbd>: Halt your bot. Use this to stop all current operations.

<kbd>F3</kbd>: Capture and copy the current mouse position's coordinates. These are both displayed in the console and saved to your clipboard for easy access.

<kbd>F4</kbd>: Obtain the Hex Color Code of the precise pixel under your mouse pointer. This information is logged to the console and copied to your clipboard as well.

To keep you in the loop with your bot's activities, you'll receive OS notifications for every significant action.
This toolkit also includes helper functions designed to speed up the creation of game bots.

## Getting Started with Your Game Bot
To access all the features listed above, begin with installing the dependencies:

```npm i```

Then, kick off the toolkit:

```npm run start```

### Crafting a New Game Bot
Follow these steps to create a new game bot:

1. Copy the "template" folder found within the "games" directory and rename it according to your preference.
2. Navigate to the index.js file at the root of the project and switch the import from the template's mainLoop to that of your new folder.
3. Thanks to nodemon, there's no need to restart the project each time you make a change. You can dive straight into coding your bot's logic.

## Functions

### colorInSpot

if you want to check if on a specific pixel on the screen a given color is present you can use this function. 


*Input*
1. coordinates with <kbd>F3</kbd>: {x: 976, y: 595}
2. hex string without # with <kbd>F4</kbd>: "824d2b"
3. if you dont want that the function creates a screenshot by its own and want to save processing power you can pass in a screenshot: See Example 2

Example 1:
``` 
import colorInSpot from "../../utils/bot/colorInSpot.js"

if(colorInSpot({x: 976, y: 595}, "824d2b")) {
    // do stuff
}
```

Example 2 with passing in a screenshot:
``` 
import colorInSpot from "../../utils/bot/colorInSpot.js"

let screenShot = robot.screen.capture(0,0,screenSize.width, screenSize.height)

if(colorInSpot({x: 976, y: 595}, "824d2b", screenShot)) {
    // do stuff
}
```

### colorInArea

if you want to check if a hexCode is present in an area

*Input*
1. coordinate top left of the area: {x: 638, y: 711}
2. coordinate bottom right of the area: {x: 1111, y: 900}
2. hex string without #: "824d2b"

Example 1:
``` 
import colorInArea from "../../utils/bot/colorInArea.js"

let colorIsInArea = colorInArea({x: 638, y: 711}, {x: 1111, y: 900}, "be4a39")

if(colorIsInArea) {
    // do stuff
}
```

### bufferSnapshotToBase64

if you want to just save an area as base64String to may compare it with another base64 of the same area after some time

*Input*
1. coordinate top left of the area: {x: 638, y: 711}
2. coordinate bottom right of the area: {x: 1111, y: 900}

Example 1:
``` 
import bufferSnapshotToBase64 from "../../utils/bot/bufferSnapshot.js"

const scoreAreaTopLeft = {x: 715, y: 289}
const scoreAreaBottomRight ={x: 809, y: 330}

const bufferBeforeHit = await bufferSnapshotToBase64(scoreAreaTopLeft, scoreAreaBottomRight);

// do stuff

const bufferAfterHit = await bufferSnapshotToBase64(scoreAreaTopLeft, scoreAreaBottomRight);

if (bufferBeforeHit !== bufferAfterHit) {
    // stuff happened and changed something on the screen
} 
    
```

### RobotJS Basics

this is just a small example to get you started, see more Examples here
[https://robotjs.io/docs/examples](https://robotjs.io/docs/examples)

```
import robot from "robotjs"

// move and click mouse
robot.moveMouse(841, 662);
robot.mouseClick("left");

// take a screenshot
let screenShot = robot.screen.capture(0,0,screenSize.width, screenSize.height)

```

