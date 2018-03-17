//allgemeines Item-Objekt
function Item(id, name, klasse) {
    this.id = id;   //beginnend bei 1
    this.name = name;
    this.klasse = klasse;   //0: Blau, 1: Lila, 2: Rot, 3: Gelb, 4: Mystery
}

//allgemeines Kisten-Objekt
function Kiste(id, name, items) {
    this.id = id;   //beginnend bei 1
    this.name = name;
    this.items = items;   //Array mit allen Items, die in der Kisten erscheinen sollen
}

//einzelne Items
function Item1(farbe, zertifiziert) {
    this.item = new Item(1, "Item1", 0);
    this.farbe = farbe; //0: standard, 1: weiß, 2: grau, 3: schwarz, 4: pink, 5: lila, 6: blau, 7: hellblau, 8: türkis, 9: hellgrün, 10: grün, 11: gelb, 12: gold, 13: orange, 14: rot
    this.zertifiziert = zertifiziert;
}
function Item2(farbe, zertifiziert) {
    this.item = new Item(2, "Item2", 1);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}
function Item3(farbe, zertifiziert) {
    this.item = new Item(3, "Item3", 2);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}
function Item4(farbe, zertifiziert) {
    this.item = new Item(4, "Item4", 3);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}
function Item5(farbe, zertifiziert) {
    this.item = new Item(5, "Item5", 4);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}


//Variablen
var random;
var laufbandItems = [];
var inventar = [];
var laufbandOpen = false;
var rollingBlocked = false;

function roll(kiste) {
    if(rollingBlocked === false) {
        rollingBlocked = true;
        openLaufband();
        fillLaufband(kiste);

        var laufband = document.getElementById("laufband");
        laufband.style.top = "-14000px";

        //Animation
        random = Math.floor((Math.random()*2000)+10000);    //10000-12000

        var laufbandKeyframes = "@-webkit-keyframes roll_ani {0% {top: -14000px} 100% {top: " + (-14000+random) + "px}}";

        //Animation hinzufügem
        var laufbandKeyframesTextNode = document.createTextNode(laufbandKeyframes);
        document.getElementsByTagName("style")[0].appendChild(laufbandKeyframesTextNode);

        laufband.style.webkitAnimationName = "roll_ani";
        laufband.style.webkitAnimationDuration = "5s";
        laufband.addEventListener("webkitAnimationEnd", rollEndingListener)
    }
}
function rollEndingListener() {
    rollingBlocked = false;

    //Laufband-Animation entfernen
    var laufband = document.getElementById("laufband");
    laufband.style.removeProperty("-webkit-animation-name");
    laufband.style.removeProperty("-webkit-animation-duration");

    //nach Animation wollen wir die aktuelle Position festsetzen
    laufband.style.top = (-14000+random) + "px";

    //Position speichern
    var position = 14000-random;
    var whichItem = Math.floor((position+350)/200);

    //Item zum Inventar hinzufügen
    addItemToInv(laufbandItems[whichItem]);
    laufband.removeEventListener("webkitAnimationEnd", rollEndingListener);

    //Animation des aktuellen Items (größeres Div, das wieder verschwindet)
    var biggerDivElem = document.createElement("div");
    biggerDivElem.setAttribute("class", "bigBlock");
    biggerDivElem.style.backgroundColor = document.getElementById("blockNr" + whichItem).style.backgroundColor;
    biggerDivElem.addEventListener("webkitAnimationEnd", function (e) {
        biggerDivElem.parentNode.removeChild(biggerDivElem);
    });
    biggerDivElem.innerHTML = laufbandItems[whichItem].item.name + "<br>";
    switch(laufbandItems[whichItem].farbe) {
        case 0:
            biggerDivElem.innerHTML += "farblos<br>";
            break;
        case 1:
            biggerDivElem.innerHTML += "weiß<br>";
            break;
        case 2:
            biggerDivElem.innerHTML += "grau<br>";
            break;
        case 3:
            biggerDivElem.innerHTML += "schwarz<br>";
            break;
        case 4:
            biggerDivElem.innerHTML += "pink<br>";
            break;
        case 5:
            biggerDivElem.innerHTML += "lila<br>";
            break;
        case 6:
            biggerDivElem.innerHTML += "blau<br>";
            break;
        case 7:
            biggerDivElem.innerHTML += "hellblau<br>";
            break;
        case 8:
            biggerDivElem.innerHTML += "türkis<br>";
            break;
        case 9:
            biggerDivElem.innerHTML += "hellgrün<br>";
            break;
        case 10:
            biggerDivElem.innerHTML += "grün<br>";
            break;
        case 11:
            biggerDivElem.innerHTML += "gelb<br>";
            break;
        case 12:
            biggerDivElem.innerHTML += "gold<br>";
            break;
        case 13:
            biggerDivElem.innerHTML += "orange<br>";
            break;
        case 14:
            biggerDivElem.innerHTML += "rot<br>";
            break;
    }
    if(laufbandItems[whichItem].zertifiziert === 1) {
        biggerDivElem.innerHTML += "zertifiziert";
    }

    document.body.appendChild(biggerDivElem);

    //Laufband schließen
    openLaufband();
}

