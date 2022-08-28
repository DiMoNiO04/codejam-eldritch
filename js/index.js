import cardsBrown from '../data/mythicCards/brown/index.js'
import cardsBlue from '../data/mythicCards/blue/index.js'
import cardsGreen from '../data/mythicCards/green/index.js'
import ancients from '../data/ancients.js'

//-----------------------------------Разметка html----------------------------------//
const levelsContainer = document.querySelector('.levels-container');
const ancientContainer = document.querySelector('.ancient-container');
const ancientCard = document.querySelectorAll('.ancient-card');
const levels = document.querySelectorAll('.level');
const zames = document.querySelector('.zames');
const desc = document.querySelector('.desc')
const lastCard = document.querySelector('.last-card')
const currentState = document.querySelector('.current-state')

const clickAncientContainer = (event) => {

    levelsContainer.classList.remove('none')
    levelsContainer.classList.add('visibly')

    let idCard= event.target.getAttribute('id')
    let indexActiveCard = String(idCard).substr(-1)

    for(let i=0; i<ancientCard.length; i++){
        ancientCard[i].classList.remove('ancient-card-active')
    }
    ancientCard[indexActiveCard - 1].classList.add('ancient-card-active')
}

const clickAncientLevels = (event) => {

    zames.classList.remove('none')
    zames.classList.add('visibly')
    
    let idLevel = event.target.getAttribute('id')
    let indexLevel = String(idLevel).substr(-1)

    for(let i=0; i < levels.length; i++){
        levels[i].classList.remove('level-active')
    }
    levels[indexLevel].classList.add('level-active')
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
levelsContainer.addEventListener('click', clickAncientLevels);
zames.addEventListener('click', clickZames);
desc.addEventListener('click', clickDesc);
//---------------------------------------------------------------------//


const greenCard = 'greenCards', brownCard = 'brownCards', blueCard = 'blueCards';
const firstStage = 'firstStage', secondStage = 'secondStage', thirdStage = 'thirdStage';
let greenCards = 0, blueCards = 0, brownCards = 0;
const arrStages = [firstStage, secondStage, thirdStage]
let indexActiveAncient = 0, countCardsStage = 0, numberStage = 0;
let arr = [], arrBlue = [], arrGreen = [], arrBrown = [], arrStageColor = [];

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + min) + min);

const getIdAncient = (event) => {
    const idCard = event.target.id;
    const index = String(idCard).substr(-1) - 1
    return index
}

const getIndexActiveAncient = (event) => {
    getIdAncient(event)
    indexActiveAncient = getIdAncient(event)
    return indexActiveAncient
}

const getArrayWithCountCards = () => {

    greenCards = ancients[indexActiveAncient][firstStage][greenCard ] + ancients[indexActiveAncient][secondStage][greenCard ] + ancients[indexActiveAncient][thirdStage][greenCard ];
    brownCards = ancients[indexActiveAncient][firstStage][brownCard ] + ancients[indexActiveAncient][secondStage][brownCard ] + ancients[indexActiveAncient][thirdStage][brownCard ];
    blueCards = ancients[indexActiveAncient][firstStage][blueCard ] + ancients[indexActiveAncient][secondStage][blueCard ] + ancients[indexActiveAncient][thirdStage][blueCard ];

    arr = [greenCards, brownCards, blueCards];
    return arr;
}

let idLevel = 0;
const getIdLevelCard = () => idLevel = event.target.getAttribute('id')

const getArrayImageColorCard = () => {
    
    const indexLevel = getIdLevelCard();
    if(indexLevel === '0'){

    }
    if(indexLevel === '1'){

    }
    if(indexLevel === '2'){
        mediumLevel();
    }
    if(indexLevel === '3'){

    }
    if(indexLevel === '4'){

    }
}

const getNumberImageColorCard = (color, arrColor, cardsColor, arrCards) => {
   
    for(let i=0; i<arrCards[color]; i++){
        let rand = getRandomNum(1, cardsColor.length);
        (!arrColor.includes(rand)) ? arrColor.push(rand) : i--;
    }
    return arrColor
}

let stage = 0;
const getCountCardsStage = (stage) => countCardsStage = ancients[indexActiveAncient][arrStages[stage]][blueCard] + ancients[indexActiveAncient][arrStages[stage]][greenCard] +ancients[indexActiveAncient][arrStages[stage]][brownCard]

