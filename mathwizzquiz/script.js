let x = document.querySelector("input");
let button = document.querySelector("button");
let myNameText;
let sonuc;
let answer;
let score;
let isim



button.addEventListener("click", (event) => {
  event.preventDefault();
  isim = myNameText;
  console.log(isim);
  myNameText = "";
  x.value = myNameText;

  if(localStorage.getItem(isim)==null){
   score = 0
   localStorage.setItem(isim,parseInt(score))
  }else{
   score = parseFloat(localStorage.getItem(isim))
  }
  oyunbaslama();

});

x.addEventListener("change", (event) => {
  myNameText = event.target.value;
});


function oyunbaslama() {
 let keleme =displayTopScores();
 let myobj = questionGenarator(0);
  document.querySelector(".box").innerHTML = `
  <div class="d-flex justify-content-between w-200 align-items-start mx-3 "><h6>score:<b>${score}</b></h6> <h6>Merhaba!${isim}</h6></div>
  <h1 class="mb-4">MATH QUİZ</h1>
  <div class="inner-box d-flex w-90 justify-content-between">
    <div class="w-50">
      <h4>Hesapla</h4>
      <div>
        <span>${myobj.num1}</span>
        <span>${myobj.selectedOperator}</span>
        <span>${myobj.num2}</span>
        <span>=</span>
        <form id="quizForm"> <!-- Form öğesine bir ID ekledik -->
          <input class="w-25" type="number">
        </form>
      </div>
    </div>
    <div class="w-50">
      <h4>Liderlik Tablosu</h4>
      <ul>`+keleme+`
      </ul>
    </div>
  </div>
`;
answer=myobj.answer
oyunaDevam()

}

function getRandomNumber(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
}


function questionGenarator(score) {
 const operators = ['+', '-', '*', '/'];
 const selectedOperator = operators[getRandomNumber(0,3)];
 let num1, num2, answer;
if(score<25){

 switch (selectedOperator) {
   case '+':
     num1 = getRandomNumber(1, 50);
     num2 = getRandomNumber(1, 50);
     answer = num1 + num2;
     break;
   case '-':
     num1 = getRandomNumber(1, 50);
     num2 = getRandomNumber(1, 50);
     answer = num1 - num2;
     break;
   case '*':
     num1 = getRandomNumber(1, 20);
     num2 = getRandomNumber(1, 20);
     answer = num1 * num2;
     break;
   case '/':
     answer = getRandomNumber(1, 20);
     num2 = getRandomNumber(1, 20);
     num1 = answer * num2; 
     break;
   default:
     break;
 }
}else {

 switch (selectedOperator) {
   case '+':
     num1 = getRandomNumber(1, 200);
     num2 = getRandomNumber(1, 200);
     answer = num1 + num2;
     break;
   case '-':
     num1 = getRandomNumber(1, 200);
     num2 = getRandomNumber(1, 200);
     answer = num1 - num2;
     break;
   case '*':
     num1 = getRandomNumber(1, 100);
     num2 = getRandomNumber(1, 100);
     answer = num1 * num2;
     break;
   case '/':
     answer = getRandomNumber(1, 100);
     num2 = getRandomNumber(1, 100);
     num1 = answer * num2; 
     break;
   default:
     break;

}
}
return { num1, num2, answer ,selectedOperator};
}

function oyunaDevam(){
 let mycalc = document.querySelector("input");
 let scoreboard = document.querySelector("b")
 let soruparcalari = document.querySelectorAll("span")
 let quizForm = document.getElementById("quizForm");
 quizForm.addEventListener("submit", (event) => {
   event.preventDefault();
   let sonuc = mycalc.value;
   mycalc.value = ""; 
   if(parseInt(sonuc)==answer){
    score+=1
    scoreboard.innerHTML=score
    localStorage.setItem(isim,score)
    myobj = questionGenarator()
    soruparcalari[0].innerHTML = myobj.num1;
    soruparcalari[1].innerHTML = myobj.selectedOperator;
    soruparcalari[2].innerHTML = myobj.num2;
    soruparcalari[3].innerHTML = "=";
    answer=myobj.answer
   }else{
    score-=1
    scoreboard.innerHTML=score
    localStorage.setItem(isim,score)
   }
 });

}

function getTopScores() {
 const scores = [];
 for (let i = 0; i < localStorage.length; i++) {
   const name = localStorage.key(i);
   const scored = parseInt(localStorage.getItem(name), 10);
   scores.push({ name, scored });
 }
 const topScores = scores.sort((a, b) => b.scored - a.scored).slice(0, 5);

 return topScores;
}

function displayTopScores() {
 let ekleme="";
 const topScores = getTopScores();
 topScores.forEach(item => {
 ekleme +=`<li>${item.name}: ${item.scored}</li>`;
 });
return ekleme;
}