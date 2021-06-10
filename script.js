let minValue, maxValue, gameRun, answerPhrase, phraseRandom, answerNumber, orderNumber, err;
let minus = false;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const btnRetry = document.querySelector('#btnRetry');
const btnOver = document.querySelector('#btnOver');
const btnLess = document.querySelector('#btnLess');
const btnEqual = document.querySelector('#btnEqual');
const orderText = document.querySelector('#orderText');
const btnStart = document.querySelector('#btnStart');
const inputMin = document.querySelector('.inputMin');
const inputMax = document.querySelector('.inputMax');
const phrase = document.querySelector('.Phrase');
const phraseCollapse = document.querySelector('#hidePhrase');


function cllpsPhrase() { //сворачивание уведомлений
    return new bootstrap.Collapse('#hidePhrase');
}

//задаем текстовую запись ответа
function Hundred(a) { //сотни (аргумент - ответ)
    let hundredText;
    let ansHundred = Math.floor(a / 100); //вычисляем сотни
    switch(ansHundred) {
        case 0:
            hundredText = ' ';
            break;
        case 1:
            hundredText = 'сто ';
            break;
        case 2:
            hundredText = 'двести ';
            break;
        case 3:
            hundredText = 'триста ';
            break;
        case 4:
            hundredText = 'четыреста ';
            break;
        case 5:
            hundredText = 'пятьсот ';
            break;
        case 6:
            hundredText = 'шестьсот ';
            break;
        case 7:
            hundredText = 'семьсот ';
            break;
        case 8:
            hundredText = 'восемьсот ';
            break;
        case 9:
            hundredText = 'девятьсот ';
            break;
    }
    return hundredText;
}

function Unit(a) { //единицы (аргумент - ответ)
    let unitText;
    let ansUnit = a - (Math.floor(a / 10) * 10); //вычисляем единицы
    switch(ansUnit) {
        case 0:
            unitText = ' ';
            break;
        case 1:
            unitText = 'один';
            break;
        case 2:
            unitText = 'два';
            break;
        case 3:
            unitText = 'три';
            break;
        case 4:
            unitText = 'четыре';
            break;
        case 5:
            unitText = 'пять';
            break;
        case 6:
            unitText = 'шесть';
            break;
        case 7:
            unitText = 'семь';
            break;
        case 8:
            unitText = 'восемь';
            break;
        case 9:
            unitText = 'девять';
            break;
    }
    return unitText;
}

function Ten(a) { //десятки (аргумент - ответ)
    let tenText;
    let ansTen = (a - Math.floor(a / 100) * 100 - (a - Math.floor(a / 10) * 10) ) / 10; //вычисляем десятки
    switch(ansTen) {
        case 0:
            tenText = '';
            break;
        case 1:
            tenText = '';
            break;
        case 2:
            tenText = 'двадцать ';
            break;
        case 3:
            tenText = 'тридцать ';
            break;
        case 4:
            tenText = 'сорок ';
            break;
        case 5:
            tenText = 'пятьдесят ';
            break;
        case 6:
            tenText = 'шестьдесят ';
            break;
        case 7:
            tenText = 'семьдесят ';
            break;
        case 8:
            tenText = 'восемьдесят ';
            break;
        case 9:
            tenText = 'девяносто ';
            break;
        default: 
            tenText = '';
    }
    return tenText;
}

function Answer(a) { //формирование числового или текстового ответа
    let answerText = Hundred(a) + Ten(a) + Unit(a);
    //текст для чисел 10-19
    if ( (a - Math.floor(a / 100) * 100 - (a - Math.floor(a / 10) * 10) ) / 10 === 1 ) { //вычисляем десятки
        switch (a - (Math.floor(a / 10) * 10)) {
            case 0:
                answerText = Hundred(a) + 'десять';
                break;
            case 1:
                answerText = Hundred(a) + 'одиннадцать';
                break;
            case 2:
                answerText = Hundred(a) + 'двенадцать';
                break;
            case 3:
                answerText = Hundred(a) + 'тринадцать';
                break;
            case 4:
                answerText = Hundred(a) + 'четырнадцать';
                break;
            case 5:
                answerText = Hundred(a) + 'пятнадцать';
                break;
            case 6:
                answerText = Hundred(a) + 'шестьнадцать';
                break;
            case 7:
                answerText = Hundred(a) + 'семнадцать';
                break;
            case 8:
                answerText = Hundred(a) + 'восемнадцать';
                break;
            case 9:
                answerText = Hundred(a) + 'девятнадцать';
                break;
            default:
                answerText = '';
        }
    }

    answerText = minus ? ('минус ' + answerText) : answerText; //текст для ответа со знаком "-"

    let b = minus ? -a : a; //число в ответе со знаком "-"
    
    if (answerText.length > 20) { //проверка длины строки текстового ответа
        return b;
    } else if ( (answerText == '') || (answerText == ' ') || (answerText == '  ') ) { //число в ответе "0"
        return b;
            } else {
                return answerText;
            }
}

