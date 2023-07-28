let degistirici;
let degistirmebtn = [];

degistirmebtn = document.querySelectorAll("i");
degistirmebtn.forEach((itm) => {

itm.addEventListener("click",()=>{
degistirici = getComputedStyle(itm).color;
console.log(degistirici);
});
});

let gun;

gunler = document.querySelectorAll(".gun")

gunler.forEach((item)=>{
 item.addEventListener("click",function(){
  if(this.style.backgroundColor != degistirici){
  this.style.backgroundColor = degistirici;
  } else{
   this.style.backgroundColor= "#f0f8ff";
  }
 })
})