let total = 0;
let color = "";
let kqja = "";
let canPlay = true;
let doubled = false;
const title = document.getElementById("title");
const text = document.getElementById("text");
const dealert = document.getElementById("dealer");
const namet = document.getElementById("name");
const start = document.getElementById("start");
const totalt = document.getElementById("total");
const deck = document.getElementById("deck");
const btns = document.getElementById("btns");
const double = document.getElementById("double");
const draw = document.getElementById("draw");
const pass = document.getElementById("pass");
const moneyt = document.getElementById("money");
const btn = document.getElementsByClassName("btn");
const replay = document.getElementById("replay");
const namer = document.getElementById("namer");

Player = {
    money: 100,
    rename: function(n){
        namet.textContent = "Name: " + n;
    },
    changeMoney: function(x){
        Player.money += x + 1 - 1;
        console.log(Player.money);
        moneyt.textContent = "Money: " + Player.money;
    }
}

if(localStorage.getItem("name")){
    Player.rename(localStorage.getItem("name"));
}

function rename(){
    Player.rename(namer.value);
    localStorage.setItem("name", namer.value);
}

if(localStorage.getItem("money"))
Player.money = Number(localStorage.getItem("money"));

moneyt.textContent += Player.money;

function startGame(){
    title.textContent = "";
    text.textContent = "Draw a Card?";
    start.style.setProperty("display", "none");
    draw.style.setProperty("display", "flex");
    pass.style.setProperty("display", "flex");
    double.style.setProperty("display", "flex");
    totalt.style.setProperty("display", "block");
    drawCard();
    drawCard();
}

function drawCard(){
    if(canPlay && total <= 21){
        let x = Math.floor(Math.random() * 13) + 1;
        let y = Math.floor(Math.random() * 2);
        let z = Math.floor(Math.random() * 3);

        if(y === 0)
        color = "black";
        else
        color = "red";
        
        if(x > 10){
            x = 10;
            if(z === 0)
            kqja = "K";
            else if(z === 1)
            kqja = "Q";
            else
            kqja = "J";
        }
        else if(x === 1)
        kqja = "A";

        total += x;
        totalt.textContent = "Total: " + total;
        view(x, y, z);
    }
    else if(Player.money < 50){
        canPlay = false;
        text.textContent = "You are out of money :)";
    }
    else
    passTurn();
}

function view(x, y, z){
    let t = x;
    if(kqja != ""){
        t = kqja;
    }

    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let cardc = document.createElement("div");
    cardc.setAttribute("class", "cardc");
    cardc.innerHTML = t;
    card.append(cardc);
    cardc.style.setProperty("color", color);

    document.getElementById("deck").append(card);

    kqja = "";
}

function doubleTurn(){
    if(canPlay){
        doubled = true
        drawCard();
        passTurn();
    }
}

function passTurn(){
    if(canPlay){
        canPlay = false;
        let dealer = Math.floor(Math.random() * 21) + 1;

        if(dealer < 15)
        dealer = 15;

        dealert.textContent  = "Dealer: " + dealer;

        if(dealer === total)
        text.textContent  = "Draw!";
        else if(total === 21){
            text.textContent = "Blackjack!!!"
            if(doubled)
            Player.changeMoney(Player.money * 2);
            else
            Player.changeMoney(Player.money + Player.money/2);
        }
        else if(dealer < total && total <= 21){
            text.textContent  = "You won!!";
            if(doubled)
            Player.changeMoney(Player.money + Player.money/2);
            else
            Player.changeMoney(Player.money);
        }
        else{
            text.textContent  = "You lose!";
            if(doubled)
            Player.changeMoney(-Player.money/2);
            else
            Player.changeMoney(-Player.money/4);
        }

        localStorage.setItem("money", Player.money);

        replay.style.setProperty("display", "block");
    }
}