const data = JSON.parse(localStorage.getItem('exam'));

let positionObj = 0;
let answersTrue = 0;
let answersFalse = 0;

document.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (clickedElement.id === 'back-home' || clickedElement.closest('#back-home')) {
        event.preventDefault();
        window.location.href = '../../../index.html';
    }
});

function renderObj(position) {
    if(positionObj <= data.length - 1) {
        const obj = data[position];
        const section = document.getElementById('dnx');
    
        const randomAnswers = [];
    
        function generateRandomAnswers() {
            const answers = [...obj.incorrectAnswers, obj.correctAnswer];
            const shuffledAnswers = shuffleArray(answers);
            
            shuffledAnswers.forEach(answer => {
                const answerRes = `<button class="answer-button"><p>${answer}</p></button>`;
                randomAnswers.push(answerRes);
            });
        }
    
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    
        generateRandomAnswers();
    
        const card = `
            <div class="ctr-cc">                
                <span>${position + 1}</span>
            </div>
            <h2>${obj.question.text}</h2>
            ${randomAnswers.join('')}
        `;
    
        section.innerHTML = card;
    
        const answerButtons = document.querySelectorAll('.answer-button');
    
        let attempts = 1; 
    
        function execute() {
            answerButtons.forEach(button => {
                if(attempts <= 1) {
                    button.disabled =  true;
                } else {
                    button.disabled =  false;
                }
            })
            attempts--;
        }
    
        answerButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedAnswer = button.querySelector('p').textContent;
                
                if (selectedAnswer === obj.correctAnswer) {
                    answersTrue++;
                    execute();
    
                    setTimeout(() => {
                        const pop = `<div class="pop tru"><span></span></div>`
                        section.innerHTML = pop;
                    }, 0)
    
                    setTimeout(() => {
                        const load = `<span class="ico--ld"></span>`;
                        section.innerHTML = load;
                    }, 2000)
    
                    setTimeout(() => {
                        nextQuestion();
                    }, 3000)          
                } else {
                    answersFalse++;
                    execute();
    
                    setTimeout(() => {
                        const pop = `<div class="pop err"><span></span></div>`
                        section.innerHTML = pop;
                    }, 0)
    
                    setTimeout(() => {
                        const load = `<span class="ico--ld"></span>`;
                        section.innerHTML = load;
                    }, 2000)
    
                    setTimeout(() => {
                        nextQuestion();
                    }, 3000)  
                }
            });
        });
    } else {
        const section = document.getElementById('dnx');
        section.innerHTML = ""    

        const message = toValidAnswers();

        const divFinished = `
            <div class="qz--fin" >
                <h3>End of the quiz</h3>
                <p class="score" >Your score is: ${answersTrue} / ${data.length}</p>
                <p class="ans--inc" >Incorrect: ${answersFalse}</p>               
                <p class="msg" >${message}</p>    
                <button id="back-home" >Back home</button>           
            </div>
        `

        section.innerHTML = divFinished;
    }
}

function nextQuestion () {
    positionObj++
    renderObj(positionObj);
}

function toValidAnswers() {
    if(answersTrue <= data.length) {
        if(answersTrue >= Math.floor(data.length * 0.80)) {
            const message = 'Pretty good'; 
            return message;
        } else if(answersTrue >= 6 && Math.floor(data.length * 0.50)) {
            const message = 'Could you do it better'; 
            return message;
        } else {
            const message = 'Not very good'; 
            return message;
        }
    } else {
        console.error('Out of reach')
    }
}

renderObj(positionObj);
