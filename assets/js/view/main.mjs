import { getData } from "../controllers/controllers.js";

document.getElementById('btn-opt').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        const div = document.getElementById('dnx');

        const load = `<span class="ico--ld"></span>`;

        div.innerHTML = load;

        const difficulties = [];
        const categories = [];
        const types = [];

        const data = await getData();

        console.log(data);

        data.forEach(element => {
            if (element.difficulty) {
                if (!difficulties.includes(element.difficulty)) {
                    difficulties.push(element.difficulty);
                }
            }
            if (element.category) {
                if (!categories.includes(element.category)) {
                    categories.push(element.category);
                }
            }
            if (element.type) {
                if (!types.includes(element.type)) {
                    types.push(element.type);
                }
            }
        });

        const form = `
            <label for="dif" >Difficulty:</label>
            <select name="difficulty" id="dif" >
            </select>

            <label for="ctg" >Category:</label>
            <select name="category" id="ctg" >
            </select>

            <label for="typ" >Type:</label>
            <select name="type" id="typ" >
            </select>

            <button id="btn-sta" >Create<span></span></button>
            `;

        div.innerHTML = form;

        function setOptions() {
            const ctrDif = document.getElementById('dif');
            const ctrCtg = document.getElementById('ctg');
            const ctrTyp = document.getElementById('typ');

            difficulties.forEach(difficulty => {
                const option =  document.createElement('option');
                option.value = difficulty;
                option.text = difficulty;
                ctrDif.appendChild(option);
            })

            categories.forEach(category => {
                const option =  document.createElement('option');
                option.value = category;
                option.text = category;
                ctrCtg.appendChild(option);
            })

            types.forEach(type => {
                const option =  document.createElement('option');
                option.value = type;
                option.text = type;
                ctrTyp.appendChild(option);
            })
        }

        setOptions();

        const exam = []
        const btnOne = document.createElement('button');
        btnOne.textContent = 'Accept';
        btnOne.id = 'btn-atp';

        document.getElementById('btn-sta').addEventListener("click", async (e) => {
            e.preventDefault();
            
            const valueDifficult = document.getElementById('dif').value;
            const valueCategory = document.getElementById('ctg').value;
            const valueType = document.getElementById('typ').value;
            
            div.innerHTML = load;

            const dataTwo = await getData();
            const dataThree = await getData();
            const dataFour = await getData();
            const dataFive = await getData();
            const dataSix = await getData();

            function dataExam(array) {
                array.forEach(obj => {
                    if(exam.length < 10) {
                       if(obj.difficulty === valueDifficult && obj.category === valueCategory && obj.type === valueType)  {
                        exam.push(obj);
                        }
                    } else {
                        return null;
                    }
                })
            }
            dataExam(data);
            dataExam(dataTwo);
            dataExam(dataThree);
            dataExam(dataFour);
            dataExam(dataFive);
            dataExam(dataSix);

            console.log(exam)

            div.innerHTML = "";

            const h2 = document.createElement('h2');            
            const pOne = document.createElement('p');
            const pTwo = document.createElement('p');
            const pThree = document.createElement('p');
            const pFour = document.createElement('p');
            
            h2.textContent = "Welcome to this quizz!";            
            pOne.textContent = `Number of questions: ${exam.length}`;
            pTwo.textContent = `Difficulty: ${valueDifficult}`;
            pThree.textContent = `Category: ${valueCategory}`;
            pFour.textContent = `Type: ${valueType}`;

            pOne.classList.add('p--sty--po');
            pTwo.classList.add('p--sty--po');
            pThree.classList.add('p--sty--po');
            pFour.classList.add('p--sty--po');

            div.appendChild(h2);
            div.appendChild(pOne);
            div.appendChild(pTwo);
            div.appendChild(pThree);
            div.appendChild(pFour);
            div.appendChild(btnOne);
            btnOne.classList.add('bt--m');
        })
        
        btnOne.addEventListener('click', (e) => {
            e.preventDefault();
            
            div.innerHTML = "";
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            p.textContent = "The quizz start in: "
            p.classList.add('p--sty--po');
            div.insertBefore(p, div.firstChild);
            div.appendChild(h3);    

            for (let i = 5; i >= 0; i--) {
                if (i === 1) {
                    setTimeout(() => {
                        h3.textContent = i;
                        window.location.href = '../../../source/quizz.html'                    
                    }, 1000 * (5 - i));
                } else {
                    setTimeout(() => {
                        h3.textContent = i;
                    }, 1000 * (5 - i));
                }
            }
        })

    } catch(err) {
        console.log(err)
    }
})