function openLaufband() {
    if(laufbandOpen === false) {
        document.getElementById("laufband_background").style.display = "inline";
        laufbandOpen = true;
    }
    else {
        document.getElementById("laufband_background").style.display = "none";
        laufbandOpen = false;
    }
}
function fillLaufband(kiste) {
    var divElem;
    var randomKlasse;

    var items = kiste.items;
    var seltenheit0 = [];
    var seltenheit1 = [];
    var seltenheit2 = [];
    var seltenheit3 = [];
    var seltenheit4 = [];
    var aktuellesItem;
    laufbandItems.splice(0, 75);    //alle vorherigen Items löschen

    for(var j = 0; j < items.length; j++) {
        switch(items[j].item.klasse) {
            case 0:
                seltenheit0.push(items[j]);
                break;
            case 1:
                seltenheit1.push(items[j]);
                break;
            case 2:
                seltenheit2.push(items[j]);
                break;
            case 3:
                seltenheit3.push(items[j]);
                break;
            case 4:
                seltenheit4.push(items[j]);
                break;
        }
    }

    for(var i = 0; i < 75; i++) {
        //Block erstellen
        divElem = document.createElement("div");
        divElem.setAttribute("id", "blockNr" + i);
        divElem.setAttribute("class", "block");
        document.getElementById("laufband").appendChild(divElem);
        document.getElementById("blockNr" + i).style.top = 200*i + "px";

        randomKlasse = Math.floor((Math.random()*100)+1);   //1-100
        if(randomKlasse <= 40) {
            document.getElementById("blockNr" + i).style.backgroundColor = "blue";

            aktuellesItem = seltenheit0[randomItem(seltenheit0)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else if(randomKlasse <= 80 && randomKlasse > 40) {
            document.getElementById("blockNr" + i).style.backgroundColor = "mediumpurple";

            aktuellesItem = seltenheit1[randomItem(seltenheit1)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else if(randomKlasse <= 90 && randomKlasse > 80) {
            document.getElementById("blockNr" + i).style.backgroundColor = "red";

            aktuellesItem = seltenheit2[randomItem(seltenheit2)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else if(randomKlasse <= 98 && randomKlasse > 90) {
            document.getElementById("blockNr" + i).style.backgroundColor = "yellow";

            aktuellesItem = seltenheit3[randomItem(seltenheit3)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else {
            document.getElementById("blockNr" + i).style.backgroundColor = "purple";

            aktuellesItem = seltenheit4[randomItem(seltenheit4)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
    }

}
function randomItem(seltenheit) {
    return Math.floor(Math.random()*seltenheit.length); //Item der Seltenheitsklasse bestimmen
}
function randomColor() {
    return Math.floor(Math.random()*15);    //0-14
}
function certifyItem() {
    return Math.floor(Math.random()*2);    //0-1
}

//***** Inventar *****
function addItemToInv(item) {
    var itemAlreadyInInventory = false;

    for(var i = 0; i < inventar.length; i++) {
        if(inventar[i].item.id === item.item.id) {
            var anzahlDiv = document.getElementById("inv_flexItemAnzahlID" + item.item.id);
            anzahlDiv.innerHTML = (parseInt(anzahlDiv.innerHTML)+1).toString();

            itemAlreadyInInventory = true;
            i = inventar.length;
        }
    }

    if(itemAlreadyInInventory === false) {
        var itemDivElem = document.createElement("div");
        itemDivElem.setAttribute("id", "inv_flexItemID" + item.item.id);
        itemDivElem.setAttribute("class", "inv_flexItem");
        itemDivElem.innerHTML = item.item.name;
        document.getElementById("inv_flexContainer").appendChild(itemDivElem);

        var itemAnzahlDivElem = document.createElement("div");
        itemAnzahlDivElem.setAttribute("id", "inv_flexItemAnzahlID" + item.item.id);
        itemAnzahlDivElem.setAttribute("class", "inv_flexItemAnzahl");
        itemAnzahlDivElem.innerHTML = 1;
        itemDivElem.appendChild(itemAnzahlDivElem);

        inventar.push(item);
    }
}