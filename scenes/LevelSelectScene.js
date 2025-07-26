// LevelSelectScene class - Level selection screen
class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
        this.levelButtons = [];
        this.completedLevels = [];
        this.totalLevels = 14; // Based on PRD requirement
    }

    preload() {
        // No assets to preload for basic shapes and text
    }

    create() {
        // Create background with game green
        this.cameras.main.setBackgroundColor('#4CAF50');
        
        // Fade in effect
        this.cameras.main.fadeIn(300, 0, 0, 0);
        
        // Add title
        this.add.text(this.scale.width / 2, 50, 'Select Level', {
            fontSize: '48px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Add back button to return to menu
        const backButton = this.add.text(50, 50, '← MENU', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#424242',
            padding: { x: 15, y: 8 },
            stroke: '#000000',
            strokeThickness: 1
        }).setOrigin(0, 0.5);
        
        backButton.setInteractive();
        backButton.on('pointerover', () => {
            backButton.setStyle({ backgroundColor: '#616161' });
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ backgroundColor: '#424242' });
        });
        backButton.on('pointerdown', () => {
            this.startTransition('MenuScene');
        });
        
        // Initialize progress data
        this.initializeProgress();
        
        // Create level grid
        this.createLevelGrid();
        
        // Add progress text
        const completedCount = this.completedLevels.length;
        this.add.text(this.scale.width / 2, this.scale.height - 40, 
            `Completed: ${completedCount}/${this.totalLevels}`, {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
    }
    
    initializeProgress() {
        try {
            // Use global SaveManager to load progress
            const saveData = SaveManager.loadProgress();
            
            this.unlockedLevels = saveData.unlockedLevels || [1];
            this.completedLevels = saveData.completedLevels || [];
            
            console.log('Unlocked levels:', this.unlockedLevels);
            console.log('Completed levels:', this.completedLevels);
        } catch (error) {
            console.error('Error loading progress:', error);
            // Fallback to defaults
            this.unlockedLevels = [1];
            this.completedLevels = [];
        }
    }
    
    createLevelGrid() {
        const startX = 150;
        const startY = 150;
        const buttonSize = 80;
        const spacing = 100;
        const buttonsPerRow = 5;
        
        for (let i = 1; i <= this.totalLevels; i++) {
            const row = Math.floor((i - 1) / buttonsPerRow);
            const col = (i - 1) % buttonsPerRow;
            
            const x = startX + col * spacing;
            const y = startY + row * spacing;
            
            const isUnlocked = this.unlockedLevels.includes(i);
            const isCompleted = this.completedLevels.includes(i);
            
            const button = this.createLevelButton(x, y, i, isUnlocked, isCompleted, buttonSize);
            this.levelButtons.push(button);
        }
    }
    
    createLevelButton(x, y, levelNumber, isUnlocked, isCompleted, size) {
        // Create button container
        const container = this.add.container(x, y);
        
        // Determine button colors based on state
        let backgroundColor, textColor, strokeColor;
        
        if (isCompleted) {
            backgroundColor = '#4CAF50'; // Green for completed
            textColor = '#ffffff';
            strokeColor = '#2E7D32';
        } else if (isUnlocked) {
            backgroundColor = '#2196F3'; // Blue for unlocked
            textColor = '#ffffff';
            strokeColor = '#1565C0';
        } else {
            backgroundColor = '#9E9E9E'; // Gray for locked
            textColor = '#616161';
            strokeColor = '#424242';
        }
        
        // Create button background
        const background = this.add.circle(0, 0, size / 2, backgroundColor);
        background.setStroke(strokeColor, 3);
        container.add(background);
        
        // Create level number text
        const text = this.add.text(0, 0, isUnlocked ? levelNumber.toString() : '🔒', {
            fontSize: isUnlocked ? '32px' : '24px',
            fill: textColor,
            fontWeight: 'bold'
        }).setOrigin(0.5);
        container.add(text);
        
        // Add completed star if level is completed
        if (isCompleted) {
            const star = this.add.text(0, -25, '★', {
                fontSize: '20px',
                fill: '#FFD700'
            }).setOrigin(0.5);
            container.add(star);
        }
        
        // Make interactive only if unlocked
        if (isUnlocked) {
            container.setInteractive(new Phaser.Geom.Circle(0, 0, size / 2), Phaser.Geom.Circle.Contains);
            
            // Add hover effects
            container.on('pointerover', () => {
                this.tweens.add({
                    targets: container,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 100,
                    ease: 'Power2'
                });
                
                // Show level preview/info
                this.showLevelPreview(levelNumber, x, y + size);
            });
            
            container.on('pointerout', () => {
                this.tweens.add({
                    targets: container,
                    scaleX: 1.0,
                    scaleY: 1.0,
                    duration: 100,
                    ease: 'Power2'
                });
                
                // Hide level preview
                this.hideLevelPreview();
            });
            
            // Handle click
            container.on('pointerdown', () => {
                this.selectLevel(levelNumber);
            });
        }
        
        return container;
    }
    
    showLevelPreview(levelNumber, x, y) {
        // Remove any existing preview
        this.hideLevelPreview();
        
        // Get save data synchronously
        const saveData = this.getSaveData();
        
        // Get level data asynchronously
        this.getLevelData(levelNumber).then(levelData => {
            if (levelData) {
                this.createLevelPreviewCard(levelData, saveData, x, y);
            }
        });
    }
    
    hideLevelPreview() {
        if (this.levelPreview) {
            this.levelPreview.destroy();
            this.levelPreview = null;
        }
        if (this.previewContainer) {
            this.previewContainer.destroy();
            this.previewContainer = null;
        }
    }

    createLevelPreviewCard(levelData, saveData, x, y) {
        const previewWidth = 200;
        const previewHeight = 150;
        const miniMapSize = 80;
        
        // Create container for the entire preview
        this.previewContainer = this.add.container(x, y + 50);
        
        // Background card
        const background = this.add.rectangle(0, 0, previewWidth, previewHeight, 0x000000, 0.9);
        background.setStroke(0xffffff, 2);
        this.previewContainer.add(background);
        
        // Level name
        const nameText = this.add.text(0, -60, levelData.levelName, {
            fontSize: '18px',
            fill: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        this.previewContainer.add(nameText);
        
        // Par information
        const parText = this.add.text(-80, -35, `Par: ${levelData.par}`, {
            fontSize: '14px',
            fill: '#ffff00'
        }).setOrigin(0, 0.5);
        this.previewContainer.add(parText);
        
        // Best score (if level completed)
        const bestScore = saveData && saveData.playerStats && saveData.playerStats.bestScores 
            ? saveData.playerStats.bestScores[levelData.levelNumber] 
            : null;
            
        if (bestScore) {
            const scoreText = this.add.text(80, -35, `Best: ${bestScore}`, {
                fontSize: '14px',
                fill: '#00ff00'
            }).setOrigin(1, 0.5);
            this.previewContainer.add(scoreText);
        }
        
        // Mini level layout
        this.createMiniLevelLayout(levelData, 0, 10, miniMapSize);
        
        // Add fade-in animation
        this.previewContainer.setAlpha(0);
        this.tweens.add({
            targets: this.previewContainer,
            alpha: 1,
            duration: 200,
            ease: 'Power2'
        });
    }

    createMiniLevelLayout(levelData, centerX, centerY, size) {
        const scale = size / 800; // Scale down from 800px game width
        
        // Mini map background
        const mapBg = this.add.rectangle(centerX, centerY, size, size * 0.75, 0x4CAF50, 0.3);
        mapBg.setStroke(0xffffff, 1);
        this.previewContainer.add(mapBg);
        
        // Ball start position (white dot)
        const ballX = centerX + (levelData.ballStart.x - 400) * scale;
        const ballY = centerY + (levelData.ballStart.y - 300) * scale * 0.75;
        const ballDot = this.add.circle(ballX, ballY, 2, 0xffffff);
        this.previewContainer.add(ballDot);
        
        // Hole position (black dot)
        const holeX = centerX + (levelData.hole.x - 400) * scale;
        const holeY = centerY + (levelData.hole.y - 300) * scale * 0.75;
        const holeDot = this.add.circle(holeX, holeY, 3, 0x000000);
        this.previewContainer.add(holeDot);
        
        // Walls (gray rectangles)
        if (levelData.walls) {
            levelData.walls.forEach(wall => {
                const wallX = centerX + (wall.x - 400) * scale;
                const wallY = centerY + (wall.y - 300) * scale * 0.75;
                const wallWidth = wall.width * scale;
                const wallHeight = wall.height * scale * 0.75;
                
                const wallRect = this.add.rectangle(wallX, wallY, wallWidth, wallHeight, 0x424242);
                this.previewContainer.add(wallRect);
            });
        }
        
        // Sand traps (yellow rectangles)
        if (levelData.sandTraps) {
            levelData.sandTraps.forEach(sand => {
                const sandX = centerX + (sand.x - 400) * scale;
                const sandY = centerY + (sand.y - 300) * scale * 0.75;
                const sandWidth = sand.width * scale;
                const sandHeight = sand.height * scale * 0.75;
                
                const sandRect = this.add.rectangle(sandX, sandY, sandWidth, sandHeight, 0xFFEB3B, 0.8);
                this.previewContainer.add(sandRect);
            });
        }
        
        // Add legend labels
        const legend = this.add.text(centerX, centerY + size/2 + 15, 'Ball → Hole', {
            fontSize: '10px',
            fill: '#cccccc'
        }).setOrigin(0.5);
        this.previewContainer.add(legend);
    }

    getSaveData() {
        try {
            // Use global SaveManager to get save data
            return SaveManager.loadProgress();
        } catch (error) {
            console.warn('Could not load save data for preview:', error);
            return null;
        }
    }
    
    async getLevelData(levelNumber) {
        try {
            const { getLevel } = await import('../levels/levelData.js');
            return getLevel(levelNumber);
        } catch (error) {
            console.error('Error loading level data for preview:', error);
            return null;
        }
    }
    
    selectLevel(levelNumber) {
        console.log(`Starting level ${levelNumber}`);
        
        // Hide any preview
        this.hideLevelPreview();
        
        // Start transition to GameScene with the selected level
        this.startTransitionToGame(levelNumber);
    }
    
    startTransitionToGame(levelNumber) {
        // Fade out effect before transitioning
        this.cameras.main.fadeOut(300, 0, 0, 0);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            // Pass the selected level to GameScene
            this.scene.start('GameScene', { selectedLevel: levelNumber });
        });
    }
    
    startTransition(targetScene) {
        // Fade out effect before transitioning
        this.cameras.main.fadeOut(300, 0, 0, 0);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(targetScene);
        });
    }
    
    // Method to update progress when called from save system
    updateProgress(completedLevels, unlockedLevels) {
        this.completedLevels = completedLevels || [];
        this.unlockedLevels = unlockedLevels || [1];
        
        // Refresh the level grid if scene is active
        if (this.scene.isActive()) {
            this.refreshLevelGrid();
        }
    }
    
    refreshLevelGrid() {
        // Destroy existing buttons
        this.levelButtons.forEach(button => button.destroy());
        this.levelButtons = [];
        
        // Recreate the grid
        this.createLevelGrid();
        
        // Update progress text
        const completedCount = this.completedLevels.length;
        const progressText = this.children.list.find(child => 
            child.type === 'Text' && child.text.includes('Completed:')
        );
        if (progressText) {
            progressText.setText(`Completed: ${completedCount}/${this.totalLevels}`);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelSelectScene;
}