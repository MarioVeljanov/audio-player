let audio = document.getElementById("audio"); // Берём элемент audio
let audioTrack = document.querySelector(".audio_track"); // Берём аудио дорожку
let time = document.querySelector(".time"); // Берём аудио дорожку
let timeFollow = document.querySelector(".time_follow");
let btnPlay = document.querySelector(".play"); // Берём кнопку проигрывания
let btnPrev = document.querySelector(".prev"); // Берём кнопку переключения предыдущего трека
let btnNext = document.querySelector(".next"); // Берём кнопку переключение следующего трека
let fullTime = document.querySelector(".all_time");
let actualTime = document.querySelector(".current_time");
let range = document.getElementById("range");
let imageSlider = document.getElementById("img");
let imageSliderTwo = document.querySelector(".music_img");
let artist = document.querySelector(".mucic_name");
let songName = document.querySelector(".mucic_title");
console.log(imageSlider)
let isPlay = false;


const playlist = [
    'beyonce.mp3',
    'dontstartnow.mp3'
];


const artistName = {
  "beyonce.mp3": ["lemonade.png", "Beyonce", "Don't Hurt Yorself"],
  "dontstartnow.mp3": ["dontstartnow.png", "Dua Lipa", "Don't Start Now"],
};

let treck;
window.onload = function() {
    treck = 0;
};


document.getElementById("audio");
audio.onloadeddata = () => {
  fullTime.innerHTML =
    Math.floor(Math.round(audio.duration) / 60 ) + " : " + 
    Math.floor(+Math.round(audio.duration)  % 60);

    setInterval(function() {
      actualTime.innerHTML = Math.floor(+Math.round(audio.currentTime) % 60) < 10 ?
       Math.floor(Math.round(audio.currentTime) / 60) + " : " + '0' + Math.floor(+Math.round(audio.currentTime) % 60)
        : Math.floor(Math.round(audio.currentTime) / 60) + " : " + Math.floor(+Math.round(audio.currentTime) % 60);

    }, 1000)
    
};


function switchTreck(numTreck) {
  // Меняем значение атрибута src
  audio.src = "./assets/audio/" + playlist[numTreck];
  // Назначаем время песни ноль
  audio.currentTime = 0

  //imge
  imageSlider.src = "./assets/img/" + artistName[playlist[numTreck]][0];
  imageSliderTwo.src = "./assets/img/" + artistName[playlist[numTreck]][0];
  artist.innerHTML = artistName[playlist[numTreck]][1];
  songName.innerHTML = artistName[playlist[numTreck]][2];

  // Включаем песню
  isPlay = false;
  playPauseMucic();
   
}



function playPauseMucic(e) {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    btnPlay.src = "./assets/svg/pause.png";
    imageSliderTwo.style.transform = "scale(1.1)";
    imageSliderTwo.style.transition = "linear 0.8s";
  } else {
    audio.pause();
    isPlay = false;
    btnPlay.src = "./assets/svg/play.png";
    imageSliderTwo.style.transform = "scale(1)";
    imageSliderTwo.style.transition = "linear 0.8s";
  }

  /*  Запуск интервала
    audioPlay = setInterval(function () {
        
      // Получаем значение на какой секунде песня
      let audioTime = Math.round(audio.currentTime);
      // Получаем всё время песни
      let audioLength = Math.round(audio.duration);
      // Назначаем ширину элементу time
      // time.style.width = (audioTime * 100) / audioLength + '%';
      time.value = (audioTime * 100) / audioLength;
      // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
      // И проверяем что переменная treck меньше четырёх
      if (audioTime == audioLength && treck < playlist.length - 1) {
        treck++; // То Увеличиваем переменную
        switchTreck(treck); // Меняем трек
        // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
      } else if (audioTime == audioLength && treck >= playlist.length + 1) {
        treck = 0; // То присваиваем treck ноль
        switchTreck(treck); //Меняем трек
      }
    }, 10); */
}


btnPlay.addEventListener("click", playPauseMucic);



btnPrev.addEventListener("click", function () {
  // Проверяем что переменная treck больше нуля
  if (treck > 0) {
    treck--; // Если верно, то уменьшаем переменную на один
    switchTreck(treck); // Меняем песню.
  } else {
    // Иначе
    treck = playlist.length - 1; // Присваиваем три
    switchTreck(treck); // Меняем песню
  }
});

btnNext.addEventListener("click", function () {
  // Проверяем что переменная treck больше трёх
  if (treck < playlist.length - 1 ) {
    // Если да, то
    treck++; // Увеличиваем её на один
    switchTreck(treck); // Меняем песню
  } else {
    // Иначе
    treck = 0; // Присваиваем ей ноль
    switchTreck(treck); // Меняем песню
  }
});

function updatePorggres(e) {
//   let { duration, currentTime } = e.srcElement;
    let duration = Math.round(audio.duration);
    let currentTime = Math.round(audio.currentTime);
    let progresPercent = (currentTime / duration) * 100;
    time.style.width = progresPercent + "%";
    timeFollow.style.left = progresPercent + "%";
    if (duration == currentTime && treck < playlist.length - 1) {
        treck++; // То Увеличиваем переменную
        switchTreck(treck); // Меняем трек
        // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
      } else if (duration == currentTime && treck >= playlist.length - 1) {
        treck = 0; // То присваиваем treck ноль
        switchTreck(treck); //Меняем трек
      }
}

audio.addEventListener("timeupdate", updatePorggres);


audioTrack.addEventListener('click', function(e) {
    let width = e.currentTarget.clientWidth;
    let clickX = e.offsetX;
    let duration = audio.duration;


    audio.currentTime = (clickX / width) * duration;
});

range.addEventListener('input', function(e) {
  audio.volume = e.currentTarget.value / 100;
  
})


