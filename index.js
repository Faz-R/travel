const text = 'Слайдер изображений в секции destinations +50\nКарусель +20 \nТри точки внизу отображают "номер слайда" +20\n Анимации плавного перемещения для слайдера +10\nНажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап +50\n логин попап соответствует верстке его закрытие происходит при клике вне попапа +25\n логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25\n Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету +25';

console.log(text);


const open = document.querySelector('.toggle-nav');
const close = document.querySelector('.close-icon');
const menu = document.querySelector('.mobile-nav');
const dark = document.querySelector('.dark');

// mobile menu ------------------

open.onclick = function() {
    menu.style.transform = 'translateX(0)';
    dark.classList.add("active");
};

close.onclick = function() {
    menu.style.transform = 'translateX(100%)';
    dark.classList.remove("active");
};

document.onclick = function (e) {
    if (e.target.className != "mobile-nav" && e.target.className != 'toggle-nav' ) {
        menu.style.transform = 'translateX(100%)';
        dark.classList.remove("active");
    };
};

// login popup -------------------

const login = document.querySelectorAll('.login');
const popup = document.querySelector('.popup');
const background = document.querySelector('.popup-background');
const togglePopup = document.querySelector('.popup-toggle');
const social = document.querySelector('.popup-social');

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('login')){
        popup.classList.toggle('show');
        background.classList.toggle("hidden");
    }
})

background.addEventListener('click', (e) => {
    if(e.target.classList.contains('popup-background')){
    background.classList.toggle("hidden");
    popup.classList.toggle('show');
    }
})

togglePopup.onclick = function(evt) {
    evt.preventDefault();
    social.classList.toggle('remove');
    document.querySelector('.change-password').classList.toggle('remove');

    const title = document.querySelector('.popup-title');
    const verification = document.querySelector('.button-verification');
    const account = document.querySelector('.popup-toggle span:first-child');
    const logIn = document.querySelector('.popup-toggle span:last-child');

    toggleText(title, 'Log in to your account', 'Create account');
    toggleText(verification, 'Sign In', 'Sign Up');
    toggleText(account, 'Don’t have an account? ', 'Already have an account? ');
    toggleText(logIn, 'Register', 'Log in');
};

function toggleText(elem, original, newText){
    elem.textContent == original ?
    elem.textContent = newText:
    elem.textContent = original;
}

popup.onsubmit = function(evt){
  evt.preventDefault();
  alert(`E-mail: ${popup.email.value}\nPassword: ${popup.password.value}`);
  popup.email.value = '';
  popup.password.value = '';
  background.classList.toggle("hidden");
  popup.classList.toggle('show');
}

// slider ----------------

const left = document.querySelector('.control.left');
const right = document.querySelector('.control.right');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');


const slides = document.querySelectorAll('.slider-photo');
let slideWidth = document.querySelector('.slider-photo').offsetWidth;
const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');

console.log(slideWidth)

let width = slideWidth + (parseInt(window.getComputedStyle(slider).gap, 10));
let position = 0;

let firstSlide = document.createElement('div');
firstSlide.classList.add('slider-photo');
firstSlide.innerHTML = slides[slides.length - 1].innerHTML;
slider.insertBefore(firstSlide, slides[0]);

let lastSlide = document.createElement('div');
lastSlide.classList.add('slider-photo');
lastSlide.innerHTML = slides[0].innerHTML;
slider.appendChild(lastSlide);


function ActiveDot(n){
    for(let dot of dots){
        dot.classList.remove('active-dot')
    }
    dots[n].classList.add('active-dot');
}

let index = 1;


document.addEventListener('click', e => {
    if(e.target.classList.contains('control-left') || e.target.classList.contains('arrow-left')){
        position += width;
        if(position > width){
            position = -width;
        }
        slider.style.marginLeft = position + 'px';
    
        index--;
        if(index < 0){
            index = dots.length - 1;
        }
        ActiveDot(index); 
    }
    
    if(e.target.classList.contains('control-right') || e.target.classList.contains('arrow-right')){
        position -= width;
        if(position < -width){
            position = width;
        }
      slider.style.marginLeft = position + 'px';
    
      index++;
        if(index > dots.length - 1){
            index = 0;
        }
        ActiveDot(index);
    }

})

