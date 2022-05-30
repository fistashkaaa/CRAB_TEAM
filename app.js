// Soz saylamak
// Taze soz = ["Soz", "Acar sozi"]
var word = [["Alaja", "Turkmenleri goz dilden goraya."], ["Aygul", "Kody yazanyn ady"], ["Erteki", "Agsamara cagalara aydyp berilyar."], ["Mekdep", "6 yasda cagalaryn gidaymeli yeri."], ["Sygyr", "Suyduna icyan,name haywandygynam bilenok."], ["Esek", "Etmeli dal zat edende diyilyan soz."], ["Derman", "Yaramasan icmeli zat."], ["Sogan", "Kesende agladyar."], ["Toy", "Nahar ymane we tans etmane gidilyan yer."], ["Ayakgap", "Sonsuz dasyna cykyp bilmeyan."], ["Mollagara", "Sypahananyn ady."], ["Bedenterbiye", "Mekdepde bir sapak."], ["Yurek", "Adamyn bir organy."], ["Yalancy", "Allayan adam."], ["Amyderya", "Turkmenistanda bir derya."], ["Kompyuter", "Su wagt name ulanyan."], ["Sagat", "Eline dakylyan zat."], ["Kinoteatr", "Kino gorulyan yeri."], ["Burc", "Iyibem bolya, olcabem bolya."], ["Top", "Tegelek we oynalyan zat."], ["Terne", "Gawunun kicisi."], ["Juyje", "Towugun cagasy."], ["Towuk", "Gusun gornusi."], ["Kitaphana", "Kitaplaryn durli gornuslerini tapyp bolyan yer."]]

// Klawiatura
var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Oynun yady
var select = 0
var wordLeft = []
var fail = 0

// Onload
window.onload = function() {
    gId("moveKeybord").addEventListener('touchmove', function(e) {
        wH = window.innerHeight
        tY = e.touches[0].clientY
        eL = gId("tastatur")
        resY = wH - tY - eL.offsetHeight
        if(resY < 0) {
            resY = 0
        } else if(resY > wH / 2) {
            resY = wH / 2
        }
        eL.style.bottom = resY + "px"
    }, false)
    createTastur()
}

// Oynun bashy
function startGame() {
    gId("home").className = "h"
    gId("result").className = "h"
    newGame()
}

// Taze oyun
function newGame() {
    clearTastatur()
    clearPlayer()
    createWord()
}

// Clear keyboard
function clearTastatur() {
    var e = document.getElementsByClassName("b")
    for(a = 0; a < e.length; a++) {
        e[a].setAttribute("data", "")
    }
}

// clear
function clearPlayer() {
    fail = 0
    wordLeft = []
    gId("g0").setAttribute("data", "false")
    gId("g1").setAttribute("data", "false")
    gId("g2").setAttribute("data", "false")
    gId("g3").setAttribute("data", "false")
    gId("g4").setAttribute("data", "false")
    gId("g5").setAttribute("data", "false")
    gId("g5").setAttribute("r", "false")
    gId("g5").setAttribute("l", "false")
    gId("g6").setAttribute("data", "false")
    gId("g6").setAttribute("l", "false")
    gId("g6").setAttribute("r", "false")
    gId("hintButton").setAttribute("data", "false")
    gId("hint").style.display = "none"
}

// taze soz
function createWord() {
    var d = gId("letter")
    d.innerHTML = ""
    select = Math.floor(Math.random() * word.length)
    for(a = 0; a < word[select][0].length; a++) {
        var x = word[select][0][a].toUpperCase()
        var b = document.createElement("span")
        b.className = "l" + (x == " " ? " ls" : "")
        b.innerHTML = "&nbsp"
        b.id = "l" + a;
        d.appendChild(b)
        
        if(x != " ") {
            if(wordLeft.indexOf(x) == -1) {
                wordLeft.push(x)
            }
        }
    }
}

// Doretmek klawa
function createTastur() {
    var tas = gId("keybord")
    tas.innerHTML = ""
    for(a = 0; a < tastatur.length; a++) {
        var b = document.createElement("span")
        b.className = "b"
        b.innerText = tastatur[a]
        b.setAttribute("data", "")
        b.onclick = function() {
            bTas(this)
        }
        tas.appendChild(b)
    }
}

// Oyny barlamak, Eger next error / game end
function bTas(a) {
    if(a.getAttribute("data") == "") {
        var x = isExist(a.innerText)
        a.setAttribute("data", x)
        if(x) {
            if(wordLeft.length == 0) {
                gameEnd(true)
            }
        } else {
            showNextFail()
        }
    }
}

// Eger  "X" harp bar bolsa
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if(x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Surat
function showNextFail() {
    fail++
    switch(fail) {
        case 1:
            gId("g0").setAttribute("data", "true")
            break;
        
        case 2:
            gId("g1").setAttribute("data", "true")
            break;
        
        case 3:
            gId("g2").setAttribute("data", "true")
            break;
        
        case 4:
            gId("g3").setAttribute("data", "true")
            gId("hintButton").setAttribute("data", "true")
            break;
        
        case 5:
            gId("g4").setAttribute("data", "true")
            break;
        
        case 6:
            gId("g5").setAttribute("data", "true")
            break;
        
        case 7:
            gId("g5").setAttribute("l", "true")
            break;
        
        case 8:
            gId("g5").setAttribute("r", "true")
            break;
        
        case 9:
            gId("g6").setAttribute("data", "true")
            gId("g6").setAttribute("l", "true")
            break;
        
        case 10:
            gId("g6").setAttribute("r", "true")
            gameEnd(false)
            break;
    }
}

function typeWord(e) {
    for(a = 0; a < word[select][0].length; a++) {
        if(word[select][0][a].toUpperCase() == e) {
            gId("l" + a).innerText = e
        }
    }
}

// Oynun netijesi
function gameEnd(e) {
    var d = gId("result")
    d.setAttribute("data", e)
    if(e) {
        gId("rT").innerText = "Siz utdynyz!"
        gId("rM").innerHTML = "Gutlayan! Sen sozi bildin!<br/><br/>Gaty gowy!"
    } else {
        gId("rT").innerText = "Siz utuldynyz!!"
        gId("rM").innerHTML = "Bilmedik sozuniz: <br/><br/>\"" + word[select][0].toUpperCase() + "\"<br/><br/>Yene bir gezek ozunizi barlan."
    }
    d.className = ""
}

// Acar sozi gorkezmek
function hint() {
    gId("hintText").innerText = word[select][1]
    gId("hint").style.display = "block"
}

// Acar sozi yapmak
function hintExit() {
    gId("hint").style.display = "none"
}

// ID almak
function gId(a) {
    return document.getElementById(a)
}
