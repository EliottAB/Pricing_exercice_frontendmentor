const switchButton = document.querySelector(".switch")
const switchButtonCircle = document.querySelector(".switch-circle")
const slideBar = document.querySelector(".slide-bar")
const slideButton = document.querySelector(".slide-button")
const displayedPrice = document.querySelector(".pricing")
const reccurence = document.querySelector(".reccurence")
let switchOn = false
let pricing = 16
let mouseX
let followMouse = false
let gradientPercent = 50

switchButton.addEventListener("mousedown", ()=>{
    if (switchOn === false) {
        switchButton.style.backgroundColor = "hsl(174, 77%, 80%)"
        switchButtonCircle.style.left = "55%"
        reccurence.innerHTML = "/year"
        switchOn = true
    }else{
        switchButton.style.backgroundColor = ""
        switchButtonCircle.style.left = ""
        reccurence.innerHTML = "/month"
        switchOn = false
    }
    UpdatePrice()
})

slideButton.addEventListener("mousedown", ()=>{
    followMouse = true
    slideButton.style.backgroundColor = "hsl(174, 86%, 45%)"
})

slideButton.addEventListener("touchstart", ()=>{
    followMouse = true
    slideButton.style.backgroundColor = "hsl(174, 86%, 45%)"
})

window.addEventListener("mouseup", ()=>{
    followMouse = false
    slideButton.style.backgroundColor = ""
})

window.addEventListener("touchend", ()=>{
    followMouse = false
    slideButton.style.backgroundColor = ""
})

window.addEventListener("mousemove", (e)=>{
    MoveBar(e)
})

window.addEventListener("touchmove", (e)=>{
    MoveBar(e.touches[0])
})

function MoveBar(e){
    mouseX = e.clientX
    let mouseMid = mouseX - document.documentElement.clientWidth/2
    let barWidth = slideBar.offsetWidth/2
    if (followMouse && (mouseMid)>-barWidth && (mouseMid)<barWidth) {
        slideButton.style.left = 50*mouseMid/barWidth + "%"
        pricing = (mouseMid+barWidth)/(barWidth/16)
        gradientPercent = (mouseMid+barWidth)*100/(barWidth*2)
        UpdatePrice()
        slideBar.style.background = `linear-gradient(to left, hsl(224, 65%, 95%) ${100-gradientPercent}%, hsl(174, 77%, 80%) ${100-gradientPercent}%)`
    }
    if (followMouse && mouseMid>barWidth) {
        slideButton.style.left = "50%"
        pricing = 32
        UpdatePrice()
        slideBar.style.background = `linear-gradient(to left, hsl(224, 65%, 95%) ${0}%, hsl(174, 77%, 80%) ${0}%)`
    }
    if (followMouse && mouseMid<-barWidth) {
        slideButton.style.left = "-50%"
        pricing = 0
        UpdatePrice()
        slideBar.style.background = `linear-gradient(to left, hsl(224, 65%, 95%) ${100}%, hsl(174, 77%, 80%) ${100}%)`
    }
}

function UpdatePrice(){
    displayedPrice.innerHTML = switchOn ? "$" + (pricing*12).toFixed(2) : "$" + pricing.toFixed(2)
}