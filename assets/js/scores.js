function printHighscores() {  
    //getting scores from localstorage or set to empty array  
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // sorting highscores   
    highscores.sort(function(a, b) {    
        return b.finalScore - a.finalScore;  
    });
    
    highscores.forEach(function(finalScore) {    
        // create li tag for each high score    
        var newList = document.createElement("li");    
        newList.textContent = finalScore.initials + " - " + finalScore.finalScore;
      // display on page    
      var orderedList = document.getElementById("highscores");    
      orderedList.appendChild(newList);  
    });
    }

  function resetScores() {  
    window.localStorage.removeItem("highscores");  
  window.location.reload();
}
  document.getElementById("clear").onclick = resetScores;
  // run function when page loads
  printHighscores();