// GameScene class - Main game scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.ball = null;
        this.hole = null;
        this.graphics = null;
        this.isAiming = false;
        this.canShoot = true;
        this.ballTrail = [];
        this.fpsText = null;
        this.powerIndicator = null;
        this.levelComplete = false;
        this.walls = null;
        this.sandTraps = null;
        this.ballInSand = false;
        this.clubs = [];
        this.selectedClub = null;
        this.clubSelector = null;
        this.powerMeter = null;
        this.shotCounter = 0;
        this.shotCounterText = null;
        this.retryButton = null;
        this.backButton = null;
        this.currentLevel = 1;
        this.levelLoader = null;
        this.levelNameText = null;
        this.completedLevels = [];
        this.saveData = null;
        this.levelCompleteOverlay = null;
    }

    preload() {
        // No assets to preload for basic shapes
    }

    create(data) {
        // Load save data
        this.loadSaveData();
        
        // Handle level selection from LevelSelectScene
        if (data && data.selectedLevel) {
            this.currentLevel = data.selectedLevel;
        }
        
        // Add fade-in transition
        this.cameras.main.fadeIn(300, 0, 0, 0);
        
        // Create ball sprite (white circle, radius 10, initial position)
        this.ball = this.add.circle(100, 300, 10, 0xffffff);
        
        // Create hole sprite (black circle, radius 20, initial position)
        this.hole = this.add.circle(700, 300, 20, 0x000000);
        
        // Enable physics on ball
        this.physics.add.existing(this.ball);
        this.ball.body.setDrag(100);
        this.ball.body.setBounce(0.8);
        this.ball.body.setMaxVelocity(500);
        // Remove world bounds collision as we'll use walls instead
        // this.ball.body.setCollideWorldBounds(true);
        
        // Create walls and sand traps groups
        this.walls = this.physics.add.group();
        this.sandTraps = this.add.group();
        
        // Create level loader and load selected level
        this.levelLoader = new LevelLoader(this);
        this.loadLevel(this.currentLevel);
        
        // Create three club types
        this.clubs = [
            new Club('Driver', 1.5, 5),   // High power, low accuracy
            new Club('Iron', 1.0, 2),     // Medium power, medium accuracy  
            new Club('Putter', 0.5, 0)    // Low power, perfect accuracy
        ];
        
        // Create club selector UI
        this.clubSelector = new ClubSelector(this);
        
        // Add clubs to selector
        this.clubs.forEach(club => this.clubSelector.addClub(club));
        
        // Create buttons now that clubs are added
        this.clubSelector.createClubButtons();
        this.selectedClub = this.clubSelector.getSelectedClub();
        
        // Set up club change callback
        this.onClubChanged = (club) => {
            this.selectedClub = club;
        };
        
        // Create power meter
        this.powerMeter = new PowerMeter(this, 400, 550);
        
        // Create level complete overlay
        this.levelCompleteOverlay = new LevelCompleteOverlay(this);
        
        // Create shot counter display (top-right)
        this.shotCounterText = this.add.text(this.scale.width - 20, 20, 'Shots: 0', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(1, 0);
        
        // Create back button (top-left)
        this.backButton = this.add.text(20, 20, '← LEVELS', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#424242',
            padding: { x: 15, y: 8 }
        }).setOrigin(0, 0);
        
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.returnToLevelSelect();
        });
        
        // Add hover effects for back button
        this.backButton.on('pointerover', () => {
            this.backButton.setStyle({ backgroundColor: '#616161' });
        });
        
        this.backButton.on('pointerout', () => {
            this.backButton.setStyle({ backgroundColor: '#424242' });
        });
        
        // Create retry button (next to back button)
        this.retryButton = this.add.text(140, 20, 'RETRY', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#ff4444',
            padding: { x: 15, y: 8 }
        }).setOrigin(0, 0);
        
        this.retryButton.setInteractive();
        this.retryButton.on('pointerdown', () => {
            this.resetBall();
        });
        
        // Add hover effects for retry button
        this.retryButton.on('pointerover', () => {
            this.retryButton.setStyle({ backgroundColor: '#ff6666' });
        });
        
        this.retryButton.on('pointerout', () => {
            this.retryButton.setStyle({ backgroundColor: '#ff4444' });
        });
        
        // Create graphics object for aim line and power indicator
        this.graphics = this.add.graphics();
        
        // Create FPS counter text
        this.fpsText = this.add.text(10, 10, 'FPS: 0', {
            fontSize: '16px',
            fill: '#ffffff'
        });
        
        // Add input event listeners
        this.input.on('pointerdown', this.startAiming, this);
        this.input.on('pointerup', this.shoot, this);
        
        // Add keyboard controls for level switching (testing)
        this.input.keyboard.on('keydown-ONE', () => this.loadLevel(1));
        this.input.keyboard.on('keydown-TWO', () => this.loadLevel(2));
        this.input.keyboard.on('keydown-THREE', () => this.loadLevel(3));
        
        // Add arrow key navigation
        this.input.keyboard.on('keydown-LEFT', () => this.loadPreviousLevel());
        this.input.keyboard.on('keydown-RIGHT', () => this.loadNextLevel());
        
        // Add R key for restart current level
        this.input.keyboard.on('keydown-R', () => this.resetBall());
    }

    update() {
        // Update FPS counter
        const fps = Math.round(this.game.loop.actualFps);
        this.fpsText.setText(`FPS: ${fps}`);
        
        // Clear graphics each frame
        this.graphics.clear();
        
        // Update ball trail
        this.updateBallTrail();
        
        // Draw trail effect
        this.drawBallTrail();
        
        // Check if ball is aiming
        if (this.isAiming && this.canShoot && !this.levelComplete) {
            this.drawAimLine();
            this.updatePowerMeter();
        }
        
        // Check sand trap overlap
        this.checkSandTrapOverlap();
        
        // Check ball stopping detection
        this.checkBallStopped();
        
        // Check win condition
        this.checkWinCondition();
    }

    startAiming(pointer) {
        if (this.canShoot && !this.levelComplete) {
            this.isAiming = true;
            this.aimStartX = pointer.x;
            this.aimStartY = pointer.y;
            this.powerMeter.show();
        }
    }

    shoot(pointer) {
        if (this.isAiming && this.canShoot && !this.levelComplete) {
            this.isAiming = false;
            this.canShoot = false;
            
            // Calculate angle and distance from ball to mouse
            const dx = pointer.x - this.ball.x;
            const dy = pointer.y - this.ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate velocity based on distance (max 400)
            const maxDistance = 200;
            let power = Math.min(distance / maxDistance, 1);
            
            // If ball is in sand, limit max shot power to 50%
            if (this.ballInSand) {
                power = Math.min(power, 0.5);
            }
            
            // Apply club power multiplier
            const basePower = power * 400;
            const clubPower = this.selectedClub ? this.selectedClub.calculateShotPower(basePower) : basePower;
            
            // Calculate angle with club accuracy spread
            let angle = Math.atan2(dy, dx);
            if (this.selectedClub) {
                angle = this.selectedClub.addAccuracySpread(angle);
            }
            this.ball.body.setVelocity(
                Math.cos(angle) * clubPower,
                Math.sin(angle) * clubPower
            );
            
            // Clear trail on new shot
            this.ballTrail = [];
            
            // Hide power meter
            this.powerMeter.hide();
            
            // Increment shot counter
            this.incrementShots();
        }
    }

    drawAimLine() {
        if (this.input.mousePointer) {
            // Draw white line from ball to mouse position
            this.graphics.lineStyle(2, 0xffffff, 0.8);
            this.graphics.beginPath();
            this.graphics.moveTo(this.ball.x, this.ball.y);
            this.graphics.lineTo(this.input.mousePointer.x, this.input.mousePointer.y);
            this.graphics.strokePath();
        }
    }

    updatePowerMeter() {
        if (this.input.mousePointer) {
            const dx = this.input.mousePointer.x - this.ball.x;
            const dy = this.input.mousePointer.y - this.ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            let power = Math.min(distance / maxDistance, 1);
            
            // If ball is in sand, show limited power
            if (this.ballInSand) {
                power = Math.min(power, 0.5);
            }
            
            this.powerMeter.update(power);
        }
    }

    updateBallTrail() {
        // Add current ball position to trail array
        this.ballTrail.push({
            x: this.ball.x,
            y: this.ball.y
        });
        
        // Keep only last 10 positions
        if (this.ballTrail.length > 10) {
            this.ballTrail.shift();
        }
    }

    drawBallTrail() {
        // Draw fading white circles for trail
        for (let i = 0; i < this.ballTrail.length; i++) {
            const position = this.ballTrail[i];
            const alpha = (i + 1) / this.ballTrail.length * 0.5;
            const size = (i + 1) / this.ballTrail.length * 8;
            
            this.graphics.fillStyle(0xffffff);
            this.graphics.fillCircle(position.x, position.y, size);
            this.graphics.fillStyle(0xffffff, alpha);
        }
    }

    checkBallStopped() {
        if (!this.canShoot && this.ball.body) {
            const velocity = Math.sqrt(
                this.ball.body.velocity.x * this.ball.body.velocity.x +
                this.ball.body.velocity.y * this.ball.body.velocity.y
            );
            
            // If velocity is less than 5, stop the ball
            if (velocity < 5) {
                this.ball.body.setVelocity(0, 0);
                this.canShoot = true;
            }
        }
    }

    checkWinCondition() {
        if (!this.levelComplete) {
            // Check distance between ball and hole
            const dx = this.ball.x - this.hole.x;
            const dy = this.ball.y - this.hole.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If distance < 15 pixels, level complete
            if (distance < 15) {
                this.levelComplete = true;
                this.ball.body.setVelocity(0, 0);
                
                // Track level completion
                this.completeLevel();
                
                const currentLevelData = this.levelLoader.getCurrentLevel();
                const levelName = currentLevelData ? currentLevelData.levelName : `Level ${this.currentLevel}`;
                
                console.log(`${levelName} Complete!`);
                
                // Get level data for overlay
                const par = currentLevelData ? currentLevelData.par : 0;
                
                // Check if this is the last level
                this.levelLoader.getMaxLevels().then(maxLevels => {
                    const isLastLevel = this.currentLevel >= maxLevels;
                    
                    // Show level complete overlay
                    this.levelCompleteOverlay.show(
                        this.shotCounter, 
                        par, 
                        this.currentLevel, 
                        isLastLevel
                    );
                });
            }
        }
    }

    checkSandTrapOverlap() {
        let inSand = false;
        
        // Check if ball overlaps with any sand trap
        this.sandTraps.children.entries.forEach(sandTrap => {
            if (sandTrap.contains && sandTrap.contains(this.ball.x, this.ball.y)) {
                inSand = true;
                
                // Apply sand physics effects
                if (!this.ballInSand) {
                    // Ball just entered sand - reduce velocity by 70%
                    this.ball.body.velocity.x *= 0.3;
                    this.ball.body.velocity.y *= 0.3;
                }
            }
        });
        
        // Update sand state and visual feedback
        if (inSand && !this.ballInSand) {
            this.ballInSand = true;
            // Darken the ball when in sand
            this.ball.setFillStyle(0x888888);
        } else if (!inSand && this.ballInSand) {
            this.ballInSand = false;
            // Reset ball color when leaving sand
            this.ball.setFillStyle(0xffffff);
        }
    }

    addWall(x, y, width, height) {
        // Create physics-enabled rectangle wall
        const wall = this.add.rectangle(x, y, width, height, 0x424242);
        this.physics.add.existing(wall);
        wall.body.setImmovable(true);
        
        // Add to walls group
        this.walls.add(wall);
        
        return wall;
    }

    incrementShots() {
        this.shotCounter++;
        this.shotCounterText.setText(`Shots: ${this.shotCounter}`);
    }
    
    resetBall() {
        // Reset ball to level start position
        const currentLevelData = this.levelLoader.getCurrentLevel();
        if (currentLevelData) {
            this.ball.x = currentLevelData.ballStart.x;
            this.ball.y = currentLevelData.ballStart.y;
        } else {
            this.ball.x = 100;
            this.ball.y = 300;
        }
        this.ball.body.setVelocity(0, 0);
        
        // Reset game state
        this.canShoot = true;
        this.ballTrail = [];
        this.ballInSand = false;
        this.ball.setFillStyle(0xffffff);
        this.shotCounter = 0;
        this.shotCounterText.setText(`Shots: ${this.shotCounter}`);
        
        // Hide power meter
        this.powerMeter.hide();
    }
    
    resetLevel() {
        // Reset ball to level start position
        const currentLevelData = this.levelLoader.getCurrentLevel();
        if (currentLevelData) {
            this.ball.x = currentLevelData.ballStart.x;
            this.ball.y = currentLevelData.ballStart.y;
        } else {
            this.ball.x = 100;
            this.ball.y = 300;
        }
        this.ball.body.setVelocity(0, 0);
        
        // Reset game state
        this.levelComplete = false;
        this.canShoot = true;
        this.ballTrail = [];
        this.ballInSand = false;
        this.ball.setFillStyle(0xffffff);
        this.shotCounter = 0;
        this.shotCounterText.setText(`Shots: ${this.shotCounter}`);
        
        // Hide power meter
        this.powerMeter.hide();
        
        // Hide level complete overlay if visible
        if (this.levelCompleteOverlay && this.levelCompleteOverlay.getIsVisible()) {
            this.levelCompleteOverlay.hide();
        }
    }
    
    /**
     * Load a specific level
     * @param {number} levelNumber - The level number to load
     */
    async loadLevel(levelNumber) {
        try {
            this.currentLevel = levelNumber;
            const success = await this.levelLoader.loadLevel(levelNumber);
            
            if (success) {
                // Reset game state for new level
                this.levelComplete = false;
                this.canShoot = true;
                this.ballTrail = [];
                this.ballInSand = false;
                this.ball.setFillStyle(0xffffff);
                this.shotCounter = 0;
                this.shotCounterText.setText(`Shots: ${this.shotCounter}`);
                this.powerMeter.hide();
                
                // Hide level complete overlay if visible
                if (this.levelCompleteOverlay && this.levelCompleteOverlay.getIsVisible()) {
                    this.levelCompleteOverlay.hide();
                }
                
                console.log(`Successfully loaded level ${levelNumber}`);
            } else {
                console.error(`Failed to load level ${levelNumber}`);
            }
        } catch (error) {
            console.error(`Error loading level ${levelNumber}:`, error);
        }
    }
    
    /**
     * Complete current level and track progress using SaveManager
     */
    completeLevel() {
        if (!this.completedLevels.includes(this.currentLevel)) {
            this.completedLevels.push(this.currentLevel);
            
            // Use SaveManager to complete level and save progress
            const success = SaveManager.completeLevel(this.currentLevel, this.shotCounter);
            
            if (success) {
                console.log(`Level ${this.currentLevel} completed! Total completed: ${this.completedLevels.length}`);
                console.log(`Shots taken: ${this.shotCounter}`);
            } else {
                console.error('Failed to save level completion');
            }
        }
    }
    
    /**
     * Load save data from SaveManager
     */
    loadSaveData() {
        try {
            this.saveData = SaveManager.loadProgress();
            this.completedLevels = this.saveData.completedLevels || [];
            console.log('Save data loaded:', this.saveData);
        } catch (error) {
            console.error('Error loading save data:', error);
            this.saveData = SaveManager.getDefaultSaveData();
            this.completedLevels = [];
        }
    }
    
    /**
     * Get completion statistics
     * @returns {Object} - Completion stats
     */
    getCompletionStats() {
        return {
            completedLevels: [...this.completedLevels],
            totalCompleted: this.completedLevels.length,
            currentLevel: this.currentLevel,
            isLevelCompleted: (levelNumber) => this.completedLevels.includes(levelNumber)
        };
    }
    
    /**
     * Load next level if available
     */
    async loadNextLevel() {
        const maxLevels = await this.levelLoader.getMaxLevels();
        if (this.currentLevel < maxLevels) {
            this.loadLevel(this.currentLevel + 1);
        } else {
            console.log('All levels completed!');
        }
    }
    
    /**
     * Load previous level if available
     */
    loadPreviousLevel() {
        if (this.currentLevel > 1) {
            this.loadLevel(this.currentLevel - 1);
        }
    }
    
    /**
     * Return to level select scene with transition
     */
    returnToLevelSelect() {
        // Hide overlay and cleanup before transition
        if (this.levelCompleteOverlay && this.levelCompleteOverlay.getIsVisible()) {
            this.levelCompleteOverlay.hide();
        }
        
        this.cameras.main.fadeOut(300, 0, 0, 0);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('LevelSelectScene');
        });
    }
}

// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#4CAF50', // Grass green
    parent: 'game-canvas',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, LevelSelectScene, GameScene]
};

// Initialize the game
const game = new Phaser.Game(config);