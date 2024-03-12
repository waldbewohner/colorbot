
import fs from 'fs';
const path = './moves.txt'; // Specify the path to your file

function appendMovesToFile(moves) {
  // Convert array to a comma-separated string without adding a comma at the end
  const movesString = moves.join(',') + ','; // Add a comma after each move
  fs.appendFile(path, movesString, (err) => {
      if (err) {
          console.error('Failed to append moves to file:', err);
      } else {
          console.log('Moves appended to file successfully.');
      }
  });
}

function bestMovesForLevel(levelArray) {
    let levels = levelArray
    console.log(levels)
    let moves = [];
    let playerPosition = levels[levels.length - 1][0] === 2 ? 0 : 1; 

    if(levels[levels.length - 1][0] !== 2 && levels[levels.length - 1][1] !== 2 ) {
        console.log("Skip because player not dettected")
        return []
    }

    if(levels[levels.length - 1][0] === 2 && levels[levels.length - 1][1] === 2 ) {
        console.log("Skip because player detected two times")
        return []
    }
  
    for (let i = levels.length - 1; i >= 0; i--) {
        if(levels.length === 1) break
        let nextLevel = levels[i - 1];
        let click = ""
      if(nextLevel && nextLevel[playerPosition] === 0) {
        if(playerPosition === 0) {
          click = "left"
          nextLevel = [2,0]
          playerPosition = 0;
        } else {
          click = "right"
          nextLevel = [0,2]
          playerPosition = 1;
        }
      } else {
        if(playerPosition === 0) {
          click = "right"
          nextLevel = [0,2]
          playerPosition = 1;
        } else {
          click = "left"
          nextLevel = [2,0]
          playerPosition = 0;
        }
      }
      
      levels[i - 1] = nextLevel
      levels.pop()
      moves.push(click)
        
    }
    //if we have to change direction in the last turn we are sure to double click
    //if(moves[moves.length - 1] !== moves[moves.length - 2]) moves.push(moves[moves.length - 1])

    //appendMovesToFile(moves);

    return moves 
}

export default bestMovesForLevel