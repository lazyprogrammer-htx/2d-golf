// LevelCompleteOverlay class - UI overlay for level completion
class LevelCompleteOverlay {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.background = null;
        this.isVisible = false;
        this.elements = [];
    }
    
    /**
     * Show the level complete overlay
     * @param {number} shotsTaken - Number of shots taken to complete level
     * @param {number} par - Par for the current level
     * @param {number} currentLevel - Current level number
     * @param {boolean} isLastLevel - Whether this is the last level
     */
    show(shotsTaken, par, currentLevel, isLastLevel = false) {
        if (this.isVisible) {
            return; // Already showing
        }
        
        this.isVisible = true;
        this.elements = [];
        
        // Create container for all overlay elements
        this.container = this.scene.add.container(0, 0);
        
        // Create semi-transparent background
        this.background = this.scene.add.rectangle(
            this.scene.scale.width / 2, 
            this.scene.scale.height / 2, 
            this.scene.scale.width, 
            this.scene.scale.height, 
            0x000000, 
            0.7
        );
        this.background.setInteractive();
        this.container.add(this.background);
        
        // Create main content panel
        const panelWidth = 400;
        const panelHeight = 300;
        const panelX = this.scene.scale.width / 2;
        const panelY = this.scene.scale.height / 2;
        
        const panel = this.scene.add.rectangle(
            panelX, 
            panelY, 
            panelWidth, 
            panelHeight, 
            0xffffff, 
            0.95
        );
        panel.setStrokeStyle(4, 0x4CAF50);
        this.container.add(panel);
        
        // "Level Complete!" title
        const titleText = this.scene.add.text(panelX, panelY - 80, 'Level Complete!', {
            fontSize: '36px',
            fill: '#4CAF50',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        this.container.add(titleText);
        
        // Calculate score comparison
        const scoreComparison = this.getScoreComparison(shotsTaken, par);
        
        // Shots taken display
        const shotsText = this.scene.add.text(panelX, panelY - 30, `Shots: ${shotsTaken}`, {
            fontSize: '24px',
            fill: '#333333',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        this.container.add(shotsText);
        
        // Par comparison display
        if (par > 0) {
            const parText = this.scene.add.text(panelX, panelY - 5, `Par: ${par}`, {
                fontSize: '20px',
                fill: '#666666'
            }).setOrigin(0.5);
            this.container.add(parText);
            
            // Score result display
            const resultText = this.scene.add.text(panelX, panelY + 20, scoreComparison.text, {
                fontSize: '18px',
                fill: scoreComparison.color,
                fontWeight: 'bold'
            }).setOrigin(0.5);
            this.container.add(resultText);
        }
        
        // Create buttons
        this.createButtons(panelX, panelY + 70, currentLevel, isLastLevel);
        
        // Add entrance animation
        this.container.setAlpha(0);
        this.container.setScale(0.8);
        
        this.scene.tweens.add({
            targets: this.container,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });
        
        // Store reference for cleanup
        this.elements.push(this.container);
    }
    
    /**
     * Create action buttons for the overlay
     * @param {number} centerX - X position for button placement
     * @param {number} centerY - Y position for button placement
     * @param {number} currentLevel - Current level number
     * @param {boolean} isLastLevel - Whether this is the last level
     */
    createButtons(centerX, centerY, currentLevel, isLastLevel) {
        const buttonSpacing = 120;
        const buttonWidth = 100;
        const buttonHeight = 40;
        
        // Next Level button (only show if not last level)
        if (!isLastLevel) {
            const nextButton = this.createButton(
                centerX - buttonSpacing / 2, 
                centerY, 
                buttonWidth, 
                buttonHeight,
                'NEXT LEVEL',
                '#2196F3',
                '#42A5F5',
                () => this.onNextLevel(currentLevel)
            );
            this.container.add(nextButton.background);
            this.container.add(nextButton.text);
        }
        
        // Level Select button
        const selectButtonX = isLastLevel ? centerX : centerX + buttonSpacing / 2;
        const selectButton = this.createButton(
            selectButtonX,
            centerY,
            buttonWidth,
            buttonHeight,
            'LEVEL SELECT',
            '#4CAF50',
            '#66BB6A',
            () => this.onLevelSelect()
        );
        this.container.add(selectButton.background);
        this.container.add(selectButton.text);
        
        // If last level, add congratulations text and different button layout
        if (isLastLevel) {
            const congratsText = this.scene.add.text(centerX, centerY - 30, 'Congratulations!', {
                fontSize: '20px',
                fill: '#FF9800',
                fontWeight: 'bold'
            }).setOrigin(0.5);
            this.container.add(congratsText);
            
            const allCompleteText = this.scene.add.text(centerX, centerY - 10, 'All levels completed!', {
                fontSize: '16px',
                fill: '#666666'
            }).setOrigin(0.5);
            this.container.add(allCompleteText);
        }
    }
    
    /**
     * Create a button with hover effects
     * @param {number} x - Button X position
     * @param {number} y - Button Y position
     * @param {number} width - Button width
     * @param {number} height - Button height
     * @param {string} text - Button text
     * @param {string} color - Button color
     * @param {string} hoverColor - Button hover color
     * @param {Function} callback - Click callback
     * @returns {Object} Button elements
     */
    createButton(x, y, width, height, text, color, hoverColor, callback) {
        // Create button background
        const background = this.scene.add.rectangle(x, y, width, height, color);
        background.setStrokeStyle(2, 0x000000);
        background.setInteractive();
        
        // Create button text
        const buttonText = this.scene.add.text(x, y, text, {
            fontSize: '14px',
            fill: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Add hover effects
        background.on('pointerover', () => {
            background.setFillStyle(hoverColor);
            this.scene.tweens.add({
                targets: [background, buttonText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 100,
                ease: 'Power2'
            });
        });
        
        background.on('pointerout', () => {
            background.setFillStyle(color);
            this.scene.tweens.add({
                targets: [background, buttonText],
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 100,
                ease: 'Power2'
            });
        });
        
        // Add click handler
        background.on('pointerdown', () => {
            this.scene.tweens.add({
                targets: [background, buttonText],
                scaleX: 0.95,
                scaleY: 0.95,
                duration: 50,
                ease: 'Power2',
                onComplete: () => {
                    this.scene.tweens.add({
                        targets: [background, buttonText],
                        scaleX: 1.0,
                        scaleY: 1.0,
                        duration: 50,
                        ease: 'Power2',
                        onComplete: callback
                    });
                }
            });
        });
        
        return { background, text: buttonText };
    }
    
    /**
     * Calculate score comparison text and color
     * @param {number} shots - Shots taken
     * @param {number} par - Level par
     * @returns {Object} Comparison result
     */
    getScoreComparison(shots, par) {
        if (par <= 0) {
            return { text: '', color: '#000000' };
        }
        
        const difference = shots - par;
        
        if (difference < 0) {
            const underPar = Math.abs(difference);
            if (underPar === 1) {
                return { text: 'Birdie! (-1)', color: '#4CAF50' };
            } else if (underPar === 2) {
                return { text: 'Eagle! (-2)', color: '#2196F3' };
            } else {
                return { text: `Amazing! (-${underPar})`, color: '#9C27B0' };
            }
        } else if (difference === 0) {
            return { text: 'Par!', color: '#FF9800' };
        } else {
            if (difference === 1) {
                return { text: 'Bogey (+1)', color: '#FF5722' };
            } else {
                return { text: `(+${difference})`, color: '#F44336' };
            }
        }
    }
    
    /**
     * Handle next level button click
     * @param {number} currentLevel - Current level number
     */
    onNextLevel(currentLevel) {
        this.hide(() => {
            // Load next level
            this.scene.loadLevel(currentLevel + 1);
        });
    }
    
    /**
     * Handle level select button click
     */
    onLevelSelect() {
        this.hide(() => {
            // Return to level select scene
            this.scene.returnToLevelSelect();
        });
    }
    
    /**
     * Hide the overlay with animation
     * @param {Function} callback - Callback function after hide animation
     */
    hide(callback = null) {
        if (!this.isVisible || !this.container) {
            if (callback) callback();
            return;
        }
        
        this.scene.tweens.add({
            targets: this.container,
            alpha: 0,
            scaleX: 0.8,
            scaleY: 0.8,
            duration: 200,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.cleanup();
                if (callback) callback();
            }
        });
    }
    
    /**
     * Clean up overlay elements
     */
    cleanup() {
        // Clear any active tweens first
        if (this.scene && this.scene.tweens) {
            this.scene.tweens.killTweensOf(this.container);
        }
        
        if (this.container) {
            this.container.destroy();
            this.container = null;
        }
        
        this.elements.forEach(element => {
            if (element && element.destroy) {
                element.destroy();
            }
        });
        
        this.elements = [];
        this.isVisible = false;
        this.background = null;
    }
    
    /**
     * Check if overlay is currently visible
     * @returns {boolean} Visibility state
     */
    getIsVisible() {
        return this.isVisible;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelCompleteOverlay;
}