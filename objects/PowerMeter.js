// PowerMeter class - Visual power meter with gradient display
class PowerMeter {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 20;
        this.visible = false;
        this.percentage = 0;
        
        // Create graphics object for drawing
        this.graphics = scene.add.graphics();
        this.graphics.setDepth(100); // Ensure it's drawn on top
        
        // Create background rectangle
        this.background = scene.add.rectangle(x, y, this.width, this.height, 0x333333, 0.8);
        this.background.setVisible(false);
        
        // Create label text
        this.label = scene.add.text(x, y - 30, 'POWER', {
            fontSize: '16px',
            fill: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        this.label.setVisible(false);
        
        // Create percentage text
        this.percentageText = scene.add.text(x, y + 30, '0%', {
            fontSize: '14px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.percentageText.setVisible(false);
    }
    
    update(percentage) {
        this.percentage = Math.max(0, Math.min(1, percentage));
        this.percentageText.setText(`${Math.round(this.percentage * 100)}%`);
        
        if (this.visible) {
            this.draw();
        }
    }
    
    draw() {
        this.graphics.clear();
        
        if (!this.visible) {
            return;
        }
        
        // Draw background border
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.graphics.strokeRect(
            this.x - this.width / 2, 
            this.y - this.height / 2, 
            this.width, 
            this.height
        );
        
        if (this.percentage <= 0) {
            return;
        }
        
        // Calculate filled width
        const filledWidth = this.width * this.percentage;
        const startX = this.x - this.width / 2;
        const startY = this.y - this.height / 2;
        
        // Create color gradient based on percentage
        let color;
        if (this.percentage <= 0.33) {
            // Green to yellow (0-33%)
            const factor = this.percentage / 0.33;
            color = Phaser.Display.Color.Interpolate.ColorWithColor(
                {r: 0, g: 255, b: 0},      // Green
                {r: 255, g: 255, b: 0},    // Yellow
                100, factor * 100
            );
        } else if (this.percentage <= 0.66) {
            // Yellow to orange (33-66%)
            const factor = (this.percentage - 0.33) / 0.33;
            color = Phaser.Display.Color.Interpolate.ColorWithColor(
                {r: 255, g: 255, b: 0},    // Yellow
                {r: 255, g: 165, b: 0},    // Orange
                100, factor * 100
            );
        } else {
            // Orange to red (66-100%)
            const factor = (this.percentage - 0.66) / 0.34;
            color = Phaser.Display.Color.Interpolate.ColorWithColor(
                {r: 255, g: 165, b: 0},    // Orange
                {r: 255, g: 0, b: 0},      // Red
                100, factor * 100
            );
        }
        
        // Convert to hex color
        const colorValue = (color.r << 16) + (color.g << 8) + color.b;
        
        // Draw filled portion
        this.graphics.fillStyle(colorValue, 0.9);
        this.graphics.fillRect(startX, startY, filledWidth, this.height);
        
        // Add glow effect for high power
        if (this.percentage > 0.8) {
            this.graphics.lineStyle(2, colorValue, 0.5);
            this.graphics.strokeRect(startX - 2, startY - 2, filledWidth + 4, this.height + 4);
        }
    }
    
    show() {
        this.visible = true;
        this.background.setVisible(true);
        this.label.setVisible(true);
        this.percentageText.setVisible(true);
        this.graphics.setVisible(true);
    }
    
    hide() {
        this.visible = false;
        this.background.setVisible(false);
        this.label.setVisible(false);
        this.percentageText.setVisible(false);
        this.graphics.setVisible(false);
        this.graphics.clear();
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.background.setPosition(x, y);
        this.label.setPosition(x, y - 30);
        this.percentageText.setPosition(x, y + 30);
    }
    
    destroy() {
        this.graphics.destroy();
        this.background.destroy();
        this.label.destroy();
        this.percentageText.destroy();
    }
}