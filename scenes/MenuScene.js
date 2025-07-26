// MenuScene class - Main menu screen
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // No assets to preload for basic shapes and text
    }

    create() {
        // Create background with game green
        this.cameras.main.setBackgroundColor('#4CAF50');
        
        // Add game title
        this.add.text(this.scale.width / 2, 150, 'Mini Golf Master', {
            fontSize: '64px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Add subtitle
        this.add.text(this.scale.width / 2, 220, 'A 2D Golf Adventure', {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Create Play button
        const playButton = this.add.text(this.scale.width / 2, 350, 'PLAY', {
            fontSize: '48px',
            fill: '#ffffff',
            backgroundColor: '#2196F3',
            padding: { x: 40, y: 15 },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Make Play button interactive
        playButton.setInteractive();
        
        // Add hover effects
        playButton.on('pointerover', () => {
            playButton.setStyle({ backgroundColor: '#42A5F5' });
            this.tweens.add({
                targets: playButton,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100,
                ease: 'Power2'
            });
        });
        
        playButton.on('pointerout', () => {
            playButton.setStyle({ backgroundColor: '#2196F3' });
            this.tweens.add({
                targets: playButton,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 100,
                ease: 'Power2'
            });
        });
        
        // Handle Play button click
        playButton.on('pointerdown', () => {
            this.startTransition('LevelSelectScene');
        });
        
        // Add version info at bottom
        this.add.text(this.scale.width / 2, this.scale.height - 30, 'Version 1.0 - 14 Challenging Holes', {
            fontSize: '16px',
            fill: '#ffffff',
            alpha: 0.8
        }).setOrigin(0.5);
        
        // Add simple decorative golf balls
        this.createDecorations();
    }
    
    createDecorations() {
        // Add some decorative golf balls around the title
        const ballPositions = [
            { x: 150, y: 120 },
            { x: 650, y: 120 },
            { x: 120, y: 300 },
            { x: 680, y: 300 },
            { x: 200, y: 480 },
            { x: 600, y: 480 }
        ];
        
        ballPositions.forEach(pos => {
            const ball = this.add.circle(pos.x, pos.y, 8, 0xffffff);
            ball.setStrokeStyle(2, 0x000000);
            
            // Add gentle floating animation
            this.tweens.add({
                targets: ball,
                y: pos.y - 10,
                duration: 2000 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    startTransition(targetScene) {
        // Fade out effect before transitioning
        this.cameras.main.fadeOut(300, 0, 0, 0);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(targetScene);
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MenuScene;
}