//функции кнопок
btnStart.onclick = function Start() { //кнопка "Начать игру"
    //ввод значений
    (inputMin.value === '') ? (gameRun = false) : (minValue = parseInt(inputMin.value));
    (inputMax.value === '') ? (gameRun = false) : (maxValue = parseInt(inputMax.value));
    //проверка диапазона -999..999
    minValue = (minValue < -999) ? (minValue = -999) : minValue; 
    maxValue = (maxValue > 999) ? (maxValue = 999) : maxValue;

    if ( isNaN(minValue) || isNaN(maxValue) ) { //проверка ввода текста
        err = true;
        phrase.innerText = `Вы ввели не число, будут присвоены значения по умолчанию (0; 100)`;
        minValue = 0;
        maxValue = 100;
    }

    answerNumber = Math.floor((minValue + maxValue) / 2); //находим середину
    orderNumber = 1; //номер вопроса

    if (answerNumber < 0) { //проверка отрицательного числа
        answerNumber = Math.abs(answerNumber);
        minus = true;
    }

    gameRun = true;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${Answer(answerNumber)}, (${(minus ? -answerNumber : answerNumber)})?`;
}

function Retry() { //кнопка "Заново"
    cllpsPhrase();
    phrase.innerText = `Введите значения и нажмите "Начать игру!"`;    
    Start();
}

function Over() { //кнопка "Больше"
    if (gameRun) {
        //debugger;
        if (err) {
            cllpsPhrase();
            err = false;
        }
        if ( (minValue === maxValue) || (minValue > maxValue) ) {
            phraseRandom = Math.round( Math.random() * 2);
            switch (phraseRandom) { //выбор рандомной фразы при неудачном угадывание
                case 0: 
                    answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
                break;
                case 1:
                    answerPhrase = `Я сдаюсь..\n\u{1F927}`;
                break;
                case 2:
                    answerPhrase = 'Какое-то странное число...\n\u{1F925}';
                break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else { //следующая итерация
            minValue = answerNumber  + 1; //увеличение нижнего порога до "середина + 1"
            answerNumber = Math.floor((minValue + maxValue) / 2); //новая середина

            if (answerNumber < 0) { //проверка отрицательного числа
                answerNumber = Math.abs(answerNumber);
                minus = true;
            }

            orderNumber++;
            orderNumberField.innerText = orderNumber;
            phraseRandom = Math.round( Math.random() * 2);
            switch (phraseRandom) { //выбор рандомной фразы при неудачном угадывание
                case 0: 
                    answerPhrase = `Вы загадали число ${Answer(answerNumber)}, (${(minus ? -answerNumber : answerNumber)})?\n\u{1F914}`;
                break;
                case 1:
                    answerPhrase = `Легко! Вы загадали ${Answer(answerNumber)}, (${(minus ? -answerNumber : answerNumber)})?\n\u{1F928}`;
                break;
                case 2:
                    answerPhrase = `Наверное, это число ${Answer(answerNumber)}, (${(minus ? -answerNumber : answerNumber)})?\n\u{1F60E}`;
                break;
            }
            answerField.innerText = answerPhrase;
        }
    }
}

function Less() { //кнопка "Меньше"
    if (gameRun){
        if (err) {
            cllpsPhrase();
            err = false;
        }
        if ( (minValue === maxValue) || (minValue > maxValue) ) {
            phraseRandom = Math.round( Math.random() * 2);
            switch (phraseRandom) { //выбор рандомной фразы при неудачном угадывание
                case 0:
                    answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
                break;
                case 1:
                    answerPhrase = `Я сдаюсь..\n\u{1F927}`;
                break;
                case 2:
                    answerPhrase = 'Какое-то странное число...\n\u{1F925}';
                break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else { //следующая итерация
            maxValue = answerNumber - 1; //уменьшение верхнего порога до "середина - 1"
            answerNumber = Math.floor((minValue + maxValue) / 2); //новая середина

            if (answerNumber < 0) { //проверка отрицательного числа
                answerNumber = Math.abs(answerNumber);
                minus = true;
            }

            orderNumber++;
            orderNumberField.innerText = orderNumber;
            phraseRandom = Math.round( Math.random() * 2);
            switch (phraseRandom) { //выбор рандомной фразы при неудачном угадывание
                case 0: 
                    answerPhrase = `Вы загадали число ${Answer(answerNumber)}, (${(minus ? -answerNumber : answerNumber)})?\n\u{1F914}`;
                break;
                case 1:
                    answerPhrase = `Легко! Вы загадали ${Answer(answerNumber)}, (${(minus ? -answerNumber : answerNumber)})?\n\u{1F928}`;
                break;
                case 2:
                    answerPhrase = `Наверное, это число ${Answer(answerNumber)}, (${(minus ? -answerNumber : answerNumber)})?\n\u{1F60E}`;
                break;
            }
            answerField.innerText = answerPhrase;
        }
    }
}

function Equal() { //кнопка "Верно"
    if (gameRun){
        phraseRandom = Math.round( Math.random() * 2);
            switch (phraseRandom) { //выбор рандомной фразы при неудачном угадывание
                case 0: 
                    answerPhrase = `Я всегда угадываю\n\u{1F917}`;
                break;
                case 1:
                    answerPhrase = `ХА! И снова угадал\n\u{1F913}`;
                break;
                case 2:
                    answerPhrase = `Кто молодец? Я молодец!\n\u{1F60E}`;
                break;
            }
        answerField.innerText = answerPhrase;
        //answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        gameRun = false;
    }
}

btnRetry.addEventListener('click', Retry);
btnOver.addEventListener('click', Over);
btnLess.addEventListener('click', Less);
btnEqual.addEventListener('click', Equal);