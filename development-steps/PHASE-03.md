# Phase 3: Level System

## Objective
Build the level loading system, level progression, and session-based progress saving.

## Tasks

### 1. Create level data structure
- [ ] Define level JSON format
- [ ] Include: ballStart {x, y}
- [ ] Include: hole {x, y}
- [ ] Include: walls array [{x, y, width, height}]
- [ ] Include: sandTraps array [{x, y, width, height}]

### 2. Create levelData.js file
- [ ] Make new file levels/levelData.js
- [ ] Export levels array
- [ ] Add level 1 with basic layout
- [ ] Add levelName property
- [ ] Add par property (display only)

### 3. Create LevelLoader class
- [ ] Make new file objects/LevelLoader.js
- [ ] Method: loadLevel(levelNumber)
- [ ] Clear existing walls/traps
- [ ] Place ball at start position
- [ ] Create walls from data

### 4. Integrate level loader in GameScene
- [ ] Store currentLevel number
- [ ] Call levelLoader.loadLevel(1) in create()
- [ ] Test level 1 loads correctly
- [ ] Verify ball starts at correct position

### 5. Add level completion tracking
- [ ] Create completedLevels array
- [ ] Mark level complete on win
- [ ] Show "Next Level" button
- [ ] Load next level on click

### 6. Create MenuScene
- [ ] Make new file scenes/MenuScene.js
- [ ] Add game title text
- [ ] Add "Play" button
- [ ] Transition to LevelSelectScene
- [ ] Style with game colors

### 7. Create LevelSelectScene
- [ ] Make new file scenes/LevelSelectScene.js
- [ ] Display 14 level buttons in grid
- [ ] Show level numbers
- [ ] Gray out locked levels
- [ ] Green checkmark for completed

### 8. Implement level unlocking
- [ ] Only level 1 unlocked initially
- [ ] Unlock next level on completion
- [ ] Update button states
- [ ] Prevent clicking locked levels

### 9. Add scene transitions
- [ ] From Menu to LevelSelect
- [ ] From LevelSelect to Game
- [ ] From Game win to LevelSelect
- [ ] Add fade transitions

### 10. Create localStorage manager
- [ ] Save completedLevels array
- [ ] Save currentLevel number
- [ ] Load on game start
- [ ] Clear data function

### 11. Add level 2 data
- [ ] Simple L-shaped layout
- [ ] One sand trap
- [ ] Test progression from level 1

### 12. Add level 3 data
- [ ] Introduce angled walls
- [ ] Multiple sand traps
- [ ] Longer distance to hole

### 13. Create level complete overlay
- [ ] Semi-transparent background
- [ ] "Level Complete!" text
- [ ] Show shots taken
- [ ] Buttons: Next Level, Level Select

### 14. Add level name display
- [ ] Show at top center
- [ ] Format: "Level X: Name"
- [ ] Update on level load
- [ ] Fade in animation

### 15. Implement quick restart
- [ ] R key to restart level
- [ ] Confirmation not needed
- [ ] Reset shot counter
- [ ] Keep same level

### 16. Add back button in GameScene
- [ ] Position top-left
- [ ] Return to LevelSelect
- [ ] Save progress before leaving
- [ ] Confirm if mid-game

### 17. Create level preview
- [ ] Show mini layout in LevelSelect
- [ ] Display par for each level
- [ ] Show best score if completed
- [ ] Update after completion

### 18. Add progressive difficulty
- [ ] Levels 1-3: Basic mechanics
- [ ] Levels 4-7: Complex walls
- [ ] Levels 8-11: Sand trap mastery
- [ ] Levels 12-14: All mechanics

### 19. Test save system
- [ ] Complete level 1
- [ ] Refresh browser
- [ ] Verify level 2 unlocked
- [ ] Check level 1 shows completed

### 20. Polish scene flow
- [ ] All transitions smooth
- [ ] No scene loading delays
- [ ] Proper cleanup between scenes
- [ ] Test full game loop