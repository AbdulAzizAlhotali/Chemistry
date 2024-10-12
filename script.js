const elements = [
    { name: 'هيدروجين', symbol: 'H', oxidation_state: 1 },
    { name: 'ليثيوم', symbol: 'Li', oxidation_state: 1 },
    { name: 'صوديوم', symbol: 'Na', oxidation_state: 1 },
    { name: 'بوتاسيوم', symbol: 'K', oxidation_state: 1 },
    { name: 'روبيديوم', symbol: 'Rb', oxidation_state: 1 },
    { name: 'سيزيوم', symbol: 'Cs', oxidation_state: 1 },
    { name: 'بيريليوم', symbol: 'Be', oxidation_state: 2 },
    { name: 'ماغنسيوم', symbol: 'Mg', oxidation_state: 2 },
    { name: 'كالسيوم', symbol: 'Ca', oxidation_state: 2 },
    { name: 'سترونتيوم', symbol: 'Sr', oxidation_state: 2 },
    { name: 'باريوم', symbol: 'Ba', oxidation_state: 2 },
    { name: 'الومنيوم', symbol: 'Al', oxidation_state: 3 },
    { name: 'نيتروجين', symbol: 'N', oxidation_state: -3 },
    { name: 'فوسفور', symbol: 'P', oxidation_state: -3 },
    { name: 'زرنيخ', symbol: 'As', oxidation_state: -3 },
    { name: 'أكسجين', symbol: 'O', oxidation_state: -2 },
    { name: 'كبريت', symbol: 'S', oxidation_state: -2 },
    { name: 'سيلينيوم', symbol: 'Se', oxidation_state: -2 },
    { name: 'تيلوريوم', symbol: 'Te', oxidation_state: -2 },
    { name: 'فلور', symbol: 'F', oxidation_state: -1 },
    { name: 'كلور', symbol: 'Cl', oxidation_state: -1 },
    { name: 'بروم', symbol: 'Br', oxidation_state: -1 },
    { name: 'يود', symbol: 'I', oxidation_state: -1 },


    { name: 'حديد الثنائي', symbol: 'Fe', oxidation_state: 2 },
    { name: 'حديد الثلاثي', symbol: 'Fe', oxidation_state: 3 },
    { name: 'نحاس الأحادي', symbol: 'Cu', oxidation_state: 1 },
    { name: 'نحاس الثنائي', symbol: 'Cu', oxidation_state: 2 },
    { name: 'فضة', symbol: 'Ag', oxidation_state: 1 },
    { name: 'خارصين', symbol: 'Zn', oxidation_state: 2 },

    // { name: 'أمونيوم', symbol: 'NH₄', oxidation_state: 1 },
    // { name: 'نتريت', symbol: 'NO₂', oxidation_state: -1 },
    // { name: 'نترات', symbol: 'NO₃', oxidation_state: -1 },
    // { name: 'هيدروكسيد', symbol: 'OH', oxidation_state: -1 },
    // { name: 'بيكربونات', symbol: 'HCO₃', oxidation_state: -1 },
    // { name: 'كربونات', symbol: 'CO₃', oxidation_state: -2 },
    // { name: 'كبريتيت', symbol: 'SO₃', oxidation_state: -2 },
    // { name: 'كبريتات', symbol: 'SO₄', oxidation_state: -2 },
];

// const polyatomicIons = [
//     { name: 'أمونيوم', symbol: 'NH₄', oxidation_state: 1 },
//     { name: 'نتريت', symbol: 'NO₂', oxidation_state: -1 },
//     { name: 'نترات', symbol: 'NO₃', oxidation_state: -1 },
//     { name: 'هيدروكسيد', symbol: 'OH', oxidation_state: -1 },
//     { name: 'بيكربونات', symbol: 'HCO₃', oxidation_state: -1 },
//     { name: 'كربونات', symbol: 'CO₃', oxidation_state: -2 },
//     { name: 'كبريتيت', symbol: 'SO₃', oxidation_state: -2 },
//     { name: 'كبريتات', symbol: 'SO₄', oxidation_state: -2 }
// ];

function isPolyatomic(symbol) {
    // return polyatomicIons.some(ion => ion.symbol === symbol);
    return false;
}

const positiveElements = elements.filter(element => element.oxidation_state > 0);
const negativeElements = elements.filter(element => element.oxidation_state < 0);

const subscriptDigits = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
};

function getRandomElements() {
    const element1 = positiveElements[Math.floor(Math.random() * positiveElements.length)];
    const element2 = negativeElements[Math.floor(Math.random() * negativeElements.length)];
    return { element1, element2 };
}

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function toSubscript(number) {
    return String(number).split('').map(digit => subscriptDigits[digit]).join('');
}

