# Implementation Plan

- [x] 1. Set up project structure and dependencies



  - Create backend directory with Express.js setup
  - Create frontend directory with React setup
  - Install required dependencies (express, cors, uuid for backend; react, axios for frontend)
  - Configure TypeScript for both backend and frontend
  - _Requirements: All requirements depend on proper project structure_

- [x] 2. Implement core data models and types




  - [x] 2.1 Create TypeScript interfaces for GameState, Board, Player, Move, Position

    - Define all type definitions in a shared types file
    - Include Cell type, GameMode type, and ScoredMove interface
    - _Requirements: 1.5, 6.2, 8.2_
  
  - [x] 2.2 Create utility functions for board operations


    - Implement board initialization (6x6 grid of zeros)
    - Implement deep copy function for board state





    - Implement coordinate validation (bounds checking)
    - _Requirements: 1.1, 4.1_

- [x] 3. Implement Game Engine core logic


  - [ ] 3.1 Create move validation logic
    - Implement first move validation (any empty cell for first two moves)
    - Implement adjacency checking for subsequent moves
    - Implement empty cell validation


    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ] 3.2 Implement tile capture mechanics
    - Create function to get adjacent cells (up, down, left, right only)


    - Implement capture logic that converts adjacent opponent tiles
    - Update board state with all captures applied
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [ ] 3.3 Implement move execution
    - Combine validation, placement, and capture into executeMove function
    - Update move history with move details and capture count
    - Switch current player after successful move
    - _Requirements: 2.1, 3.3, 4.1, 8.1_





  
  - [ ] 3.4 Implement win detection logic
    - Check if board is full (all 36 cells filled)
    - Count tiles for each player


    - Determine winner or draw based on tile counts
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [ ]* 3.5 Write unit tests for Game Engine
    - Test move validation with various board states
    - Test capture mechanics with different configurations
    - Test win detection scenarios
    - Test edge cases (corners, edges, full board)





    - _Requirements: 2.1, 2.2, 2.3, 3.1, 7.1_

- [x] 4. Implement State Manager


  - [ ] 4.1 Create in-memory state storage
    - Implement Map-based storage for game states
    - Create unique ID generation using uuid
    - Implement CRUD operations (create, read, update, delete)


    - _Requirements: 1.5, 6.1, 6.2_
  
  - [ ] 4.2 Implement game initialization
    - Create initializeGame function that sets up new game state
    - Support both PvP and PvAI modes
    - Initialize Red as starting player
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ]* 4.3 Write unit tests for State Manager
    - Test game creation and ID generation





    - Test state retrieval and updates
    - Test move history tracking
    - _Requirements: 6.1, 6.2, 6.3_



- [ ] 5. Implement AI Engine
  - [ ] 5.1 Create legal move identification
    - Implement function to find all empty cells adjacent to AI tiles
    - Handle special case for AI's first move (any empty cell)

    - _Requirements: 5.1_

  
  - [ ] 5.2 Implement move scoring system
    - Calculate capture score (+10 per captured tile)
    - Calculate block score (+5 for blocking opponent)
    - Calculate expansion score (+1 for new territory)

    - _Requirements: 5.2, 5.3, 5.4_

  
  - [ ] 5.3 Implement move selection logic
    - Evaluate all legal moves with scoring system
    - Select move with highest score
    - Handle tie-breaking with random selection


    - Return selected move coordinates
    - _Requirements: 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 5.4 Write unit tests for AI Engine
    - Test legal move identification
    - Test move scoring with various board states
    - Test strategy prioritization (capture > block > expand)
    - Test edge cases (no legal moves, single option)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_






- [ ] 6. Implement REST API endpoints
  - [ ] 6.1 Create POST /game/start endpoint
    - Accept game mode in request body
    - Initialize new game using State Manager


    - Return complete game state with ID
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ] 6.2 Create GET /game/state/:id endpoint
    - Retrieve game state by ID from State Manager
    - Return 404 if game not found


    - Return complete game state including move history
    - _Requirements: 6.2, 6.3, 6.4_
  
  - [x] 6.3 Create POST /game/move endpoint

    - Validate request body (gameId, player, row, col)

    - Retrieve game state and validate move
    - Execute move using Game Engine
    - Check for winner after move

    - Update state and return new game state

    - _Requirements: 2.1, 2.2, 2.3, 3.1, 4.1, 7.1_
  
  - [x] 6.4 Create POST /ai/move endpoint

    - Retrieve game state by ID

    - Calculate AI move using AI Engine
    - Execute AI move using Game Engine
    - Check for winner after move
    - Update state and return move coordinates

    - _Requirements: 4.2, 5.1, 5.2, 5.3, 5.4, 5.5_

  
  - [ ] 6.5 Implement error handling middleware
    - Handle invalid move errors (400)
    - Handle game not found errors (404)
    - Handle game already ended errors (409)
    - Return consistent error response format
    - _Requirements: 2.2, 2.3, 4.4_

  

  - [ ]* 6.6 Write integration tests for API endpoints
    - Test complete game flow (start, moves, winner)
    - Test PvP and PvAI modes
    - Test error scenarios
    - _Requirements: 1.1, 2.1, 4.1, 5.1_


