
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

function createSquare(size){
  let square = document.createElement('div');
  square.className = 'square';
  square.style.height = `${size}px`;
  square.style.width = `${size}px`;
  square.className = 'square';
  return square;
}


const squaresContainer = document.getElementById('js-squares');
let size = 80;
const upperCaseAlp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let chosenLetters = {};
let letterBuffer = [];
let choices = []

function pickLetters(){
  let l = sample(upperCaseAlp);
  do {
    l = sample(upperCaseAlp);
  }
  while (l in chosenLetters);
  chosenLetters[l] = 2;

  letterBuffer.push(l);
}


let addSquares = () => {
  for (let i = 0; i < 3; ++i){
    let buffer = "";
    if (i < 2){
    pickLetters();
    }

    let square = createSquare(size);
    squaresContainer.appendChild(square);
    size += 20;


    buffer = sample(letterBuffer);
    while (chosenLetters[buffer] === 0){
      remove(letterBuffer, buffer);
      delete chosenLetters[buffer];
      buffer = sample(letterBuffer);
    }

    chosenLetters[buffer] -= 1;
    let h1 = document.createElement('h1');
    h1.innerHTML = buffer;
    square.appendChild(h1);
    square.addEventListener('click', showLetter);
  }
};



function checkChoices(){
  if (choices[0].innerHTML == choices[1].innerHTML && choices[0] !== choices[1])
    return true;
  return false;
}

let showLetter = function(){
// strip the class name to and work with just one classname
  let obj = this
  obj.className = 'show';
  console.log(obj);
  choices.push(obj);


  if (choices.length == 2){
    if (checkChoices()){
      choices[0].className = 'found';
      choices[0].removeEventListener('click', showLetter);
      choices[1].className = 'found';
      choices[1].removeEventListener('click', showLetter);
    }
  }
  setTimeout(function() { clear(choices);}, 400);
}



function clear(){
  if (!(choices[0].className.includes('found')) && !(choices[0].className.includes('found'))){
    for(let i = 0; i < choices.length; ++i){
      choices[i].className = 'square';
    }
  }
  if(choices.length == 2){
    choices = [];
  }
}























