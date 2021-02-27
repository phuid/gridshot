var countdownTimer = 0;
var timeleft = 60;
var hits = 0;
var toh = 0;
var tone = 0;
var tonetoh = tone - toh;

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + "; expires=Tue, 19 Jan 2038 03:14:07 UTC; Secure;"
}                                                                                                          

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function Hit(HitId) {
    var tone = new Date().getTime();
    console.log("tone(onHit) = " + tone);
    var tonetoh = tone - toh;
    console.log(HitId);
    var random = Math.floor(Math.random() * 36);
    console.log('random = ' + random);
    console.log(range.getElementsByTagName('button')[random].style.display)
    if (range.getElementsByTagName('button')[random].style.display === "none") {
        console.log("if");
        range.getElementsByTagName('button')[random].style.display = "block";
        hits++;
        console.log('#' + HitId + ' replaced; total is ' + hits);
        document.getElementById(HitId).style.display = "none";
        var avgTime = (((60 - timeleft) * 1000) / hits)
        document.getElementById("endtotal").textContent = "total hits: " + hits;
        document.getElementById("endtime").textContent = "Average time per hit: " + Math.round(avgTime) + "ms";
        document.getElementById("thistime").textContent = "Last hit: " + tonetoh + "ms";
        console.log("tone = " + tone + ", toh = " + toh);
        console.log("(tone-toh) = " + tonetoh);
    }
    else if(range.getElementsByTagName('button')[random].style.display === "block") {
        console.log("elif"); 
        Hit(HitId);
    }
    toh = new Date().getTime();
    console.log("toh = " + toh);    
} 

function fullscreen() {
    if (document.fullscreenElement) {
	   document.exitFullscreen();
    }
    else {
	   document.documentElement.requestFullscreen();
    }
}                                                                                                                               


function startDissappear() {
    for (i = 0; i <= 35; i++) {
        document.getElementById(i).style.display = "none";
    }
}

function startHit() {
    var randomm = Math.floor(Math.random() * 36);
    console.log(randomm);
    console.log(range.getElementsByTagName('button')[randomm].style.display);
    var randomdiv = document.getElementById(randomm);
    if (document.getElementById(randomm).style.display === "none") {
        document.getElementById(randomm).style.display = "block";
    }
    else if (document.getElementById(randomm).style.display === "block") {
        startHit();
    }
}

function Start() {

setCookie("highscore", 158);
console.log(getCookie("highscore"))


document.getElementById("fullscreenDiv").style.display = "block";
document.getElementById("fullscreenDiv").style.backgroundColor = "rgba(0,0,0,0)";
document.documentElement.requestFullscreen()
//zmizi tlacitko
document.getElementById("startButton").style.display = "none";
//vsechny terce.style.display = "none";
startDissappear();


//objevi se terèe
startHit();
startHit();
startHit();
//objevi se 321
document.getElementById("centerDiv").style.display = "block";
//321
document.getElementById("centerspan").textContent = "5";
setTimeout(() => {  CS(); }, 1000);
}
function CS() {
    document.getElementById("centerspan").textContent = "4";    
    setTimeout(() => {  ctnSt(); }, 1000);
}
function ctnSt() {
document.getElementById("centerspan").textContent = "3";
setTimeout(() => {  ctnStart(); }, 1000);
}

function ctnStart() {
    document.getElementById("centerspan").textContent = "2";
    setTimeout(() => {  ctnStrt(); }, 1000);
}
function ctnStrt() {
    document.getElementById("centerspan").textContent = "1";
    setTimeout(() => {  continueStart(); }, 1000);
}

function continueStart() {
document.getElementById("fullscreenDiv").style.display = "none";
//zmizi 321
document.getElementById("centerDiv").style.display = "none";
//objevi se 60
toh = new Date().getTime();
console.log("start toh = " + toh);
document.getElementById("CountdownText").style.display = "block";
//start countdown
ProgressCountdown('Countdown', 'CountdownText');
}  
function ProgressCountdown(bar, text) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft = timeleft - 0.1;

      document.getElementById(bar).value = timeleft;
      document.getElementById(text).textContent = Math.round(timeleft);

        if (timeleft <= 0) {
            clearInterval(countdownTimer);
            end();
        }
        
    }, 100);
  });
}
function stats() {
    if (document.getElementById("endscreen").style.display !== "block"){
        document.getElementById("endscreen").style.display = "block";
        }
    else {document.getElementById("endscreen").style.display = "none";}    
}
function end() {
    document.getElementById("fullscreenDiv").style.display = "block";
    document.getElementById("endscreen").style.display = "block";
    document.getElementById("fullscreenDiv").style.backgroundColor = "rgba(0,0,0,0.5)";
    document.getElementById("endscreen").style.top = "47%";
    document.getElementById("endscreen").style.right = "47%";
    document.getElementById("endscreen").style.width = "500px";
    document.getElementById("endscreen").style.fontSize = "35px";
    document.getElementById("restartButton").style.display = "block";
    
    document.getElementById("thistime").textContent = "";
    
    if (hits < 1) {
        document.getElementById("endtotal").textContent = "oh, you didnt get any targets... :(";
        document.getElementById("endtime").textContent = "I hope u will fix ur mouse soon enough not to miss any gaming session with ur homies";    
    }
    else {console.log("got " + hits + " targets");}
    
    if (sopt = 1) {console.log("sopt = " + sopt); clearInterval(countdownTimer);}
    else {console.log("soptttt = " + sopt)}  
    
    var formal = getCookie("highscore");
    if (hits > formal) {
        setCookie("highscore", hits);
    }
    console.log("cookie 'highscore' is set to " + getCookie("highscore"));
}
function restart() {
    if (countdownTimer) {
        clearInterval(countdownTimer);    
    }
    console.log("yes")
    hits = 0;
    timeleft = 60;
    document.getElementById("endscreen").style.top = "30px";
    document.getElementById("endscreen").style.right = "0";
    document.getElementById("endscreen").style.width = "300px";
    document.getElementById("endscreen").style.fontSize = "20px";
    
    document.getElementById("restartButton").style.display = "none";
    Start();
}