- [ ] 7. Implement frontend components
  - [ ] 7.1 Create Menu component
    - Display game title

    - Create buttons for PvP and PvAI mode selection

    - Handle navigation to game board
    - Call /game/start API on mode selection
    - _Requirements: 10.5_
  
  - [x] 7.2 Create BoardGrid component

    - Render 6x6 grid of cells
    - Display cell states (empty, Red, Green) with visual distinction
    - Handle cell click events for move placement
    - Disable clicks when game is over or not player's turn




    - Call /game/move API on valid cell click

    - _Requirements: 10.1, 2.1_
  
  - [ ] 7.3 Create TurnIndicator component
    - Display current player's turn

    - Show game status (in progress, winner, draw)
    - Update display based on game state
    - _Requirements: 4.3, 10.2, 10.4_
  
  - [x] 7.4 Create MoveList component

    - Display move history in chronological order
    - Show player color, row, and column for each move
    - Auto-scroll to latest move
    - _Requirements: 8.3, 10.3_
  
  - [ ] 7.5 Create RestartButton component
    - Display restart button
    - Call /game/start API with same mode on click
    - Reset local state and re-render board
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ] 7.6 Implement Game Board page
    - Compose BoardGrid, TurnIndicator, MoveList, and RestartButton
    - Manage game state in React state
    - Poll or fetch game state updates
    - Handle AI turn triggering in PvAI mode
    - _Requirements: 4.2, 10.1, 10.2, 10.3_
  
  - [ ] 7.7 Implement routing and navigation
    - Set up React Router for menu and game pages
    - Implement navigation between pages
    - Pass game mode and ID through routes
    - _Requirements: 10.5_
  
  - [ ]* 7.8 Write component tests for frontend
    - Test user interactions (clicks, navigation)
    - Test component rendering with different game states
    - Test API integration
    - _Requirements: 10.1, 10.2, 10.3_

- [ ] 8. Implement AI turn automation in frontend
  - [ ] 8.1 Create AI turn handler
    - Detect when current player is AI
    - Automatically call /ai/move API
    - Apply AI move to board
    - Update game state after AI move
    - _Requirements: 4.2, 5.5_
  
  - [ ] 8.2 Add loading state for AI moves
    - Show loading indicator during AI calculation
    - Disable user interaction during AI turn
    - _Requirements: 4.2_

- [ ] 9. Implement game restart functionality
  - [ ] 9.1 Add restart logic to backend
    - Reuse game initialization logic
    - Maintain same game mode
    - Generate new game ID or reset existing state
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ] 9.2 Connect restart button to backend
    - Call restart endpoint or create new game
    - Update frontend state with fresh game
    - Reset move history display
    - _Requirements: 9.1, 9.2, 9.3_

- [ ] 10. Final integration and polish
  - [ ] 10.1 Connect all components and test complete flows
    - Test PvP game from start to finish
    - Test PvAI game with AI making moves
    - Test restart functionality
    - Verify move history accuracy
    - _Requirements: All requirements_
  
  - [ ] 10.2 Add error handling to frontend
    - Display error messages for invalid moves
    - Handle network errors gracefully
    - Show appropriate feedback to user
    - _Requirements: 2.2, 2.3_
  
  - [ ] 10.3 Implement basic styling
    - Style board grid with clear cell distinction
    - Style turn indicator and game status
    - Style move list for readability
    - Add responsive layout
    - _Requirements: 10.1, 10.2, 10.3_
  
  - [ ]* 10.4 Run end-to-end tests
    - Complete PvP game playthrough
    - Complete PvAI game playthrough
    - Test all error scenarios
    - Verify win detection and display
    - _Requirements: All requirements_