function getFormula(element1, element2) {
    const symbol1 = element1.symbol;
    const symbol2 = element2.symbol;
    const ox1 = element1.oxidation_state;
    const ox2 = element2.oxidation_state;

    const gcdVal = gcd(Math.abs(ox1), Math.abs(ox2));
    const ratio1 = Math.abs(ox2) / gcdVal;
    const ratio2 = Math.abs(ox1) / gcdVal;

    let formula;
    let part1;
    let part2;

    if (isPolyatomic(symbol1) && ratio1 > 1) {
        part1 = `(${symbol1})${ratio1 > 1 ? toSubscript(ratio1) : ''}`;
    } else {
        part1 = `${symbol1}${ratio1 > 1 ? toSubscript(ratio1) : ''}`;
    }

    if (isPolyatomic(symbol2) && ratio2 > 1) {
        part2 = `(${symbol2})${ratio2 > 1 ? toSubscript(ratio2) : ''}`;
    } else {
        part2 = `${symbol2}${ratio2 > 1 ? toSubscript(ratio2) : ''}`;
    }

    formula = `${part1}${part2}`;

    return formula;
}

let timer;
let timeLeft = 60;
let currentQuestion;
let lastTexts = [];

function startTimer() {
    const { element1, element2 } = currentQuestion
    timer = setInterval(() => {
        timeLeft--;
        document.getElementsByClassName('timer_sec')[1].textContent = `${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult(false, getFormula(element1, element2));
        }
    }, 1000);
}

function showResult(isCorrect, correctFormula) {
    swal({
        title: isCorrect ? "إجابة صحيحة" : "إجابة خاطئة",
        text: isCorrect ? "تم زيادة نقطة في رصيدك" : `تم خصم نقطة من رصيدك، الإجابة الصحيحة هي ${correctFormula}`,
        icon: isCorrect ? "success" : "error",
    }).then((value) => {
        resetQuiz();
    });
    let grade = document.getElementById("grade")
    if (isCorrect) {
        grade.textContent = (parseInt(grade.textContent) + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    } else {
        grade.textContent = (parseInt(grade.textContent) - 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    }
}

function resetQuiz() {
    timeLeft = 60;
    document.getElementById("answer").value = ""
    lastTexts = []
    document.getElementsByClassName('timer_sec')[1].textContent = `${timeLeft}`;
    startQuiz();
}

function startQuiz() {
    clearInterval(timer);
    const { element1, element2 } = getRandomElements();
    currentQuestion = {
        element1,
        element2,
        correctFormula: getFormula(element1, element2)
    };
    document.getElementsByClassName('question')[0].textContent = `ما هو المركب الآيوني الناتج من تفاعل ال${element1.name} مع ال${element2.name}؟`;
    document.getElementById("firstButton").textContent = element2.symbol
    document.getElementById("secondButton").textContent = element1.symbol
    startTimer();
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const btns = document.querySelectorAll('button')
btns.forEach(btn => {
    btn.addEventListener('click', event => {
        let input = document.getElementById("answer")
        const { element1, element2 } = currentQuestion
        if (event.target.id !== "submit" && event.target.id !== "backspace") {
            let textContent = event.target.textContent
            if (!isNaN(textContent)) {
                // number
                let lastText = lastTexts[lastTexts.length - 1]
                if (isPolyatomic(lastText)) {
                    lastTexts.push(subscriptDigits[textContent])
                    lastTexts[lastTexts.length - 2] = `(${lastTexts[lastTexts.length - 2]})`
                    input.value = lastTexts.join("")
                } else {
                    input.value += subscriptDigits[textContent]
                    lastTexts.push(subscriptDigits[textContent])
                }
            } else {
                // element
                input.value += textContent
                lastTexts.push(textContent)
            }
        } else if (event.target.id == "submit") {
            showResult(input.value == getFormula(element1, element2), getFormula(element1, element2))
        } else {
            if (lastTexts.length == 0) return
            let lastText = lastTexts[lastTexts.length - 1]
            let lastedText = lastTexts[lastTexts.length - 2]?.slice(1, -1)
            if (Object.values(subscriptDigits).includes(lastText) && isPolyatomic(lastedText)) {
                lastTexts.pop()
                lastTexts[lastTexts.length - 1] = lastedText
                input.value = lastTexts.join("")
            } else {
                lastTexts.pop()
                input.value = lastTexts.join("")
            }
        }
    });
});
startQuiz();
