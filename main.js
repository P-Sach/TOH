// Tower of Hanoi Visualization
class TowerOfHanoi {
    constructor() {
        this.towers = [[], [], []];
        this.moveCount = 0;
        this.animationSpeed = 500;
        this.isRunning = false;
        this.shouldStop = false;
        this.diskCount = 4;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDiskCount(this.diskCount);
    }

    setupEventListeners() {
        const diskCountSlider = document.getElementById('diskCount');
        const speedSlider = document.getElementById('speed');
        const solveBtn = document.getElementById('solveBtn');
        const resetBtn = document.getElementById('resetBtn');
        const stopBtn = document.getElementById('stopBtn');

        diskCountSlider.addEventListener('input', (e) => {
            const count = parseInt(e.target.value);
            document.getElementById('diskCountDisplay').textContent = count;
            if (!this.isRunning) {
                this.updateDiskCount(count);
            }
        });

        speedSlider.addEventListener('input', (e) => {
            this.animationSpeed = parseInt(e.target.value);
            document.getElementById('speedDisplay').textContent = `${this.animationSpeed}ms`;
        });

        solveBtn.addEventListener('click', () => this.autoSolve());
        resetBtn.addEventListener('click', () => this.reset());
        stopBtn.addEventListener('click', () => this.stop());
    }

    updateDiskCount(count) {
        this.diskCount = count;
        this.reset();
        const minMoves = Math.pow(2, count) - 1;
        document.getElementById('minMoves').textContent = minMoves;
    }

    reset() {
        this.shouldStop = true;
        setTimeout(() => {
            this.towers = [[], [], []];
            this.moveCount = 0;
            this.isRunning = false;
            this.shouldStop = false;
            
            // Initialize disks on first tower
            for (let i = this.diskCount; i >= 1; i--) {
                this.towers[0].push(i);
            }
            
            this.updateDisplay();
            this.updateMoveCount();
            this.updateStatus('Ready');
        }, 100);
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
        this.updateStatus('Stopped');
    }

    updateDisplay() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        const towerColors = [
            'from-gray-400 to-gray-500',
            'from-gray-500 to-gray-600',
            'from-gray-600 to-gray-700'
        ];

        const towerNames = ['Source', 'Auxiliary', 'Destination'];

        for (let i = 0; i < 3; i++) {
            const towerContainer = document.createElement('div');
            towerContainer.className = 'flex-1 flex flex-col items-center justify-end relative tower';
            
            // Tower name
            const nameLabel = document.createElement('div');
            nameLabel.className = 'absolute -top-8 text-white font-bold text-lg';
            nameLabel.textContent = towerNames[i];
            towerContainer.appendChild(nameLabel);

            // Tower pole
            const pole = document.createElement('div');
            pole.className = `w-3 h-72 bg-gradient-to-b ${towerColors[i]} rounded-t-lg shadow-lg`;
            towerContainer.appendChild(pole);

            // Tower base
            const base = document.createElement('div');
            base.className = 'w-48 h-4 bg-gray-700 rounded-lg shadow-xl mt-1';
            towerContainer.appendChild(base);

            // Disks container
            const disksContainer = document.createElement('div');
            disksContainer.className = 'absolute bottom-5 flex flex-col-reverse items-center';
            disksContainer.style.zIndex = '10';

            // Add disks
            const diskColors = [
                'bg-gradient-to-r from-gray-300 to-gray-400',
                'bg-gradient-to-r from-gray-400 to-gray-500',
                'bg-gradient-to-r from-gray-500 to-gray-600',
                'bg-gradient-to-r from-gray-600 to-gray-700',
                'bg-gradient-to-r from-gray-700 to-gray-800',
                'bg-gradient-to-r from-gray-800 to-gray-900',
                'bg-gradient-to-r from-white to-gray-300',
                'bg-gradient-to-r from-black to-gray-800'
            ];

            this.towers[i].forEach((diskSize, index) => {
                const disk = document.createElement('div');
                const width = 30 + diskSize * 20;
                disk.className = `disk ${diskColors[diskSize - 1]} rounded-lg shadow-2xl border-2 border-gray-800`;
                disk.style.width = `${width}px`;
                disk.style.height = '30px';
                disk.style.marginBottom = '2px';
                
                // Add disk number
                const diskLabel = document.createElement('div');
                diskLabel.className = 'text-black font-bold text-sm flex items-center justify-center h-full';
                diskLabel.textContent = diskSize;
                disk.appendChild(diskLabel);
                
                disksContainer.appendChild(disk);
            });

            towerContainer.appendChild(disksContainer);
            gameBoard.appendChild(towerContainer);
        }
    }

    updateMoveCount() {
        document.getElementById('moveCount').textContent = this.moveCount;
    }

    updateStatus(status) {
        const statusElement = document.getElementById('status');
        statusElement.textContent = status;
        
        if (status === 'Solving...') {
            statusElement.parentElement.classList.add('solving');
        } else {
            statusElement.parentElement.classList.remove('solving');
        }
    }

    async moveDisk(from, to) {
        if (this.shouldStop) return false;

        const disk = this.towers[from].pop();
        this.towers[to].push(disk);
        this.moveCount++;
        
        this.updateDisplay();
        this.updateMoveCount();
        
        await this.sleep(this.animationSpeed);
        return true;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async solve(n, from, to, aux) {
        if (this.shouldStop) return false;
        
        if (n === 1) {
            return await this.moveDisk(from, to);
        }
        
        if (!await this.solve(n - 1, from, aux, to)) return false;
        if (!await this.moveDisk(from, to)) return false;
        if (!await this.solve(n - 1, aux, to, from)) return false;
        
        return true;
    }

    async autoSolve() {
        if (this.isRunning) {
            alert('Already solving! Click Stop to cancel.');
            return;
        }

        this.reset();
        await this.sleep(300);
        
        this.isRunning = true;
        this.shouldStop = false;
        this.updateStatus('Solving...');

        const success = await this.solve(this.diskCount, 0, 2, 1);
        
        this.isRunning = false;
        
        if (success && !this.shouldStop) {
            this.updateStatus('Completed!');
        } else if (this.shouldStop) {
            this.updateStatus('Stopped');
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TowerOfHanoi();
});
