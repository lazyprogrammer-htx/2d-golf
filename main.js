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
    }

    preload() {
        // No assets to preload for basic shapes
    }

    create() {
        // Create ball sprite (white circle, radius 10, position 100,300)
        this.ball = this.add.circle(100, 300, 10, 0xffffff);
        
        // Create hole sprite (black circle, radius 20, position 700,300)
        this.hole = this.add.circle(700, 300, 20, 0x000000);
        
        // Enable physics on ball
        this.physics.add.existing(this.ball);
        this.ball.body.setDrag(100);
        this.ball.body.setBounce(0.8);
        this.ball.body.setMaxVelocity(500);
        // Remove world bounds collision as we'll use walls instead
        // this.ball.body.setCollideWorldBounds(true);
        
        // Create walls physics group
        this.walls = this.physics.add.group();
        
        // Create level 1 boundary walls
        this.addWall(50, 300, 20, 400);   // Left wall
        this.addWall(750, 300, 20, 400);  // Right wall
        this.addWall(400, 50, 700, 20);   // Top wall
        this.addWall(400, 550, 700, 20);  // Bottom wall
        
        // Add collision between ball and walls
        this.physics.add.collider(this.ball, this.walls, null, null, this);
        this.ball.body.setBounce(0.8);
        
        // Create sand traps group (no physics, just visual)
        this.sandTraps = this.add.group();
        
        // Add a test sand trap in the middle
        const sandTrap = new SandTrap(this, 400, 350, 150, 100);
        this.sandTraps.add(sandTrap);
        
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
            this.drawPowerIndicator();
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
            
            const velocity = power * 400;
            
            // Apply velocity to ball
            const angle = Math.atan2(dy, dx);
            this.ball.body.setVelocity(
                Math.cos(angle) * velocity,
                Math.sin(angle) * velocity
            );
            
            // Clear trail on new shot
            this.ballTrail = [];
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

    drawPowerIndicator() {
        if (this.input.mousePointer) {
            const dx = this.input.mousePointer.x - this.ball.x;
            const dy = this.input.mousePointer.y - this.ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            const power = Math.min(distance / maxDistance, 1);
            
            // Draw rectangle showing power (green to red gradient)
            const barWidth = 100;
            const barHeight = 10;
            const barX = this.ball.x - barWidth / 2;
            const barY = this.ball.y + 30;
            
            // Background bar
            this.graphics.fillStyle(0x333333);
            this.graphics.fillRect(barX, barY, barWidth, barHeight);
            
            // Power bar with color gradient
            const powerWidth = barWidth * power;
            const color = power < 0.5 ? 
                Phaser.Display.Color.Interpolate.ColorWithColor(
                    {r: 0, g: 255, b: 0}, {r: 255, g: 255, b: 0}, 50, power * 100
                ) :
                Phaser.Display.Color.Interpolate.ColorWithColor(
                    {r: 255, g: 255, b: 0}, {r: 255, g: 0, b: 0}, 50, (power - 0.5) * 100
                );
            
            const colorValue = (color.r << 16) + (color.g << 8) + color.b;
            this.graphics.fillStyle(colorValue);
            this.graphics.fillRect(barX, barY, powerWidth, barHeight);
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
                console.log("Level Complete!");
                
                // Show level complete text
                this.add.text(400, 200, 'Level Complete!', {
                    fontSize: '48px',
                    fill: '#ffff00',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setOrigin(0.5);
                
                // Reset after 3 seconds
                this.time.delayedCall(3000, () => {
                    this.resetLevel();
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
            this.ball.setTint(0x888888);
        } else if (!inSand && this.ballInSand) {
            this.ballInSand = false;
            // Reset ball color when leaving sand
            this.ball.clearTint();
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

    resetLevel() {
        // Reset ball position
        this.ball.x = 100;
        this.ball.y = 300;
        this.ball.body.setVelocity(0, 0);
        
        // Reset game state
        this.levelComplete = false;
        this.canShoot = true;
        this.ballTrail = [];
        this.ballInSand = false;
        this.ball.clearTint();
        
        // Clear any completion text
        this.children.list.forEach(child => {
            if (child.type === 'Text' && child.text === 'Level Complete!') {
                child.destroy();
            }
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
    scene: GameScene
};

// Initialize the game
const game = new Phaser.Game(config);