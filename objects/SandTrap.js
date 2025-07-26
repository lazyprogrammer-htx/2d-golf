// SandTrap class - Creates sand trap areas that slow down the ball
class SandTrap extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height) {
        // Create rectangle with beige fill and transparency
        super(scene, x, y, width, height, 0xF4E4C1);
        
        // Set transparency
        this.setAlpha(0.8);
        
        // Add to scene
        scene.add.existing(this);
        
        // Store reference to scene
        this.scene = scene;
        
        // Sand traps don't have physics bodies (ball passes over them)
        // They use overlap detection instead
    }
    
    // Method to check if a point is inside this sand trap
    contains(x, y) {
        const bounds = this.getBounds();
        return bounds.contains(x, y);
    }
}