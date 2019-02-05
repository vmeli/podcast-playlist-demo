var arrayMolPostFormat4  = document.querySelectorAll('.mol-post_Format4'),
    titleModal           = document.getElementById("renameTitleProgram"),
    compModalAudioPlayer = document.getElementById('comp_modalAudioplayer'),
    btnPlay              = document.getElementById('play'),
    btnForward           = document.getElementById('forward'),
    btnBackward          = document.getElementById('backward'),
    count                = 1;

arrayMolPostFormat4.forEach(function(item) {
  item.addEventListener('click', eventPodcast);
})

btnPlay.addEventListener('click', modalPlaying);

btnBackward.addEventListener('click', function() {
    audio.currentTime -= 5;
})

btnForward.addEventListener('click', function() {
    audio.currentTime += 5;
})
function convertTime(time) {
  var minute = Math.floor(time / 60 % 60).toString().padStart(2,"0");
  var second = Math.floor(time % 60).toString().padStart(2,"0");
  return minute + ":" + second; 
}

function modalPlaying(e) {
  if(document.getElementById('audio').paused) {
    //compModalAudioPlayer.classList.add('active-audio')
    console.log("estoy escuchando", e.target, document.getElementById('audio').paused);
    document.querySelector("#play").classList.value = "icon-pause";
    document.getElementById('audio').play();

    arrayMolPostFormat4.forEach(function(item) {
        //parentTargetElement.classList.toggle('active-audio');
        if(item.classList.value.includes("active-audio")) {
          item.querySelector('#icon-volume').classList.value="icon-active";
        }
  })


  }else {
    //arrayMolPostFormat4.forEach(function(item) {
      //item.classList.remove('active-audio');
    //})
    //compModalAudioPlayer.classList.remove('active-audio');
    console.log("estoy pausado", e.target, document.getElementById('audio').paused);
    document.querySelector("#play").classList.value = "icon-play";
    document.getElementById('audio').pause();

     arrayMolPostFormat4.forEach(function(item) {
        //parentTargetElement.classList.toggle('active-audio');
        if(item.classList.value.includes("active-audio")) {
          item.querySelector('#icon-volume').classList.value="icon-inactive";
        }
  })
  }
}

function playing(parentElement, audio) {
  if(parentElement.classList.value.includes("active-audio")) {
    console.log('modal-play');
  }else {
    console.log('modal-pause');
    //audio.pause();
  }
}

function getDuration(src, destination) {
  let audio = new Audio();
   audio.addEventListener('loadedmetadata', function(){
        destination.innerHTML = convertTime(audio.duration);      
  });
  audio.setAttribute('src', src);
}

function eventPodcast(e) {

  if(count === 1) {
    compModalAudioPlayer.classList.add('active-podcasts');
    compModalAudioPlayer.classList.add('active-audio');

    //audio.play();
  }

  var targetElement = e.target;

  console.log(targetElement, "target");
  if(e.target.nodeName == 'H3' || (e.target.nodeName == 'DIV' && e.target.className == 'Format4__content')) {
    targetElement = e.target.parentNode;
    console.log(targetElement,"parentNodeIf");
  }else if(e.target.nodeName == 'ARTICLE'){
    targetElement = e.target;    
    console.log(targetElement,"parentNodeelseIf");
  }else {
    targetElement = e.target.parentNode.parentNode;
    console.log(targetElement,"parentNodeElse");
  }

  var   audioplayer         = targetElement.getAttribute('data-audioplayer'),
        audio               = document.getElementById('audio'),
        sourceAudio         = document.getElementById('sourceAudio'),
        endTime             = document.getElementById("end"),
        starTime            = document.getElementById("start"),
        seekbarInner        = document.querySelector(".seekbarControl .inner"),
        seekbarOuter        = document.querySelector(".seekbarControl .outer");

  var length;

  arrayMolPostFormat4.forEach(function(item) {
    if(item == targetElement) {
      
      targetElement.classList.add('active-audio');
      item.querySelector('#icon-volume').classList.value="icon-active";
      console.log("igual");
    }else {
      item.classList.remove('active-audio');
      item.querySelector('#icon-volume').classList.value="icon-inactive";
      console.log("distinto");
    }
  })

  headline = targetElement.querySelector('.Format4__title').textContent.trim();
  titleModal.innerHTML = headline;

  //PARA Q NO RECARGUE EL AUDIO AL DAR CLICK A LOS ITEM
 if(sourceAudio.getAttribute('src') != audioplayer) {
      sourceAudio.setAttribute('src', audioplayer);
      audio.load(audioplayer);
      console.log('rutas diferentes',targetElement);
      audio.play();
      targetElement.querySelector('#icon-volume').classList.value = "icon-active";
      document.querySelector("#play").classList.value = "icon-pause";

  }else {
    console.log('rutas iguales');
    
     if(audio.paused) {
       console.log('item if',targetElement);
       targetElement.querySelector('#icon-volume').classList.value = "icon-active";
       document.querySelector("#play").classList.value = "icon-pause";
       audio.play();
     }else {
       console.log('item else',targetElement);
       console.log("estoy pausado", e.target, document.getElementById('audio').paused);
       document.querySelector("#play").classList.value = "icon-play";
       targetElement.querySelector('#icon-volume').classList.value = "icon-inactive";
       audio.pause();
     }

  }


     if(audio.duration) {
        length = audio.duration;        
        endTime.innerHTML = convertTime(audio.duration);
    }else {
      audio.addEventListener('loadedmetadata', function(e){
        length = audio.duration;
        endTime.innerHTML = convertTime(audio.duration);      
      })
    }

 //playing(targetElement, audio); 

  audio.addEventListener('timeupdate', updateSeekBar);
  seekbarOuter.addEventListener('click', progressSeekBarOuter);

  function getPercentage(presentTime, totalLength) {
      var clacPercentage = (presentTime / totalLength)*100;
      return parseFloat(clacPercentage.toString());
    }
    
    function updateSeekBar(e) {
      starTime.innerHTML = convertTime(audio.currentTime);
      seekbarPercentage = getPercentage(audio.currentTime.toFixed(2), audio.duration.toFixed(2));
      seekbarInner.style.width = seekbarPercentage + '%';
    }

    function progressSeekBarOuter(e) {
      console.log(e.target);
      if (!audio.ended && length !== undefined) {
          console.log("entrada 1");
          var seekPosition = e.pageX - seekbarOuter.offsetLeft;
          console.log(e.pageX, seekbarOuter.offsetLeft);
          //if(seekPosition >=0 && seekPosition < seekbarOuter.offsetLeft) {
          console.log("entrada 2");
          audio.currentTime = (seekPosition * audio.duration) / seekbarOuter.offsetWidth;
          updateSeekBar();
          //}
          //console.log(seekPosition, seekbarOuter.offsetLeft);
      }
    }
} 