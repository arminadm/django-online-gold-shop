//variables
const sliderBox = document.querySelector('#slider')
const sliderDuration = 4000
let intervalID = setInterval(()=>{
    slider()
},sliderDuration)
//Event Listener
eventListener()

function eventListener(){
    document.addEventListener('DOMContentLoaded',function(){
        sliderBox.querySelectorAll('.slider .slider-item').forEach((e,index)=>{
            if(index === 0){
                document.querySelector('#slider-dots').innerHTML +=`
                <li class="active" onclick="numSlide(${index})">
                    <span></span>
                    <svg viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">
                        <circle stroke="#fff" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                        <circle class="circle" stroke-width="1" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                    </svg>
                </li>
                `
            }else{
                document.querySelector('#slider-dots').innerHTML +=`
                <li onclick="numSlide(${index})">
                <span></span>
                <svg viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">
                    <circle stroke="#fff" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                    <circle class="circle" stroke-width="1" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                </svg>
               </li>
                ` 
            }
        })
    })
    document.querySelector('#next-slide').addEventListener('click',nextSlide)
    document.querySelector('#prev-slide').addEventListener('click',prevSlide)
}

// functions

function slider(){
   let item = sliderBox.querySelector('.slider .slider-item.d-block')
   let dots = document.querySelector('#slider-dots li.active')
   if(item.nextElementSibling !== null){
    item.nextElementSibling.classList.add('d-block')
    item.classList.remove('d-block')
    dots.nextElementSibling.classList.add('active')
    dots.classList.remove('active')
   }else{
    item.classList.remove('d-block')
    sliderBox.querySelectorAll('.slider .slider-item')[0].classList.add('d-block')
    dots.classList.remove('active')
    document.querySelectorAll('#slider-dots li')[0].classList.add('active')
   }
}
function nextSlide(){
    let item = sliderBox.querySelector('.slider .slider-item.d-block')
    let dots = document.querySelector('#slider-dots li.active')
    if(item.nextElementSibling !== null){
     item.nextElementSibling.classList.add('d-block')
     item.classList.remove('d-block')
     dots.nextElementSibling.classList.add('active')
     dots.classList.remove('active')
    }else{
     item.classList.remove('d-block')
     sliderBox.querySelectorAll('.slider .slider-item')[0].classList.add('d-block')
     dots.classList.remove('active')
     document.querySelectorAll('#slider-dots li')[0].classList.add('active')
    }
    clearInterval(intervalID)
    intervalID = setInterval(()=>{
        slider()
    },sliderDuration)
}
function prevSlide(){
    let item = sliderBox.querySelector('.slider .slider-item.d-block')
    let dots = document.querySelector('#slider-dots li.active')
    if(item.previousElementSibling !== null){
     item.previousElementSibling.classList.add('d-block')
     sliderBox.querySelectorAll('.slider .slider-item.d-block')[1].classList.remove('d-block')
     dots.previousElementSibling.classList.add('active')
     document.querySelectorAll('#slider-dots li.active')[1].classList.remove('active')
    }else{
     item.classList.remove('d-block')
     sliderBox.querySelectorAll('.slider .slider-item')[sliderBox.querySelectorAll('.slider .slider-item').length-1].classList.add('d-block')
     dots.classList.remove('active')
     document.querySelectorAll('#slider-dots li')[document.querySelectorAll('#slider-dots li').length-1].classList.add('active')
    }
    clearInterval(intervalID)
    intervalID = setInterval(()=>{
        slider()
    },sliderDuration)
}
function numSlide(num) {
    sliderBox.querySelectorAll('.slider .slider-item').forEach(e=>{
        e.classList.remove('d-block')
    })
    document.querySelectorAll('#slider-dots li').forEach(e=>{
        e.classList.remove('active')
    })
    document.querySelectorAll('#slider-dots li')[num].classList.add('active')
    sliderBox.querySelectorAll('.slider .slider-item')[num].classList.add('d-block')
    clearInterval(intervalID)
    intervalID = setInterval(()=>{
        slider()
    },sliderDuration)
}