# Phase 1: Core Foundation

## Objective
Set up the basic game structure with Phaser 3 and implement fundamental ball mechanics.

## Tasks

### 1. Initialize Phaser 3 project
- [x] Create index.html with canvas element
- [x] Add Phaser 3 CDN link to index.html
- [x] Create basic CSS file with black background
- [x] Set canvas size to 800x600 pixels

### 2. Create main.js with Phaser config
- [x] Define Phaser.Game configuration object
- [x] Set type to Phaser.AUTO
- [x] Set width: 800, height: 600
- [x] Set backgroundColor to #4CAF50 (grass green)

### 3. Create GameScene class
- [x] Extend Phaser.Scene
- [x] Add constructor with key 'GameScene'
- [x] Implement empty preload(), create(), update() methods
- [x] Add scene to game config

### 4. Add ball sprite
- [x] Create white circle in create() method
- [x] Position at x: 100, y: 300
- [x] Set radius: 10 pixels
- [x] Store as this.ball

### 5. Add hole sprite
- [x] Create black circle in create() method
- [x] Position at x: 700, y: 300
- [x] Set radius: 20 pixels
- [x] Store as this.hole

### 6. Implement basic ball physics
- [x] Enable physics on ball sprite
- [x] Set ball.body.setDrag(100)
- [x] Set ball.body.setBounce(0.8)
- [x] Set ball.body.setMaxVelocity(500)

### 7. Create aim line visual
- [x] Add graphics object in create()
- [x] Draw white line from ball to mouse position
- [x] Update line in update() method
- [x] Only show when mouse is pressed

### 8. Implement click-to-shoot
- [x] Add pointerdown event listener
- [x] Calculate angle from ball to mouse
- [x] On pointerup, apply velocity to ball
- [x] Velocity based on distance (max 400)

### 9. Add ball collision with world bounds
- [x] Set ball.body.setCollideWorldBounds(true)
- [x] Enable bounce off edges
- [x] Test ball stays within canvas

### 10. Create basic win condition
- [x] Check distance between ball and hole
- [x] If distance < 15 pixels, show "Level Complete!"
- [x] Use console.log for now
- [x] Stop ball movement on win

### 11. Add ball trail effect
- [x] Create array to store last 10 ball positions
- [x] Update array each frame
- [x] Draw fading white circles for trail
- [x] Clear trail on new shot

### 12. Implement ball stopping detection
- [x] Check if ball velocity < 5
- [x] Set ball velocity to 0 when stopped
- [x] Allow new shot only when ball stopped

### 13. Create simple power indicator
- [x] Draw rectangle showing drag distance
- [x] Color: green to red gradient
- [x] Position below ball when aiming
- [x] Hide after shot

### 14. Add FPS counter
- [x] Display in top-left corner
- [x] Update every frame
- [x] Use Phaser's built-in game.loop.actualFps

### 15. Test complete flow
- [x] Verify ball shoots correctly
- [x] Confirm ball stops naturally
- [x] Test win condition triggers
- [x] Ensure can shoot again after ball stops