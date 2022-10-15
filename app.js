document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'burger',
            img: 'images/burger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'burger',
            img: 'images/burger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ]; 

    cardArray.sort(() => 0.5 - Math.random()); 

    const gridDisplay = document.querySelector('#grid');
    let  cardMatchName = [];
    let  cardMatchID = []; 
    const cardsWon = [];
    let lives = parseFloat(document.getElementById("lives").innerText); 
    let score = parseFloat(document.getElementById("score").innerText);
    
    let freezeClick = false;
    document.addEventListener('click', freezeClickfn, true);
    function freezeClickfn(e) {
        if (freezeClick == true) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    function disableClick() {
        freezeClick = true;
        setTimeout(() => {
          freezeClick = false;
        }, 750);
    }

    function createBoard() {
        for (let i = 0; i < 12; i++) {
            let cardUnchosen = document.createElement('img');
            cardUnchosen.setAttribute('src', 'images/blank.png');
            cardUnchosen.setAttribute('data-id', i);
            cardUnchosen.addEventListener('click', flipCard);
            gridDisplay.append(cardUnchosen);

            if (lives == 0) {
                alert(`Game over! You Lose! You are a loser!`);
                cardUnchosen.removeEventListener('click');
            }
        }
    }

    // check for matches
    function checkMatch() {
        const cards = document.querySelectorAll('img');
        const chosenOne = cardMatchID[0];
        const chosenTwo = cardMatchID[1];

        if (chosenOne == chosenTwo) {
            alert('Choose two different onions');
            cards[chosenOne].setAttribute('src', 'images/blank.png');
            cards[chosenTwo].setAttribute('src', 'images/blank.png');
        }
        
        else if (cardMatchName[0] == cardMatchName[1]) {
            alert('Match found!')
            cards[chosenOne].setAttribute('src', 'images/white.png');
            cards[chosenTwo].setAttribute('src', 'images/white.png');
            cards[chosenOne].removeEventListener('click', flipCard);
            cards[chosenTwo].removeEventListener('click', flipCard);
            cardsWon.push(cardMatchName);
            document.getElementById('score').innerText++;
            score = parseFloat(document.getElementById('score').innerText);
            // check for new round
            if (cardsWon.length % 6 == 0) {
                score += parseFloat(lives);
                document.getElementById('score').innerText = score;
                document.getElementById('round').innerText++;
                const newRound = document.querySelectorAll('img');
                for (let i = 0; i < newRound.length; i++) {
                    newRound[i].remove();
                    }
                cardArray.sort(() => 0.5 - Math.random()); 
                createBoard();
                alert(`New Round! Life amount of ${lives} was added to your score. You also earned an extra life!`);
                parseFloat(document.getElementById("lives").innerText++);
                }
            console.log(`Score = ${score}`);
            }
        else {
            cards[chosenOne].setAttribute('src', 'images/blank.png');
            cards[chosenTwo].setAttribute('src', 'images/blank.png');
            document.getElementById('lives').innerText--;
            lives = document.getElementById('lives').innerText;
            console.log(lives);
            if (lives == 0) {
                document.getElementById('final').innerText = 'Final '; 
                alert(`Final Score: ${score}`)
            }
        }
        cardMatchName = [];
        cardMatchID = [];
        
    }

    function flipCard(e) {
        if (lives >= 1) {
            let cardID = this.getAttribute('data-id');
            cardMatchName.push(cardArray[cardID].name);
            cardMatchID.push(cardID);
            this.setAttribute('src', cardArray[cardID].img);
            if (cardMatchName.length === 2 && cardMatchID[0] == cardMatchID[1]) {
                setTimeout( checkMatch, 0 )
            }
            else if (cardMatchName.length == 2) {
                disableClick();
                setTimeout( checkMatch, 750 ); 
            }
            else if (lives == 0) {
                alert(`Game over! You Lose! You are a loser!`);
                cardUnchosen.removeEventListener('click');
            }
        }
    }

    createBoard(); 

})
