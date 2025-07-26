# Phase 2: Game Mechanics

## Objective
Add walls, sand traps, club system, and proper collision mechanics.

## Tasks

### 1. Create Wall class
- [x] Make new file objects/Wall.js
- [x] Extend Phaser.GameObjects.Rectangle
- [x] Set fillColor to #424242 (dark gray)
- [x] Add physics body with setImmovable(true)

### 2. Add wall creation method
- [x] In GameScene, create addWall(x, y, width, height)
- [x] Create physics-enabled rectangle
- [x] Add to walls group
- [x] Return wall object

### 3. Implement ball-wall collision
- [x] Create this.walls physics group
- [x] Add collider between ball and walls
- [x] Set bounce to 0.8 on collision
- [x] Test with one wall

### 4. Create level 1 walls
- [x] Add left wall: x:50, y:300, w:20, h:400
- [x] Add right wall: x:750, y:300, w:20, h:400
- [x] Add top wall: x:400, y:50, w:700, h:20
- [x] Add bottom wall: x:400, y:550, w:700, h:20

### 5. Add angled wall collision
- [ ] Create diagonal wall at 45 degrees
- [ ] Calculate proper bounce angle
- [ ] Use Phaser's built-in physics
- [ ] Test ball bounces correctly

### 6. Create SandTrap class
- [x] Make new file objects/SandTrap.js
- [x] Extend Phaser.GameObjects.Rectangle
- [x] Set fillColor to #F4E4C1 (beige)
- [x] Set alpha to 0.8

### 7. Add sand trap detection
- [x] Create this.sandTraps group
- [x] Check overlap with ball each frame
- [x] Set this.ballInSand boolean
- [x] No physics collision (ball passes over)

### 8. Implement sand trap physics
- [x] When ball enters sand, reduce velocity by 70%
- [x] Set maximum next shot power to 50%
- [x] Add visual indicator (darken ball)
- [x] Reset when ball leaves sand

### 9. Create Club class
- [x] Make new file objects/Club.js
- [x] Properties: name, powerMultiplier, accuracy
- [x] Method: calculateShotPower(basePower)
- [x] Method: addAccuracySpread(angle)

### 10. Implement three clubs
- [x] Driver: power 1.5x, accuracy ±5°
- [x] Iron: power 1.0x, accuracy ±2°
- [x] Putter: power 0.5x, accuracy 0°
- [x] Store in this.clubs array

### 11. Add club selector UI
- [x] Create three buttons on left side
- [x] Style with club names
- [x] Highlight selected club
- [x] Set this.selectedClub

### 12. Apply club mechanics to shot
- [x] Multiply shot power by club multiplier
- [x] Add random accuracy spread to angle
- [x] Update aim line to show spread
- [x] Test all three clubs

### 13. Create PowerMeter class
- [x] Make new file objects/PowerMeter.js
- [x] Draw rectangular meter at bottom
- [x] Fill based on drag distance
- [x] Gradient: green -> yellow -> red

### 14. Integrate power meter
- [x] Show when aiming
- [x] Update fill percentage
- [x] Hide after shot
- [x] Position at x:400, y:550

### 15. Add shot counter
- [x] Track shots taken this level
- [x] Display in top-right corner
- [x] Increment on each shot
- [x] Reset on level restart

### 16. Create proper level boundaries
- [x] Remove default world bounds
- [x] Use only wall colliders
- [x] Ensure ball can't escape
- [x] Test all edges

### 17. Add ball reset function
- [x] Reset to starting position
- [x] Clear velocity
- [x] Reset ballInSand flag
- [x] Clear power meter

### 18. Implement retry button
- [x] Position top-left corner
- [x] Call ball reset function
- [x] Reset shot counter
- [x] Keep walls/traps intact

### 19. Add club visual feedback
- [x] Show club name near ball
- [x] Display power multiplier
- [x] Show accuracy indicator
- [x] Update on club change

### 20. Test complete mechanics
- [x] Verify walls bounce correctly
- [x] Test sand trap slows ball
- [x] Confirm clubs work as designed
- [x] Check retry resets properly