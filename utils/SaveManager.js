/**
 * SaveManager - Comprehensive save/load functionality for 2D Golf
 * Handles persistent storage using localStorage with validation and error handling
 */
class SaveManager {
    static SAVE_KEY = '2d-golf-save-data';
    static VERSION = '1.0';

    /**
     * Default save data structure
     */
    static getDefaultSaveData() {
        return {
            completedLevels: [],
            currentLevel: 1,
            version: SaveManager.VERSION,
            playerStats: {
                totalShots: 0,
                totalLevelsCompleted: 0,
                bestScores: {} // levelNumber: shotCount
            },
            unlockedLevels: [1], // Level 1 always unlocked
            lastPlayedLevel: 1,
            dateCreated: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
    }

    /**
     * Save game progress to localStorage
     * @param {Array<number>} completedLevels - Array of completed level numbers
     * @param {number} currentLevel - Current level number
     * @param {Object} additionalData - Optional additional data to save
     * @returns {boolean} - Success status
     */
    static saveProgress(completedLevels = [], currentLevel = 1, additionalData = {}) {
        try {
            const existingData = SaveManager.loadProgress();
            
            // Merge with existing data
            const saveData = {
                ...existingData,
                completedLevels: [...new Set(completedLevels)], // Remove duplicates
                currentLevel: Math.max(1, Math.min(currentLevel, 14)), // Validate range
                lastPlayedLevel: currentLevel,
                unlockedLevels: SaveManager.calculateUnlockedLevels(completedLevels),
                lastModified: new Date().toISOString(),
                ...additionalData
            };

            // Update player stats
            saveData.playerStats.totalLevelsCompleted = completedLevels.length;

            // Validate save data before storing
            if (SaveManager.validateSaveData(saveData)) {
                localStorage.setItem(SaveManager.SAVE_KEY, JSON.stringify(saveData));
                console.log('Progress saved successfully:', saveData);
                return true;
            } else {
                console.error('Invalid save data, not saving');
                return false;
            }
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    }

    /**
     * Load game progress from localStorage
     * @returns {Object} - Save data or default data if none exists
     */
    static loadProgress() {
        try {
            const savedData = localStorage.getItem(SaveManager.SAVE_KEY);
            
            if (!savedData) {
                console.log('No save data found, using defaults');
                return SaveManager.getDefaultSaveData();
            }

            const parsedData = JSON.parse(savedData);
            
            // Validate and migrate if necessary
            const validatedData = SaveManager.validateAndMigrate(parsedData);
            
            if (validatedData) {
                console.log('Progress loaded successfully:', validatedData);
                return validatedData;
            } else {
                console.warn('Invalid save data, using defaults');
                return SaveManager.getDefaultSaveData();
            }
        } catch (error) {
            console.error('Error loading progress:', error);
            return SaveManager.getDefaultSaveData();
        }
    }

    /**
     * Clear all saved progress
     * @returns {boolean} - Success status
     */
    static clearProgress() {
        try {
            localStorage.removeItem(SaveManager.SAVE_KEY);
            console.log('Progress cleared successfully');
            return true;
        } catch (error) {
            console.error('Error clearing progress:', error);
            return false;
        }
    }

    /**
     * Check if a level is unlocked
     * @param {number} levelNumber - Level to check
     * @returns {boolean} - True if unlocked
     */
    static isLevelUnlocked(levelNumber) {
        if (levelNumber < 1 || levelNumber > 14) return false;
        if (levelNumber === 1) return true; // Level 1 always unlocked

        const saveData = SaveManager.loadProgress();
        return saveData.unlockedLevels.includes(levelNumber);
    }

    /**
     * Check if a level is completed
     * @param {number} levelNumber - Level to check
     * @returns {boolean} - True if completed
     */
    static isLevelCompleted(levelNumber) {
        if (levelNumber < 1 || levelNumber > 14) return false;

        const saveData = SaveManager.loadProgress();
        return saveData.completedLevels.includes(levelNumber);
    }

    /**
     * Mark a level as completed and save
     * @param {number} levelNumber - Level that was completed
     * @param {number} shotCount - Number of shots taken
     * @returns {boolean} - Success status
     */
    static completeLevel(levelNumber, shotCount = 0) {
        try {
            const saveData = SaveManager.loadProgress();
            
            // Add to completed levels if not already there
            if (!saveData.completedLevels.includes(levelNumber)) {
                saveData.completedLevels.push(levelNumber);
            }

            // Update best score if this is better
            const currentBest = saveData.playerStats.bestScores[levelNumber];
            if (!currentBest || shotCount < currentBest) {
                saveData.playerStats.bestScores[levelNumber] = shotCount;
            }

            // Update total shots
            saveData.playerStats.totalShots += shotCount;

            // Save updated data
            return SaveManager.saveProgress(
                saveData.completedLevels,
                saveData.currentLevel,
                {
                    playerStats: saveData.playerStats
                }
            );
        } catch (error) {
            console.error('Error completing level:', error);
            return false;
        }
    }

    /**
     * Get best score for a level
     * @param {number} levelNumber - Level to check
     * @returns {number|null} - Best score or null if not completed
     */
    static getBestScore(levelNumber) {
        const saveData = SaveManager.loadProgress();
        return saveData.playerStats.bestScores[levelNumber] || null;
    }

    /**
     * Calculate which levels should be unlocked based on completed levels
     * @param {Array<number>} completedLevels - Array of completed level numbers
     * @returns {Array<number>} - Array of unlocked level numbers
     */
    static calculateUnlockedLevels(completedLevels) {
        const unlocked = [1]; // Level 1 always unlocked
        
        // Unlock next level for each completed level
        completedLevels.forEach(level => {
            const nextLevel = level + 1;
            if (nextLevel <= 14 && !unlocked.includes(nextLevel)) {
                unlocked.push(nextLevel);
            }
        });

        return unlocked.sort((a, b) => a - b);
    }

    /**
     * Validate save data structure
     * @param {Object} data - Data to validate
     * @returns {boolean} - True if valid
     */
    static validateSaveData(data) {
        if (!data || typeof data !== 'object') return false;

        // Required fields
        const requiredFields = ['completedLevels', 'currentLevel', 'version', 'unlockedLevels'];
        for (const field of requiredFields) {
            if (!(field in data)) return false;
        }

        // Type checks
        if (!Array.isArray(data.completedLevels)) return false;
        if (!Array.isArray(data.unlockedLevels)) return false;
        if (typeof data.currentLevel !== 'number') return false;
        if (typeof data.version !== 'string') return false;

        // Range checks
        if (data.currentLevel < 1 || data.currentLevel > 14) return false;
        
        // Validate level arrays
        for (const level of data.completedLevels) {
            if (typeof level !== 'number' || level < 1 || level > 14) return false;
        }
        
        for (const level of data.unlockedLevels) {
            if (typeof level !== 'number' || level < 1 || level > 14) return false;
        }

        return true;
    }

    /**
     * Validate and migrate save data from older versions
     * @param {Object} data - Raw save data
     * @returns {Object|null} - Validated/migrated data or null if invalid
     */
    static validateAndMigrate(data) {
        if (!data || typeof data !== 'object') return null;

        // Handle missing version (assume very old format)
        if (!data.version) {
            return SaveManager.migrateFromLegacy(data);
        }

        // Current version - validate as-is
        if (data.version === SaveManager.VERSION) {
            return SaveManager.validateSaveData(data) ? data : null;
        }

        // Future version - use defaults (shouldn't happen but handle gracefully)
        console.warn('Save data from newer version detected, using defaults');
        return SaveManager.getDefaultSaveData();
    }

    /**
     * Migrate from legacy localStorage format (individual keys)
     * @param {Object} data - Raw data that might be legacy format
     * @returns {Object} - Migrated save data
     */
    static migrateFromLegacy(data) {
        console.log('Migrating from legacy save format');
        
        const migrated = SaveManager.getDefaultSaveData();
        
        // Try to extract data from legacy format
        try {
            // Check for old individual localStorage keys
            const completedLevels = [];
            const unlockedLevels = [1];
            
            for (let i = 1; i <= 14; i++) {
                const completedKey = `level_${i}_completed`;
                const unlockedKey = `level_${i}_unlocked`;
                
                if (localStorage.getItem(completedKey) === 'true') {
                    completedLevels.push(i);
                }
                
                if (localStorage.getItem(unlockedKey) === 'true' && !unlockedLevels.includes(i)) {
                    unlockedLevels.push(i);
                }
            }

            migrated.completedLevels = completedLevels;
            migrated.unlockedLevels = unlockedLevels;
            migrated.playerStats.totalLevelsCompleted = completedLevels.length;

            // Clean up old keys after migration
            for (let i = 1; i <= 14; i++) {
                localStorage.removeItem(`level_${i}_completed`);
                localStorage.removeItem(`level_${i}_unlocked`);
            }

            console.log('Legacy data migrated:', migrated);
        } catch (error) {
            console.warn('Error migrating legacy data:', error);
        }

        return migrated;
    }

    /**
     * Get current progression statistics
     * @returns {Object} - Statistics about current progress
     */
    static getProgressStats() {
        const saveData = SaveManager.loadProgress();
        
        return {
            completedLevels: saveData.completedLevels.length,
            totalLevels: 14,
            completionPercentage: Math.round((saveData.completedLevels.length / 14) * 100),
            currentLevel: saveData.currentLevel,
            lastPlayedLevel: saveData.lastPlayedLevel,
            totalShots: saveData.playerStats.totalShots,
            averageShotsPerLevel: saveData.completedLevels.length > 0 
                ? Math.round(saveData.playerStats.totalShots / saveData.completedLevels.length) 
                : 0,
            unlockedLevels: saveData.unlockedLevels.length
        };
    }

    /**
     * Export save data for backup/sharing
     * @returns {string} - JSON string of save data
     */
    static exportSaveData() {
        const saveData = SaveManager.loadProgress();
        return JSON.stringify(saveData, null, 2);
    }

    /**
     * Import save data from backup
     * @param {string} jsonData - JSON string of save data
     * @returns {boolean} - Success status
     */
    static importSaveData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            const validatedData = SaveManager.validateAndMigrate(data);
            
            if (validatedData) {
                localStorage.setItem(SaveManager.SAVE_KEY, JSON.stringify(validatedData));
                console.log('Save data imported successfully');
                return true;
            } else {
                console.error('Invalid save data provided for import');
                return false;
            }
        } catch (error) {
            console.error('Error importing save data:', error);
            return false;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SaveManager;
}