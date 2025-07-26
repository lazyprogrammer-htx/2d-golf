// ClubSelector class - UI component for selecting clubs
class ClubSelector {
    constructor(scene) {
        this.scene = scene;
        this.clubs = [];
        this.selectedClub = null;
        this.clubButtons = [];
        this.selectedClubText = null;
        
        // Don't create buttons yet - wait for clubs to be added
        this.createSelectedClubDisplay();
    }
    
    createClubButtons() {
        // Create three club buttons on the left side
        const buttonWidth = 80;
        const buttonHeight = 40;
        const startY = 100;
        const spacing = 60;
        const x = 60;
        
        // Create club buttons
        this.clubs.forEach((club, index) => {
            const y = startY + (index * spacing);
            
            // Create button background
            const button = this.scene.add.rectangle(x, y, buttonWidth, buttonHeight, club.getColor(), 0.8);
            button.setInteractive();
            
            // Create button text
            const text = this.scene.add.text(x, y, club.name, {
                fontSize: '14px',
                fill: '#ffffff',
                fontWeight: 'bold'
            }).setOrigin(0.5);
            
            // Add power info text
            const powerText = this.scene.add.text(x, y + 15, `${club.powerMultiplier}x`, {
                fontSize: '12px',
                fill: '#cccccc'
            }).setOrigin(0.5);
            
            // Store button data
            const buttonData = {
                button: button,
                text: text,
                powerText: powerText,
                club: club,
                index: index
            };
            
            this.clubButtons.push(buttonData);
            
            // Add click handler
            button.on('pointerdown', () => {
                this.selectClub(index);
            });
            
            // Add hover effects
            button.on('pointerover', () => {
                button.setAlpha(1.0);
            });
            
            button.on('pointerout', () => {
                if (this.selectedClub !== club) {
                    button.setAlpha(0.8);
                }
            });
        });
        
        // Select first club by default
        if (this.clubs.length > 0) {
            this.selectClub(0);
        }
        
        // Create selected club info display
        this.createSelectedClubDisplay();
    }
    
    createSelectedClubDisplay() {
        // Display selected club info near the ball
        this.selectedClubText = this.scene.add.text(10, this.scene.scale.height - 60, '', {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });
    }
    
    selectClub(index) {
        if (index >= 0 && index < this.clubs.length) {
            // Deselect previous club button
            if (this.selectedClub) {
                const prevButton = this.clubButtons.find(b => b.club === this.selectedClub);
                if (prevButton) {
                    prevButton.button.setAlpha(0.8);
                }
            }
            
            // Select new club
            this.selectedClub = this.clubs[index];
            const selectedButton = this.clubButtons[index];
            
            // Highlight selected button
            selectedButton.button.setAlpha(1.0);
            
            // Update selected club display
            this.updateSelectedClubDisplay();
            
            // Notify scene of club change
            if (this.scene.onClubChanged) {
                this.scene.onClubChanged(this.selectedClub);
            }
        }
    }
    
    updateSelectedClubDisplay() {
        if (this.selectedClubText && this.selectedClub) {
            const accuracy = this.selectedClub.accuracy === 0 ? 'Perfect' : `±${this.selectedClub.accuracy}°`;
            this.selectedClubText.setText(
                `Club: ${this.selectedClub.name} | Power: ${this.selectedClub.powerMultiplier}x | Accuracy: ${accuracy}`
            );
        }
    }
    
    addClub(club) {
        this.clubs.push(club);
    }
    
    getSelectedClub() {
        return this.selectedClub;
    }
    
    destroy() {
        // Clean up all UI elements
        this.clubButtons.forEach(buttonData => {
            buttonData.button.destroy();
            buttonData.text.destroy();
            buttonData.powerText.destroy();
        });
        
        if (this.selectedClubText) {
            this.selectedClubText.destroy();
        }
    }
}