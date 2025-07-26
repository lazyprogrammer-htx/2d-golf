// Level data structure for 2D Golf game
// Each level contains: ballStart, hole, walls, sandTraps, levelName, par

export const levels = [
    // Level 1 - Basic layout (matching existing hardcoded design)
    {
        levelNumber: 1,
        levelName: "First Shot",
        par: 2,
        ballStart: { x: 100, y: 300 },
        hole: { x: 700, y: 300 },
        walls: [
            { x: 50, y: 300, width: 20, height: 400 },   // Left wall
            { x: 750, y: 300, width: 20, height: 400 },  // Right wall
            { x: 400, y: 50, width: 700, height: 20 },   // Top wall
            { x: 400, y: 550, width: 700, height: 20 }   // Bottom wall
        ],
        sandTraps: [
            { x: 400, y: 350, width: 150, height: 100 }  // Center sand trap
        ]
    },
    
    // Level 2 - Simple L-shaped layout with one sand trap
    {
        levelNumber: 2,
        levelName: "L-Turn",
        par: 3,
        ballStart: { x: 100, y: 500 },
        hole: { x: 700, y: 100 },
        walls: [
            { x: 50, y: 350, width: 20, height: 300 },   // Left wall
            { x: 150, y: 525, width: 200, height: 20 },  // Bottom wall
            { x: 350, y: 300, width: 20, height: 450 },  // Vertical divider
            { x: 500, y: 50, width: 400, height: 20 },   // Top wall
            { x: 750, y: 200, width: 20, height: 300 },  // Right wall
            { x: 500, y: 275, width: 500, height: 20 }   // Horizontal divider
        ],
        sandTraps: [
            { x: 450, y: 150, width: 100, height: 80 }   // Corner sand trap
        ]
    },
    
    // Level 3 - Angled walls and multiple sand traps
    {
        levelNumber: 3,
        levelName: "Sand Valley",
        par: 4,
        ballStart: { x: 100, y: 200 },
        hole: { x: 700, y: 400 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left wall
            { x: 750, y: 300, width: 20, height: 500 },  // Right wall
            { x: 400, y: 50, width: 700, height: 20 },   // Top wall
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom wall
            { x: 200, y: 300, width: 150, height: 20 },  // Diagonal blocker 1
            { x: 450, y: 250, width: 150, height: 20 },  // Diagonal blocker 2
            { x: 300, y: 400, width: 200, height: 20 }   // Diagonal blocker 3
        ],
        sandTraps: [
            { x: 250, y: 150, width: 100, height: 60 },  // Top sand trap
            { x: 350, y: 320, width: 80, height: 60 },   // Middle sand trap
            { x: 550, y: 450, width: 120, height: 80 }   // Bottom sand trap
        ]
    },

    // Level 4 - Narrow Path (Introduce precise navigation)
    {
        levelNumber: 4,
        levelName: "Narrow Path",
        par: 3,
        ballStart: { x: 100, y: 300 },
        hole: { x: 700, y: 300 },
        walls: [
            { x: 50, y: 200, width: 20, height: 600 },   // Left boundary
            { x: 750, y: 200, width: 20, height: 600 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 250, y: 220, width: 20, height: 120 },  // Top channel wall
            { x: 250, y: 380, width: 20, height: 120 },  // Bottom channel wall
            { x: 450, y: 180, width: 20, height: 120 },  // Top channel wall 2
            { x: 450, y: 420, width: 20, height: 120 },  // Bottom channel wall 2
            { x: 600, y: 220, width: 20, height: 120 },  // Top channel wall 3
            { x: 600, y: 380, width: 20, height: 120 }   // Bottom channel wall 3
        ],
        sandTraps: [
            { x: 350, y: 270, width: 60, height: 60 }    // Center hazard
        ]
    },

    // Level 5 - Sand Valley (Multiple sand hazards)
    {
        levelNumber: 5,
        levelName: "Sand Gauntlet",
        par: 4,
        ballStart: { x: 100, y: 150 },
        hole: { x: 700, y: 450 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left wall
            { x: 750, y: 300, width: 20, height: 500 },  // Right wall
            { x: 400, y: 50, width: 700, height: 20 },   // Top wall
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom wall
            { x: 300, y: 200, width: 200, height: 20 }   // Central divider
        ],
        sandTraps: [
            { x: 200, y: 250, width: 120, height: 80 },  // Left sand
            { x: 400, y: 120, width: 100, height: 70 },  // Top sand
            { x: 500, y: 300, width: 140, height: 90 },  // Center sand
            { x: 350, y: 450, width: 110, height: 70 },  // Bottom left sand
            { x: 600, y: 380, width: 100, height: 60 }   // Bottom right sand
        ]
    },

    // Level 6 - Zigzag (Alternating wall pattern)
    {
        levelNumber: 6,
        levelName: "Zigzag",
        par: 4,
        ballStart: { x: 100, y: 500 },
        hole: { x: 700, y: 100 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 200, y: 450, width: 120, height: 20 },  // Zig 1
            { x: 400, y: 350, width: 120, height: 20 },  // Zag 1
            { x: 300, y: 250, width: 120, height: 20 },  // Zig 2
            { x: 500, y: 150, width: 120, height: 20 }   // Zag 2
        ],
        sandTraps: [
            { x: 250, y: 400, width: 80, height: 40 },   // Sand 1
            { x: 450, y: 200, width: 80, height: 40 }    // Sand 2
        ]
    },

    // Level 7 - Obstacle Course (Combination challenge)
    {
        levelNumber: 7,
        levelName: "Obstacle Course",
        par: 5,
        ballStart: { x: 100, y: 300 },
        hole: { x: 700, y: 300 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 250, y: 150, width: 20, height: 150 },  // Wall block 1
            { x: 350, y: 350, width: 20, height: 150 },  // Wall block 2
            { x: 500, y: 100, width: 20, height: 180 },  // Wall block 3
            { x: 600, y: 320, width: 20, height: 180 }   // Wall block 4
        ],
        sandTraps: [
            { x: 200, y: 320, width: 70, height: 70 },   // Bottom left sand
            { x: 380, y: 180, width: 80, height: 60 },   // Center sand
            { x: 530, y: 400, width: 90, height: 80 }    // Bottom right sand
        ]
    },

    // Level 8 - Sand Maze (Complex sand trap layout)
    {
        levelNumber: 8,
        levelName: "Sand Maze",
        par: 5,
        ballStart: { x: 100, y: 100 },
        hole: { x: 700, y: 500 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 300, y: 200, width: 20, height: 100 },  // Maze wall 1
            { x: 500, y: 150, width: 20, height: 120 },  // Maze wall 2
            { x: 400, y: 350, width: 120, height: 20 }   // Maze wall 3
        ],
        sandTraps: [
            { x: 180, y: 200, width: 100, height: 80 },  // Left sand block
            { x: 350, y: 120, width: 120, height: 70 },  // Top sand block
            { x: 450, y: 280, width: 100, height: 90 },  // Center sand block
            { x: 250, y: 400, width: 110, height: 70 },  // Lower left sand
            { x: 580, y: 200, width: 90, height: 100 },  // Right sand block
            { x: 600, y: 380, width: 80, height: 80 }    // Bottom right sand
        ]
    },

    // Level 9 - Wall Garden (Intricate wall patterns)
    {
        levelNumber: 9,
        levelName: "Wall Garden",
        par: 5,
        ballStart: { x: 100, y: 400 },
        hole: { x: 700, y: 200 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 200, y: 200, width: 20, height: 80 },   // Garden wall 1
            { x: 180, y: 300, width: 80, height: 20 },   // Garden wall 2
            { x: 300, y: 150, width: 20, height: 100 },  // Garden wall 3
            { x: 350, y: 280, width: 100, height: 20 },  // Garden wall 4
            { x: 480, y: 120, width: 20, height: 140 },  // Garden wall 5
            { x: 520, y: 300, width: 80, height: 20 },   // Garden wall 6
            { x: 600, y: 180, width: 20, height: 100 },  // Garden wall 7
            { x: 550, y: 380, width: 120, height: 20 }   // Garden wall 8
        ],
        sandTraps: [
            { x: 250, y: 350, width: 70, height: 60 },   // Central sand
            { x: 500, y: 200, width: 80, height: 70 }    // Right sand
        ]
    },

    // Level 10 - Mixed Challenge (Walls and sand combined)
    {
        levelNumber: 10,
        levelName: "Mixed Challenge",
        par: 6,
        ballStart: { x: 100, y: 300 },
        hole: { x: 700, y: 300 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 200, y: 150, width: 80, height: 20 },   // Upper barrier
            { x: 320, y: 200, width: 20, height: 120 },  // Vertical barrier 1
            { x: 400, y: 380, width: 100, height: 20 },  // Lower barrier
            { x: 550, y: 120, width: 20, height: 140 },  // Vertical barrier 2
            { x: 480, y: 450, width: 120, height: 20 }   // Bottom barrier
        ],
        sandTraps: [
            { x: 150, y: 200, width: 90, height: 70 },   // Left sand
            { x: 350, y: 120, width: 80, height: 60 },   // Top sand
            { x: 420, y: 300, width: 100, height: 70 },  // Center sand
            { x: 580, y: 350, width: 90, height: 80 },   // Right sand
            { x: 250, y: 450, width: 80, height: 60 }    // Bottom sand
        ]
    },

    // Level 11 - Precision Test (Small gaps and precise shots)
    {
        levelNumber: 11,
        levelName: "Precision Test",
        par: 4,
        ballStart: { x: 100, y: 300 },
        hole: { x: 700, y: 300 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 250, y: 180, width: 20, height: 80 },   // Precision wall 1 top
            { x: 250, y: 340, width: 20, height: 80 },   // Precision wall 1 bottom
            { x: 400, y: 160, width: 20, height: 100 },  // Precision wall 2 top
            { x: 400, y: 340, width: 20, height: 100 },  // Precision wall 2 bottom
            { x: 550, y: 180, width: 20, height: 80 },   // Precision wall 3 top
            { x: 550, y: 340, width: 20, height: 80 }    // Precision wall 3 bottom
        ],
        sandTraps: [
            { x: 200, y: 280, width: 40, height: 40 },   // Gap 1 sand
            { x: 430, y: 280, width: 40, height: 40 },   // Gap 2 sand
            { x: 580, y: 280, width: 40, height: 40 }    // Gap 3 sand
        ]
    },

    // Level 12 - Expert Trial (Complex multi-element design)
    {
        levelNumber: 12,
        levelName: "Expert Trial",
        par: 6,
        ballStart: { x: 100, y: 500 },
        hole: { x: 700, y: 100 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 200, y: 400, width: 150, height: 20 },  // Expert barrier 1
            { x: 300, y: 300, width: 20, height: 80 },   // Expert barrier 2
            { x: 450, y: 350, width: 100, height: 20 },  // Expert barrier 3
            { x: 500, y: 250, width: 20, height: 80 },   // Expert barrier 4
            { x: 350, y: 150, width: 120, height: 20 },  // Expert barrier 5
            { x: 600, y: 200, width: 20, height: 120 }   // Expert barrier 6
        ],
        sandTraps: [
            { x: 180, y: 320, width: 90, height: 70 },   // Entry sand
            { x: 370, y: 380, width: 70, height: 80 },   // Lower sand
            { x: 420, y: 200, width: 60, height: 80 },   // Mid sand
            { x: 530, y: 120, width: 80, height: 60 },   // Upper sand
            { x: 630, y: 350, width: 70, height: 90 }    // Exit sand
        ]
    },

    // Level 13 - Master Challenge (Maximum difficulty)
    {
        levelNumber: 13,
        levelName: "Master Challenge",
        par: 7,
        ballStart: { x: 100, y: 200 },
        hole: { x: 700, y: 400 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 180, y: 280, width: 80, height: 20 },   // Master wall 1
            { x: 220, y: 350, width: 20, height: 100 },  // Master wall 2
            { x: 320, y: 180, width: 20, height: 80 },   // Master wall 3
            { x: 380, y: 300, width: 90, height: 20 },   // Master wall 4
            { x: 450, y: 150, width: 20, height: 120 },  // Master wall 5
            { x: 500, y: 350, width: 80, height: 20 },   // Master wall 6
            { x: 550, y: 200, width: 20, height: 100 },  // Master wall 7
            { x: 600, y: 120, width: 70, height: 20 },   // Master wall 8
            { x: 480, y: 450, width: 120, height: 20 }   // Master wall 9
        ],
        sandTraps: [
            { x: 150, y: 320, width: 60, height: 80 },   // Entry sand
            { x: 280, y: 220, width: 70, height: 60 },   // Upper sand
            { x: 350, y: 380, width: 80, height: 70 },   // Lower sand
            { x: 480, y: 180, width: 60, height: 90 },   // Mid sand
            { x: 590, y: 320, width: 70, height: 90 },   // Right sand
            { x: 520, y: 400, width: 90, height: 50 }    // Exit sand
        ]
    },

    // Level 14 - Championship (Final test of all skills)
    {
        levelNumber: 14,
        levelName: "Championship",
        par: 8,
        ballStart: { x: 100, y: 300 },
        hole: { x: 700, y: 300 },
        walls: [
            { x: 50, y: 300, width: 20, height: 500 },   // Left boundary
            { x: 750, y: 300, width: 20, height: 500 },  // Right boundary
            { x: 400, y: 50, width: 700, height: 20 },   // Top boundary
            { x: 400, y: 550, width: 700, height: 20 },  // Bottom boundary
            { x: 180, y: 150, width: 60, height: 20 },   // Championship wall 1
            { x: 200, y: 220, width: 20, height: 60 },   // Championship wall 2
            { x: 280, y: 380, width: 80, height: 20 },   // Championship wall 3
            { x: 320, y: 180, width: 20, height: 100 },  // Championship wall 4
            { x: 400, y: 120, width: 70, height: 20 },   // Championship wall 5
            { x: 450, y: 300, width: 20, height: 80 },   // Championship wall 6
            { x: 500, y: 200, width: 60, height: 20 },   // Championship wall 7
            { x: 580, y: 150, width: 20, height: 120 },  // Championship wall 8
            { x: 550, y: 350, width: 80, height: 20 },   // Championship wall 9
            { x: 480, y: 450, width: 100, height: 20 },  // Championship wall 10
            { x: 350, y: 480, width: 20, height: 60 }    // Championship wall 11
        ],
        sandTraps: [
            { x: 150, y: 250, width: 70, height: 60 },   // Entry sand complex
            { x: 240, y: 320, width: 60, height: 50 },   // Lower left sand
            { x: 350, y: 120, width: 80, height: 50 },   // Upper sand
            { x: 380, y: 280, width: 50, height: 70 },   // Central sand
            { x: 480, y: 160, width: 70, height: 60 },   // Upper right sand
            { x: 520, y: 380, width: 80, height: 60 },   // Lower right sand
            { x: 420, y: 400, width: 50, height: 70 },   // Bottom sand
            { x: 630, y: 250, width: 60, height: 80 }    // Exit sand complex
        ]
    }
];

// Export individual level getter for convenience
export function getLevel(levelNumber) {
    return levels.find(level => level.levelNumber === levelNumber);
}

// Export level count for UI components
export function getLevelCount() {
    return levels.length;
}

// Validate level data structure
export function validateLevel(levelData) {
    const requiredProps = ['levelNumber', 'levelName', 'par', 'ballStart', 'hole', 'walls', 'sandTraps'];
    
    for (const prop of requiredProps) {
        if (!(prop in levelData)) {
            console.error(`Level validation failed: missing property '${prop}'`);
            return false;
        }
    }
    
    // Validate ballStart and hole have x, y coordinates
    if (!levelData.ballStart.x || !levelData.ballStart.y) {
        console.error('Level validation failed: ballStart must have x, y coordinates');
        return false;
    }
    
    if (!levelData.hole.x || !levelData.hole.y) {
        console.error('Level validation failed: hole must have x, y coordinates');
        return false;
    }
    
    return true;
}