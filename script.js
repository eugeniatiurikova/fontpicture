const letters = document.querySelectorAll("div.letter");
const smallNames = document.querySelectorAll("div.small");
const vertNames = document.querySelectorAll("div.smallvert");
const mainLetter = document.querySelectorAll("div.mainletter");
const bigTexts = document.querySelectorAll("div.bigtext");
const node = document.getElementById('capture');

document.getElementById('sliderLetters').addEventListener('input', function (e) {
    let scaleValue = e.target.value;
    for (let i = 0; i < letters.length; i++) {
        letters[i].style.fontSize = 165 * scaleValue + 'px';
    }
});

document.getElementById('sliderMain').addEventListener('input', function (e) {
    let scaleMain = e.target.value;
    mainLetter[0].style.fontSize = 565 * scaleMain + 'px';
});

document.getElementById('sliderLettersPos').addEventListener('input', function (e) {
    let scaleValueLettersPos = e.target.value;
    for (let i = 0; i < letters.length; i++) {
        letters[i].style.marginTop = scaleValueLettersPos + 'px';
    }
});

document.getElementById('sliderMainPos').addEventListener('input', function (e) {
    let scaleValueMainPos = e.target.value;
    mainLetter[0].style.marginTop = scaleValueMainPos + 'px';
});

document.getElementById('sliderWords').addEventListener('input', function (e) {
    let scaleValueL = e.target.value;
    for (let i = 0; i < smallNames.length; i++) {
        smallNames[i].style.fontSize = 21 * scaleValueL + 'px';
    }
    for (let i = 0; i < vertNames.length; i++) {
        vertNames[i].style.fontSize = 38 * scaleValueL + 'px';
    }
    for (let i = 0; i < bigTexts.length; i++) {
        bigTexts[i].style.fontSize = 75 * scaleValueL + 'px';
    }
});

document.getElementById('sliderWordsPos').addEventListener('input', function (e) {
    let scaleValueWordsPos = e.target.value;
    bigTexts[0].style.bottom = scaleValueWordsPos + 'px';
});

function capture() {
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'captured-image.png';
            link.click();
        })
        .catch(function (error) {
            console.error('Произошла ошибка при создании изображения', error);
        });
}

// function capture() {
//     var font = new FontFaceObserver('temporaryfont', {});
//     font.load().then(function () {
//         domtoimage.toPng(node)
//             .then(function (dataUrl) {
//                 var link = document.createElement('a');
//                 link.href = dataUrl;
//                 link.download = 'captured-image.png';
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//             })
//             .catch(function (error) {
//                 console.error('Произошла ошибка при создании изображения', error);
//             });
//     });
// }


//  Обработка загрузки шрифта

function dragOverHandler(event) {
    event.preventDefault();
}

function dropHandler(event) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file && isCorrectType(file.name)) {
        applyFont(file);
    } else {
        alert('Пожалуйста, загрузите файл в формате WOFF, TTF или OTF');
    }
}

function isCorrectType(fileName) {
    if (fileName.toLowerCase().endsWith('.woff')) return 'woff'
    else if (fileName.toLowerCase().endsWith('.otf')) return 'otf'
    else if (fileName.toLowerCase().endsWith('.ttf')) return 'ttf'
    else return false;
}

async function applyFont(fontFile) {
    const fontDataUrl = await readFileAsDataURL(fontFile);
    const fontFace = new FontFace('temporaryfont', `url(${fontDataUrl})`);

    fontFace.load().then(function (loadedFace) {
        document.fonts.add(loadedFace);
        node.style.fontFamily = 'temporaryfont, Arial, sans-serif';
    }).catch(function (error) {
        console.error('Ошибка загрузки шрифта:', error);
    });
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            resolve(e.target.result);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}