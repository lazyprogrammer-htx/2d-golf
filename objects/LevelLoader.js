// LevelLoader class - Handles loading and managing game levels
class LevelLoader {
    constructor(scene) {
        this.scene = scene;
        this.currentLevel = null;
        this.loadedWalls = [];
        this.loadedSandTraps = [];
    }
    
    /**
     * Load a specific level by number
     * @param {number} levelNumber - The level number to load (1-based)
     * @returns {boolean} - True if level loaded successfully, false otherwise
     */
    async loadLevel(levelNumber) {
        try {
            // Import level data dynamically
            const { getLevel, validateLevel } = await import('../levels/levelData.js');
            
            // Get level data
            const levelData = getLevel(levelNumber);
            if (!levelData) {
                console.error(`Level ${levelNumber} not found`);
                return false;
            }
            
            // Validate level data
            if (!validateLevel(levelData)) {
                console.error(`Level ${levelNumber} failed validation`);
                return false;
            }
            
            // Clear any existing level
            this.clearLevel();
            
            // Store current level reference
            this.currentLevel = levelData;
            
            // Position ball at start position
            this.scene.ball.x = levelData.ballStart.x;
            this.scene.ball.y = levelData.ballStart.y;
            this.scene.ball.body.setVelocity(0, 0);
            
            // Position hole
            this.scene.hole.x = levelData.hole.x;
            this.scene.hole.y = levelData.hole.y;
            
            // Create walls from level data
            this.createWalls(levelData.walls);
            
            // Create sand traps from level data
            this.createSandTraps(levelData.sandTraps);
            
            // Update level display if it exists
            this.updateLevelDisplay();
            
            console.log(`Level ${levelNumber} loaded: ${levelData.levelName}`);
            return true;
            
        } catch (error) {
            console.error(`Error loading level ${levelNumber}:`, error);
            return false;
        }
    }
    
    /**
     * Clear all level elements (walls, sand traps, etc.)
     */
    clearLevel() {
        // Clear walls
        if (this.scene.walls) {
            this.scene.walls.clear(true, true);
        }
        
        // Clear sand traps
        if (this.scene.sandTraps) {
            this.scene.sandTraps.clear(true, true);
        }
        
        // Reset arrays
        this.loadedWalls = [];
        this.loadedSandTraps = [];
        
        console.log('Level cleared');
    }
    
    /**
     * Create walls from level data
     * @param {Array} wallsData - Array of wall objects with x, y, width, height
     */
    createWalls(wallsData) {
        if (!this.scene.walls) {
            this.scene.walls = this.scene.physics.add.group();
        }
        
        wallsData.forEach(wallData => {
            const wall = this.scene.add.rectangle(
                wallData.x, 
                wallData.y, 
                wallData.width, 
                wallData.height, 
                0x424242
            );
            
            this.scene.physics.add.existing(wall);
            wall.body.setImmovable(true);
            
            this.scene.walls.add(wall);
            this.loadedWalls.push(wall);
        });
        
        // Add collision with ball if it exists
        if (this.scene.ball) {
            this.scene.physics.add.collider(this.scene.ball, this.scene.walls);
        }
    }
    
    /**
     * Create sand traps from level data
     * @param {Array} sandTrapsData - Array of sand trap objects with x, y, width, height
     */
    createSandTraps(sandTrapsData) {
        if (!this.scene.sandTraps) {
            this.scene.sandTraps = this.scene.add.group();
        }
        
        sandTrapsData.forEach(sandTrapData => {
            // Import SandTrap class and create instance
            const sandTrap = new SandTrap(
                this.scene,
                sandTrapData.x,
                sandTrapData.y,
                sandTrapData.width,
                sandTrapData.height
            );
            
            this.scene.sandTraps.add(sandTrap);
            this.loadedSandTraps.push(sandTrap);
        });
    }
    
    /**
     * Update level display elements (level name, par, etc.)
     */
    updateLevelDisplay() {
        if (!this.currentLevel) return;
        
        const levelText = `${this.currentLevel.levelName} (Par ${this.currentLevel.par})`;
        
        // If text already exists, update with fade animation
        if (this.scene.levelNameText) {
            // Fade out current text
            this.scene.tweens.add({
                targets: this.scene.levelNameText,
                alpha: 0,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                    // Update text and fade back in
                    this.scene.levelNameText.setText(levelText);
                    this.scene.tweens.add({
                        targets: this.scene.levelNameText,
                        alpha: 1,
                        duration: 200,
                        ease: 'Power2'
                    });
                }
            });
        } else {
            // Create new level name text at top center
            this.scene.levelNameText = this.scene.add.text(
                this.scene.scale.width / 2, 
                30, 
                levelText, 
                {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: { x: 20, y: 10 },
                    fontWeight: 'bold',
                    stroke: '#000000',
                    strokeThickness: 2
                }
            ).setOrigin(0.5, 0);

            // Start with fade-in animation
            this.scene.levelNameText.setAlpha(0);
            this.scene.tweens.add({
                targets: this.scene.levelNameText,
                alpha: 1,
                duration: 400,
                ease: 'Power2'
            });
        }
    }
    
    /**
     * Get current loaded level data
     * @returns {Object|null} - Current level data or null if no level loaded
     */
    getCurrentLevel() {
        return this.currentLevel;
    }
    
    /**
     * Get maximum number of levels available
     * @returns {number} - Total number of levels
     */
    async getMaxLevels() {
        try {
            const { getLevelCount } = await import('../levels/levelData.js');
            return getLevelCount();
        } catch (error) {
            console.error('Error getting level count:', error);
            return 0;
        }
    }
    
    /**
     * Check if a level number is valid
     * @param {number} levelNumber - Level number to check
     * @returns {boolean} - True if valid level number
     */
    async isValidLevel(levelNumber) {
        const maxLevels = await this.getMaxLevels();
        return levelNumber >= 1 && levelNumber <= maxLevels;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelLoader;
}