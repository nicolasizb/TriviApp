const data = JSON.parse(localStorage.getItem('exam'));

let i = 0;

function renderObj() {
    const obj = data[i];
    const section = document.getElementById('dnx');
    const randomAnswers = [];
    
    function test() {
        obj.incorrectAnswers.map(answer => {
            const answerRes = `<button class="if--fa" ><p>${answer}</p></button>`
            randomAnswers.push(answerRes);
        }).join("");
        randomAnswers.push(`<button class="if--tr" ><p>${obj.correctAnswer}</p></button>`);
    }
    test();

    const randomNumbers = [];   
    function generateRandomNumbers() {
        let min = 0;
        let max = 4

        while(randomNumbers.length < 4) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            if(!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber)
            }
        }
    }
    generateRandomNumbers();

    const card = `
        <div class="ctr-cc">                
            <span>${i + 1}</span>
        </div>
        <h2>${obj.question.text}</h2>
        ${randomNumbers.map(number => {
            let tag = randomAnswers[number];

            console.log(tag)
        })}
    `

    section.innerHTML = card;

    const incorrectAnswer = document.getElementsByClassName('if--fa');
    for (let buttonFalse of incorrectAnswer) {
        buttonFalse.onclick = () => {
            console.log('It is incorrect answer');
        };
    }

    const correctAnswer = document.getElementsByClassName('if--tr');

    console.log(correctAnswer)
    for (let buttonFalse of correctAnswer) {
        buttonFalse.onclick = () => {
            console.log('It is correct answer');
        };
    }
};

renderObj()

