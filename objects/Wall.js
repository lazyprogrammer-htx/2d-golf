// Wall class - Creates physics-enabled wall objects
class Wall extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height) {
        // Create rectangle with dark gray fill
        super(scene, x, y, width, height, 0x424242);
        
        // Add to scene
        scene.add.existing(this);
        
        // Enable physics
        scene.physics.add.existing(this);
        
        // Make wall immovable (static)
        this.body.setImmovable(true);
        
        // Store reference to scene
        this.scene = scene;
    }
    
    // Optional method to change wall color
    setColor(color) {
        this.setFillStyle(color);
        return this;
    }
    
    // Optional method to make wall bouncy
    setBounce(bounce) {
        if (this.body) {
            this.body.setBounce(bounce);
        }
        return this;
    }
}