# Phase 2: Game Mechanics Implementation Plan

## Overview
Implement core game mechanics including walls, sand traps, club system, and proper collision physics for the Mini Golf Master game.

## Task Breakdown

### Agent 1: Wall System Implementation
**Files to create/modify:**
- `objects/Wall.js` - Wall class
- `scenes/GameScene.js` - Wall integration

**Responsibilities:**
1. Create Wall class extending Phaser.GameObjects.Rectangle
2. Implement addWall method in GameScene
3. Set up walls physics group
4. Create level 1 boundary walls
5. Implement angled wall support
6. Test ball-wall collisions with 0.8 bounce

**Interfaces:**
- `Wall` constructor: `(scene, x, y, width, height)`
- `GameScene.addWall`: `(x, y, width, height) => Wall`
- `this.walls` - Phaser physics group

### Agent 2: Sand Trap Implementation
**Files to create/modify:**
- `objects/SandTrap.js` - SandTrap class
- `scenes/GameScene.js` - Sand trap integration

**Responsibilities:**
1. Create SandTrap class extending Phaser.GameObjects.Rectangle
2. Implement sand trap detection system
3. Add velocity reduction (70%) when in sand
4. Limit max shot power to 50% in sand
5. Add visual feedback (darken ball)

**Interfaces:**
- `SandTrap` constructor: `(scene, x, y, width, height)`
- `this.sandTraps` - Phaser group (no physics)
- `this.ballInSand` - boolean flag
- `GameScene.checkSandTrapOverlap()` - detection method

### Agent 3: Club System Implementation
**Files to create/modify:**
- `objects/Club.js` - Club class
- `scenes/GameScene.js` - Club integration
- `ui/ClubSelector.js` - Club UI

**Responsibilities:**
1. Create Club class with power/accuracy properties
2. Implement three club types (Driver, Iron, Putter)
3. Create club selector UI on left side
4. Apply club mechanics to shots
5. Add accuracy spread visualization

**Interfaces:**
- `Club` properties: `{name, powerMultiplier, accuracy}`
- `Club.calculateShotPower(basePower)`
- `Club.addAccuracySpread(angle)`
- `this.clubs` - array of clubs
- `this.selectedClub` - current club

### Agent 4: Power Meter Implementation
**Files to create/modify:**
- `objects/PowerMeter.js` - PowerMeter class
- `scenes/GameScene.js` - Power meter integration

**Responsibilities:**
1. Create PowerMeter class with gradient display
2. Position at bottom center (400, 550)
3. Update based on drag distance
4. Show/hide during aiming
5. Color gradient: green → yellow → red

**Interfaces:**
- `PowerMeter` constructor: `(scene, x, y)`
- `PowerMeter.update(percentage)`
- `PowerMeter.show()` / `PowerMeter.hide()`

### Agent 5: Game Controls Implementation
**Files to modify:**
- `scenes/GameScene.js` - Control integration

**Responsibilities:**
1. Add shot counter display (top-right)
2. Implement retry button (top-left)
3. Create ball reset function
4. Add club visual feedback near ball
5. Remove default world bounds

**Interfaces:**
- `this.shotCounter` - number
- `GameScene.resetBall()`
- `GameScene.incrementShots()`
- Shot counter text object
- Retry button object

### Testing Agents (1-3)
**Test Coverage:**
1. Wall collision physics and angles
2. Sand trap detection and effects
3. Club switching and mechanics
4. Power meter accuracy
5. UI responsiveness
6. Game state management

## Communication Protocol
All agents will update `/home/geoff/dev/josh-website/tasks/comms/2/INTER-AGENT-COMMS.md` with:
- Current task status
- Files being modified
- Dependencies on other agents
- Blockers or issues
- Completion checklist

## Dependencies
- Agent 2 depends on Agent 1 (physics system)
- Agent 4 depends on Agent 3 (club power calculations)
- Agent 5 depends on Agents 1-4 (integration)

## Success Criteria
1. All 20 tasks from PHASE-02.md completed
2. Physics working correctly
3. UI responsive and intuitive
4. No console errors
5. Smooth gameplay experience