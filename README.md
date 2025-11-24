# Tower of Hanoi Visualization

An interactive, beautifully animated Tower of Hanoi puzzle visualization built with JavaScript, TypeScript, and Tailwind CSS.

## Features

- **Beautiful UI**: Gradient backgrounds, smooth animations, and glassmorphism effects
- **Auto-Solve Algorithm**: Watch the recursive algorithm solve the puzzle step-by-step
- **Customizable**: Adjust the number of disks (3-8) and animation speed
- **Interactive Controls**: Start, stop, and reset the visualization
- **Real-time Statistics**: Track moves and compare with optimal solution
- **Celebration Animation**: Confetti effect when puzzle is solved optimally
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### How to Run

There are several ways to run this project:

**Method 1: Double-click (Simplest)**
- Simply double-click the `index.html` file
- It will open in your default web browser

**Method 2: Command Line (Windows)**
```powershell
cd d:\Work\TOH
Start-Process "index.html"
```

**Method 3: Command Line (Mac/Linux)**
```bash
cd /path/to/TOH
open index.html    # Mac
xdg-open index.html  # Linux
```

**Method 4: Using a Local Server (Recommended for development)**
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

### Using the Application

1. Open `index.html` in your web browser
2. Adjust the number of disks using the slider
3. Click "Auto Solve" to watch the algorithm in action
4. Use "Reset" to start over or "Stop" to pause

## How to Use

- **Number of Disks**: Choose between 3 and 8 disks
- **Animation Speed**: Control how fast the disks move (100ms - 1000ms)
- **Auto Solve**: Automatically solves the puzzle using the optimal algorithm
- **Reset**: Resets the puzzle to the starting position
- **Stop**: Stops the current solving process

## The Rules

1. Only one disk can be moved at a time
2. Each move consists of taking the top disk from one stack and placing it on another stack
3. No disk may be placed on top of a smaller disk

## Algorithm

The visualization uses the classic recursive algorithm:

```
function solve(n, source, destination, auxiliary):
    if n == 1:
        move disk from source to destination
    else:
        solve(n-1, source, auxiliary, destination)
        move disk from source to destination
        solve(n-1, auxiliary, destination, source)
```

The minimum number of moves required is **2^n - 1**, where n is the number of disks.

## Technologies Used

- **HTML5**: Structure and layout
- **JavaScript (ES6+)**: Game logic and animations
- **TypeScript**: Type definitions and interfaces
- **Tailwind CSS**: Styling and responsive design
- **CSS3**: Custom animations and transitions

## Stats Tracking

- **Moves**: Current number of moves made
- **Minimum Moves**: Optimal solution for the current number of disks
- **Status**: Current state of the game (Ready, Solving, Completed, Stopped)

## Project Structure

```
TOH/
├── index.html      # Main HTML file with UI
├── main.js         # JavaScript game logic
├── types.ts        # TypeScript type definitions
└── README.md       # This file
```

## Features Showcase

### Visual Effects
- Gradient backgrounds with blur effects
- Smooth disk animations
- Hover effects on interactive elements
- Pulsing animation during solving
- Confetti celebration on completion

### Code Quality
- Clean, modular JavaScript code
- Comprehensive TypeScript definitions
- Well-commented and documented
- Async/await for smooth animations

## Customization

You can customize the appearance by modifying:
- Disk colors in the `diskColors` array
- Tower colors in the `towerColors` array
- Animation speed range
- Number of disks range

## License

Free to use for educational and personal projects.

---

**Enjoy solving the Tower of Hanoi!**
