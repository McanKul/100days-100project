let mybody;




async function fetchRecipe(){
 let url = 'https://www.themealdb.com/api/json/v1/1/random.php';
 const options = {
  method:"GET"
 };
 try{
  const response = await fetch(url,options);
  const result = await response.json();
  randomMealGenarator(result.meals[0])
 } 
 catch(error) {
  console.error(error)
 }
}


function randomMealGenarator(myobj){
 let ingredients = [];
 for(let i=1; i<=20; i++) {
  if(myobj[`strIngredient${i}`]) {
    ingredients.push(`${myobj[`strIngredient${i}`]} - ${myobj[`strMeasure${i}`]}`)
  } else {
   
    break;
  }


 }
 let firstpart = `
  <div class="container bg-light d-flex justify-content-center align-items-center p-4">
   <div class="d-flex flex-column">
    <h2 class="mx-auto">feeling hungry?</h2>
    <p class="mx-auto">get arandom meal by clicking below</p>
    <button class="btn btn-primary mx-auto">Get Meal 🍔</button> 
   </div>
  </div>
  <div class="container d-md-flex my-3">
     <div class="aside-bar  d-flex flex-column">
      <img class="my-image w-100" src="${myobj.strMealThumb}">
      <p class="mt-3">
       <b>Catagory:</b><span>${myobj.strCategory}</span>
      </p>
      <p>
       <b>Area:</b><span>${myobj.strArea}</span>
      </p>
      <p>
       <b>Tags:</b><span>${myobj.strTags}</span>
      </p>
      <h3>INGREDINTS:</h3>
      <ul>`
 let secondpart = `${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}`;

     let thirdpart =  `
      </ul>
     </div>
     <div class="main p-3 pt-0">
      <h2>${myobj.strMeal}</h2>
      <p>${myobj.strInstructions}</p>
     </div>
  </div>
  <div class="container">
   <iframe class="w-100" src="${myobj.strYoutube}" ></iframe>
  </div>
  <script src="script.js"></script>
  <script>
  document.querySelector("button").addEventListener("click",fetchRecipe);
  </script>
`

mybody = firstpart + secondpart +thirdpart;
document.body.innerHTML = mybody;
document.querySelector(".btn").addEventListener("click",fetchRecipe);
}


document.querySelector(".btn").addEventListener("click",fetchRecipe);