

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
        console.log("Skip because player detected ttwo times")
        return []
    }
  
    for (let i = levels.length - 1; i >= 0; i--) {
        if(levels.length === 1) break
        let level = levels[i];
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
    if(moves[moves.length - 1] !== moves[moves.length - 2]) moves.push(moves[moves.length - 1])

    //if all same add one more
    //if(new Set((moves)).size === 1) moves.push(moves[moves.length - 1]);
    

    return moves 
}

export default bestMovesForLevel