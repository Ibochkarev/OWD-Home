// shortcut для document.querySelector (типа замена джиквери и всё такое)))
const qS = function (el, box) {
    if (box) {
        if (box.querySelector(el)) return box.querySelector(el);
    } else {
        if (document.querySelector(el)) return document.querySelector(el);
    }
};
const qSA = function (el, box) {
    if (box) {
        if (box.querySelectorAll(el)) return box.querySelectorAll(el);
    } else {
        if (document.querySelectorAll(el)) return document.querySelectorAll(el);
    }
};

if (qS(".mySlider")) document.addEventListener("DOMContentLoaded", lightSlider(3000));

function lightSlider(interVar) {
    // задаём дефолтные значения для счётчиков, отступов и т.п.
    var show = 1,
        translate = 0;

    // находим в ДОМ нужные элементы
    var dots = qS(".dots"), //кнопки контроля
        sliderDiv = qS(".mySlider"), //родительский блок слайдера
        slideInner = qS(".slideInner"),
        myNodeList = qSA(".slide");

    // пишем параметры в переменные
    var slWidth = myNodeList[0].clientWidth,
        listLength = myNodeList.length;

    // автостарт функции слайдера с интервалом
    interval = setInterval(mySlider, interVar);

    //Аппендим элемменты навигации прямо из скрипта без вёрстки
    for (var i = 0; i < listLength; ++i) {
        var newLi = document.createElement('span');
        newLi.innerHTML = '<i class="fa fa-circle"></i>';
        newLi.addEventListener("click", function () {
            data = this.dataset;
            show = data.number;
            restartSlider();
        });
        newLi.setAttribute("data-number", i);
        dots.appendChild(newLi);
    };
    //находим все кнопочки контроля
    conChilds = dots.children;

    // функция слайдера
    function mySlider() {
        if (document.hasFocus() && sliderDiv.classList.contains("fadeEffect")) {
            if (show >= listLength) {
                show = 0
            }; // если текущий слайд последний, обнуляем счётчик
            if (show < 0) {
                show = listLength
            }; // если счётчик слайдов отрицательный, чиним эту фигню

            if (show < listLength) { //реагируем, только если счётчик слайдов имеет адекватное число
                for (var i = 0; i < listLength; ++i) {
                    var element = myNodeList[i],
                        child = conChilds[i];
                    element.style.position = "absolute";
                    element.style.opacity = "0";
                    child.style.color = "#999";
                };
                myNodeList[show].style.position = "relative";
                myNodeList[show].style.opacity = "1";
                conChilds[show].style.color = "#333";
                show++;
            };
        };

        if (document.hasFocus() && sliderDiv.classList.contains("slideEffect")) {
            if (show >= listLength) {
                show = 0
            };

            translate = -1 * slWidth * show + "px";
            slideInner.style.transform = "translateX(" + translate + ")";
            firstClone = myNodeList[0].cloneNode(true);
            for (var i = 0; i < listLength; ++i) {
                var child = conChilds[i];
                child.style.color = "#999";
            };
            conChilds[show].style.color = "#333";
            show++;
        };
    };

    function restartSlider() {
        mySlider();
        clearInterval(interval);
        interval = setInterval(mySlider, interVar);
    }

    //прокрутка кнопками вправо и влево
    qS(".left").addEventListener("click", function () {
        show -= 2;
        if (show < 0) {
            show = listLength - 1
        };
        restartSlider();
    });
    qS(".right").addEventListener("click", function () {
        if (show >= listLength) {
            show = 0
        };
        restartSlider();
    });

};
