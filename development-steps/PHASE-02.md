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
- [ ] Make new file objects/Club.js
- [ ] Properties: name, powerMultiplier, accuracy
- [ ] Method: calculateShotPower(basePower)
- [ ] Method: addAccuracySpread(angle)

### 10. Implement three clubs
- [ ] Driver: power 1.5x, accuracy ±5°
- [ ] Iron: power 1.0x, accuracy ±2°
- [ ] Putter: power 0.5x, accuracy 0°
- [ ] Store in this.clubs array

### 11. Add club selector UI
- [ ] Create three buttons on left side
- [ ] Style with club names
- [ ] Highlight selected club
- [ ] Set this.selectedClub

### 12. Apply club mechanics to shot
- [ ] Multiply shot power by club multiplier
- [ ] Add random accuracy spread to angle
- [ ] Update aim line to show spread
- [ ] Test all three clubs

### 13. Create PowerMeter class
- [ ] Make new file objects/PowerMeter.js
- [ ] Draw rectangular meter at bottom
- [ ] Fill based on drag distance
- [ ] Gradient: green -> yellow -> red

### 14. Integrate power meter
- [ ] Show when aiming
- [ ] Update fill percentage
- [ ] Hide after shot
- [ ] Position at x:400, y:550

### 15. Add shot counter
- [ ] Track shots taken this level
- [ ] Display in top-right corner
- [ ] Increment on each shot
- [ ] Reset on level restart

### 16. Create proper level boundaries
- [x] Remove default world bounds
- [x] Use only wall colliders
- [x] Ensure ball can't escape
- [x] Test all edges

### 17. Add ball reset function
- [ ] Reset to starting position
- [ ] Clear velocity
- [ ] Reset ballInSand flag
- [ ] Clear power meter

### 18. Implement retry button
- [ ] Position top-left corner
- [ ] Call ball reset function
- [ ] Reset shot counter
- [ ] Keep walls/traps intact

### 19. Add club visual feedback
- [ ] Show club name near ball
- [ ] Display power multiplier
- [ ] Show accuracy indicator
- [ ] Update on club change

### 20. Test complete mechanics
- [ ] Verify walls bounce correctly
- [ ] Test sand trap slows ball
- [ ] Confirm clubs work as designed
- [ ] Check retry resets properly