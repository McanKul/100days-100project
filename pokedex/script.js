const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
 
let pokecontainer = document.querySelector(".poke-container")
let pokemonlar =[];

async function fetchPokedex() {

for(let i = 1;i<=900;i++){
let lazımlık={}; 
 let turler="";
 let url = `https://pokeapi.co/api/v2/pokemon/${i}`


let response = await fetch(url);
let result = await response.json();
types = result.types

for(let a=0;a<3;a++){
 if(types[a]==null){
  break
 }else{
 tur = types[a]
  xd =colors[`${tur.type.name}`]
 turler+=`<span class="poketur" style="background-color:${xd};">${tur.type.name}</span>`
}
}
let imgURL = result.sprites.other.dream_world.front_default == null ? result.sprites.front_default : result.sprites.other.dream_world.front_default

main_tur =types[0].type.name
lazımlık = {
 id : result.id,
 ad: result.forms[0].name,
 hp : result.stats[0].base_stat,
 ap : result.stats[1].base_stat,
 turler:turler,
 renk : colors[main_tur],
 Image : imgURL
}
console.log(main_tur)
let pokecard = cardHazırlama(lazımlık);

pokemonlar.push(pokecard);
gösterici(pokemonlar);
}

}
 



function gösterici(a){
 let yazma ="";
 a.forEach((item) => {
  yazma += item;
 })
 pokecontainer.innerHTML=yazma
}

function cardHazırlama(item){
 return`  <div class="poke-card">
 <div class="poke-img" style="background-color:${item.renk};"><p class="hp">hp ${item.hp}</p><img src="${item.Image}" alt="${item.ad}" ><p class="ap">ap ${item.ap}</p></div>
 <h4 class="poke-name">${item.ad}</h4>
 <div class="tur-yeri">`
 +item.turler+
 `
 </div>
 <div>
  <p class="footer">${item.id}</p>
 </div>
 </div>
 `
}

addEventListener("load",fetchPokedex())