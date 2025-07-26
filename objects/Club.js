// Club class - Defines different club types with power and accuracy properties
class Club {
    constructor(name, powerMultiplier, accuracy) {
        this.name = name;
        this.powerMultiplier = powerMultiplier;
        this.accuracy = accuracy; // accuracy spread in degrees
    }
    
    // Calculate shot power based on base power and club multiplier
    calculateShotPower(basePower) {
        return basePower * this.powerMultiplier;
    }
    
    // Add accuracy spread to the shot angle
    addAccuracySpread(angle) {
        if (this.accuracy === 0) {
            return angle; // Perfect accuracy (Putter)
        }
        
        // Convert accuracy from degrees to radians
        const spreadRadians = (this.accuracy * Math.PI) / 180;
        
        // Add random spread within accuracy range
        const randomSpread = (Math.random() - 0.5) * 2 * spreadRadians;
        return angle + randomSpread;
    }
    
    // Get club color for UI display
    getColor() {
        switch (this.name) {
            case 'Driver': return 0xff4444; // Red
            case 'Iron': return 0x4444ff;   // Blue  
            case 'Putter': return 0x44ff44; // Green
            default: return 0xffffff;       // White
        }
    }
}