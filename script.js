const woordenLijst = ["appel", "banaan", "citroen", "druiven", "eend", "fietsen", "giraffe", "hoed", "ijsbeer", "jacht", "lampion", "muziek", "nootjes", "olifant", "pauw", "roos", "spinazie", "tomaat", "uil", "vliegen", "wolken", "yoghurt", "zebra"];
const woordIndex = Math.floor(Math.random() * woordenLijst.length);
const woord = woordenLijst[woordIndex];
const woordKeuze = document.querySelector("article");


for (let index = 0; index < woord.length; index++) {
    const element = document.createElement("p");
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const border = document.createElement("span");
    element.textContent = woord.charAt(index);
    element.setAttribute("data-letter", woord.charAt(index));
    wrapper.appendChild(element);
    wrapper.appendChild(border);
    woordKeuze.appendChild(wrapper);
}

const buttons = document.querySelectorAll(".letter-knop");
const alleP = document.querySelectorAll("p");
const alleSpan = document.querySelectorAll("span");
const alleWrapper = document.querySelectorAll("div");

function getLetter(l){
    return document.querySelectorAll(`p[data-letter = ${l}]`);
}

const galg = document.getElementById("galg");
let galgIndex = 0;

function veranderGalg(){
    galgIndex++;
    galg.src = "images/galg-" + galgIndex + ".png";
}

function ifTrue(letter, button){
    const aanpas = getLetter(letter);
    aanpas.forEach(verander => verander.className = "visible");
    button.className = "groen";
    button.disabled = true;
    const alleVisible = Array.from(alleP).every(p => p.classList.contains("visible"));
    if(alleVisible){
        buttons.forEach(uit => uit.disabled = true);
        galg.src = "images/win.png";
    } 
}

function ifFalse(button){
    button.className = "rood";
    button.disabled = true;
    if (galgIndex < 5){
        veranderGalg();
    } else {
        buttons.forEach(uit => uit.disabled = true);
        veranderGalg();
        alleP.forEach(verander => verander.className = "visible");
    }
}

function check(e){
    const letter = e.target.textContent.toLowerCase();
    const inWoord = woord.includes(letter);
    if (inWoord) {
        ifTrue(letter, e.target);
    } else {
        ifFalse(e.target);
    }
}

buttons.forEach(button => button.addEventListener('click',(e) => check(e)));

const resetButton = document.querySelector("button");

function removeAll(){
    alleP.forEach(remove => remove.remove("p"));
    alleSpan.forEach(remove => remove.remove("span"));
    alleWrapper.forEach(remove => remove.remove("div"));
}

function reset(){
    document.location.reload();
}

resetButton.addEventListener('click', reset);
