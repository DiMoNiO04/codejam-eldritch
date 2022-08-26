import cardsBrown from '../data/mythicCards/brown/index.js'
import cardsBlue from '../data/mythicCards/blue/index.js'
import cardsGreen from '../data/mythicCards/green/index.js'
import ancients from '../data/ancients.js'

const difficultyContainer = document.querySelector('.difficulty-container');
const ancientContainer = document.querySelector('.ancient-container');
const ancientCard = document.querySelectorAll('.ancient-card');
const difficultys = document.querySelectorAll('.difficulty');
const zames = document.querySelector('.zames');
const desc = document.querySelector('.desc')
const lastCard = document.querySelector('.last-card')
const currentState = document.querySelector('.current-state')

const clickAncientContainer = (event) => {

    difficultyContainer.classList.remove('none')
    difficultyContainer.classList.add('visibly')

    let idCard = event.target.getAttribute('id')
    let indexActiveCard = String(idCard).substr(-1)

    for(let i=0; i<ancientCard.length; i++){
        ancientCard[i].classList.remove('ancient-card-active')
    }
    ancientCard[indexActiveCard - 1].classList.add('ancient-card-active')
}

const clickAncientDifficulty = (event) => {

    zames.classList.remove('none')
    zames.classList.add('visibly')
    
    let idDifficulty = event.target.getAttribute('id')
    let indexDiffuclty = String(idDifficulty).substr(-1)

    for(let i=0; i<difficultys.length; i++){
        difficultys[i].classList.remove('difficulty-active')
    }
    difficultys[indexDiffuclty - 1].classList.add('difficulty-active')
}

const clickZames = () => {

    zames.classList.add('none');
    zames.classList.remove('visibly');

    desc.classList.remove('none');
    desc.classList.add('visibly');

    currentState.classList.remove('none');
    currentState.classList.add('visibly');
}

const clickDesc = () => {
    lastCard.classList.remove('none');
    lastCard.classList.add('visibly');
}

ancientContainer.addEventListener('click', clickAncientContainer);
difficultyContainer.addEventListener('click', clickAncientDifficulty);
zames.addEventListener('click', clickZames);
desc.addEventListener('click', clickDesc);



const greenCard = 'greenCards';
const brownCard = 'brownCards';
const blueCard = 'blueCards';
const firstStage = 'firstStage';
const secondStage = 'secondStage';
const thirdStage = 'thirdStage'
let greenCards = 0, blueCards = 0, brownCards = 0;
let arr = [];
const arrStages = [firstStage, secondStage, thirdStage]

function getIdAncientCard(){
    let idCard = event.target.getAttribute('id')
    const index = String(idCard).substr(-1)
    return index;
}

function getArrayWithCountCards(){

    const indexActiveCard = getIdAncientCard() - 1;
    greenCards = ancients[indexActiveCard][firstStage][greenCard ] + ancients[indexActiveCard][secondStage][greenCard ] + ancients[indexActiveCard][thirdStage][greenCard ];
    brownCards = ancients[indexActiveCard][firstStage][brownCard ] + ancients[indexActiveCard][secondStage][brownCard ] + ancients[indexActiveCard][thirdStage][brownCard ];
    blueCards = ancients[indexActiveCard][firstStage][blueCard ] + ancients[indexActiveCard][secondStage][blueCard ] + ancients[indexActiveCard][thirdStage][blueCard ];

    let arr = [greenCards, brownCards, blueCards];
    return arr;
}


const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + min) + min);
let arrBlue = [], arrGreen = [], arrBrown = [];
let arrStageColor = []


function getIdDifficultCard(){
    let idDifficulty = event.target.getAttribute('id')
    let index = String(idDifficulty).substr(-1);
    return index;
}

function getArrayImageColorCard(){
    
    const indexDifficult = getIdDifficultCard();
    if(indexDifficult === '1'){

    }
    if(indexDifficult === '2'){

    }
    if(indexDifficult === '3'){
        difficultUsually();
    }
    if(indexDifficult === '4'){

    }
    if(indexDifficult === '5'){

    }
}

function getNumberImageColorCard(color, arrColor, cardsColor, arrCards){
   
    for(let i=0; i<arrCards[color]; i++){
        let rand = getRandomNum(1, cardsColor.length);
        (!arrColor.includes(rand)) ? arrColor.push(rand) : i--;
    }
    return arrColor
}

let stage = 0
function getCountCardsStage(stage){
    let countCardsStage = ancients[0][arrStages[stage]]['blueCards'] + ancients[0][arrStages[stage]]['greenCards'] +ancients[0][arrStages[stage]]['brownCards']
    return countCardsStage
}

let arrNumberStage = 0;

function difficultUsually(){

    let arrCards = getArrayWithCountCards();
    getNumberImageColorCard(0, arrGreen, cardsGreen, arrCards);
    getNumberImageColorCard(1, arrBrown, cardsBrown,arrCards);
    getNumberImageColorCard(2, arrBlue, cardsBlue,arrCards);

    getCardsForNextStage(cardsGreen, arrGreen, greenCard, firstStage, arrStageColor)
    let countCardsStage =  getCountCardsStage(stage)

    desc.addEventListener('click', () => {
        backgroundImage()
        countCardsStage--;

        if(countCardsStage === 0){
            countCardsStage = getCountCardsStage(stage + 1)
            arrNumberStage++
            let numberStages = arrStages[arrNumberStage];
            if(arrNumberStage === 3) return
            else getCardsForNextStage(cardsGreen, arrGreen, greenCard, numberStages, arrStageColor)
        } 
    })
}


function getCardsForNextStage(cardsGreen, arrGreen, greenCard, numberStage, arrStageColor){
    getNumberImageForStage(cardsGreen, arrGreen, greenCard, numberStage, arrStageColor)
    getNumberImageForStage(cardsBrown, arrBrown, brownCard, numberStage, arrStageColor)
    getNumberImageForStage(cardsBlue, arrBlue, blueCard, numberStage, arrStageColor)
}

function getNumberImageForStage(cardsColor, arrColor, colorCards, numberStage, arrStageColor){

    for(let i=ancients[0][numberStage][colorCards]; i>0; i--){
        arrStageColor.push(cardsColor[arrColor[arrColor.length - 1]-1]['cardFace'])
        arrColor.pop()
    }
    return arrStageColor;
}

function backgroundImage(){
    let rand = getRandomNum(0, arrStageColor.length)
    let color = '';

    (arrStageColor[rand].indexOf('blue', 0)) ? color = arrStageColor[rand].slice(0,5) : color = arrStageColor[rand].slice(0,4);

    let url = `url(../assets/MythicCards/${color}/${arrStageColor[rand]})`
    lastCard.style.backgroundImage = url;
    let indexDelete = arrStageColor.indexOf(arrStageColor[rand])
    arrStageColor.splice(indexDelete, 1);

    console.log(arrStageColor.length)
}


ancientContainer.addEventListener('click', getIdAncientCard)
difficultyContainer.addEventListener('click', getIdDifficultCard)
difficultyContainer.addEventListener('click', getArrayImageColorCard)
desc.addEventListener('click', getArrayImageColorCard)