const mediumLevel = () => {

    let arrCards = getArrayWithCountCards();
    getNumberImageColorCard(0, arrGreen, cardsGreen, arrCards);
    getNumberImageColorCard(1, arrBrown, cardsBrown,arrCards);
    getNumberImageColorCard(2, arrBlue, cardsBlue,arrCards);

    getCardsForNextStage(cardsGreen, arrGreen, greenCard, firstStage, arrStageColor)
    let countCardsStage =  getCountCardsStage(stage)

    desc.addEventListener('click', () => {
        backgroundImage()
        countCardsStage--;

        if(countCardsStage === 0 && numberStage !== 2){
            stage = stage + 1
            countCardsStage = getCountCardsStage(stage)
            numberStage++
            let numberStages = arrStages[numberStage];
            getCardsForNextStage(cardsGreen, arrGreen, greenCard, numberStages, arrStageColor)
        } 
        if(countCardsStage === 0 && numberStage === 2){  
            desc.classList.remove('visibly')
            desc.classList.add('none')
        }
    })
}

const getCardsForNextStage = (cardsGreen, arrGreen, greenCard, numberStage, arrStageColor) => {
    getNumberImageForStage(cardsGreen, arrGreen, greenCard, numberStage, arrStageColor)
    getNumberImageForStage(cardsBrown, arrBrown, brownCard, numberStage, arrStageColor)
    getNumberImageForStage(cardsBlue, arrBlue, blueCard, numberStage, arrStageColor)
}

const getNumberImageForStage = (cardsColor, arrColor, colorCards, numberStage, arrStageColor) => {
    
    for(let i=ancients[indexActiveAncient][numberStage][colorCards]; i>0; i--){
        arrStageColor.push(cardsColor[arrColor[arrColor.length - 1]-1]['cardFace'])
        arrColor.pop()
    }
    return arrStageColor;
}

let col = '';
const backgroundImage = () => {
    let rand = getRandomNum(0, arrStageColor.length)
    let color = '';

    (arrStageColor[rand].indexOf('blue', 0)) ? color = arrStageColor[rand].slice(0,5) : color = arrStageColor[rand].slice(0,4);
    
    let url = `url(../assets/MythicCards/${color}/${arrStageColor[rand]})`
    lastCard.style.backgroundImage = url;
    let indexDelete = arrStageColor.indexOf(arrStageColor[rand])
    arrStageColor.splice(indexDelete, 1);
    console.log(arrStageColor.length)
    col = color;

    changeTracker()
}

ancientContainer.addEventListener('click', getIndexActiveAncient)
ancientContainer.addEventListener('click', getArrayWithCountCards)
levelsContainer.addEventListener('click', getArrayImageColorCard)
desc.addEventListener('click', getArrayImageColorCard)


//----------------------------------------------Tracker----------------------------------------//
const activeSpanDot = document.querySelectorAll('.stage-text');
const dotGreen = document.querySelectorAll('.green')
const dotBlue = document.querySelectorAll('.blue')
const dotBrown = document.querySelectorAll('.brown')

const changeStageText = () => {
    countCardsStage--;
    if(countCardsStage === 0){
        activeSpanDot[numberStage].classList.add('stage-text-active')
    }
}

const changeCountDots = () => {
    if(col === 'brown') {
        dotBrown[numberStage].textContent = dotBrown[numberStage].textContent - 1;
    }else if(col === 'green'){
        dotGreen[numberStage].textContent = dotGreen[numberStage].textContent - 1;
    }else{
        dotBlue[numberStage].textContent = dotBlue[numberStage].textContent - 1;
    }
}

const getTextContentDots = () => {   
   textContentDots(dotGreen, greenCard)
   textContentDots(dotBlue, blueCard)
   textContentDots(dotBrown, brownCard)
}

const textContentDots = (dotColor, colorCard) => {
    dotColor[0].textContent = ancients[indexActiveAncient][firstStage][colorCard]
    dotColor[1].textContent = ancients[indexActiveAncient][secondStage][colorCard]
    dotColor[2].textContent = ancients[indexActiveAncient][thirdStage][colorCard]
}

function changeTracker(){
    changeCountDots()
    changeStageText()
}

levelsContainer.addEventListener('click', getTextContentDots)
//----------------------------------------------------------------------------------------------//
