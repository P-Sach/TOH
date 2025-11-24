/**
 * TypeScript type definitions for Tower of Hanoi
 */

/**
 * Represents a single tower (stack of disks)
 * Each number represents the size of a disk
 */
type Tower = number[];

/**
 * Represents all three towers in the game
 */
type TowerSet = [Tower, Tower, Tower];

/**
 * Tower index (0, 1, or 2)
 */
type TowerIndex = 0 | 1 | 2;

/**
 * Game status
 */
type GameStatus = 'Ready' | 'Solving...' | '✅ Completed!' | 'Stopped';

/**
 * Configuration for the Tower of Hanoi game
 */
interface TowerConfig {
    diskCount: number;
    animationSpeed: number;
}

/**
 * Represents a single move in the game
 */
interface Move {
    from: TowerIndex;
    to: TowerIndex;
    diskSize: number;
    timestamp: number;
}

/**
 * Game state interface
 */
interface GameState {
    towers: TowerSet;
    moveCount: number;
    isRunning: boolean;
    shouldStop: boolean;
    diskCount: number;
    animationSpeed: number;
    moves: Move[];
}

/**
 * Main Tower of Hanoi class interface
 */
interface ITowerOfHanoi {
    towers: TowerSet;
    moveCount: number;
    animationSpeed: number;
    isRunning: boolean;
    shouldStop: boolean;
    diskCount: number;

    /**
     * Initialize the game
     */
    init(): void;

    /**
     * Set up event listeners
     */
    setupEventListeners(): void;

    /**
     * Update the number of disks
     */
    updateDiskCount(count: number): void;

    /**
     * Reset the game to initial state
     */
    reset(): void;

    /**
     * Stop the current solving process
     */
    stop(): void;

    /**
     * Update the visual display
     */
    updateDisplay(): void;

    /**
     * Update the move counter display
     */
    updateMoveCount(): void;

    /**
     * Update the status message
     */
    updateStatus(status: GameStatus): void;

    /**
     * Move a disk from one tower to another
     */
    moveDisk(from: TowerIndex, to: TowerIndex): Promise<boolean>;

    /**
     * Recursive algorithm to solve Tower of Hanoi
     */
    solve(n: number, from: TowerIndex, to: TowerIndex, aux: TowerIndex): Promise<boolean>;

    /**
     * Start the auto-solve process
     */
    autoSolve(): Promise<void>;

    /**
     * Celebration animation
     */
    celebrate(): void;
}

/**
 * Animation configuration
 */
interface AnimationConfig {
    duration: number;
    easing: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

/**
 * Disk visual properties
 */
interface DiskProperties {
    size: number;
    color: string;
    width: number;
    height: number;
}

/**
 * Tower visual properties
 */
interface TowerProperties {
    index: TowerIndex;
    name: 'Source' | 'Auxiliary' | 'Destination';
    color: string;
    position: number;
}

// Export types for use in other modules
export type {
    Tower,
    TowerSet,
    TowerIndex,
    GameStatus,
    TowerConfig,
    Move,
    GameState,
    ITowerOfHanoi,
    AnimationConfig,
    DiskProperties,
    TowerProperties
};
