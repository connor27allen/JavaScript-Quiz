var theHighscoresOutput = document.querySelector('.output-highscores');

function theOutputHighscores() {
    var theRawData = localStorage.getItem('highScores');
    var highScores = JSON.parse(theRawData);

    for (var i = 0; i < highScores.length; i++) {
        var div = document.createElement('div');
        var h3 = document.createElement('h3');
        var p = document.createElement('p');

        var scoreObject = highScores[i];

        h3.innerText = scoreObject.initials;
        p.innerText = scoreObject.score;
        div.append(h3, p);
        theHighscoresOutput.append(div);
    }
}

theOutputHighscores();