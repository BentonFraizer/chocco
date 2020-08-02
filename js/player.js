let player;
const playerContainer = $('.player');

let eventsInit = () => {
  $('.player__start').click (e => {
    e.preventDefault();

    if (playerContainer.hasClass('paused')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $('.player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPersent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPersent;

    $('.player__playback-button').css({
      left: `${newButtonPositionPersent}%`
    });

    player.seekTo(newPlaybackPositionSec)
  });

  $('.player__splash').click(e => {
    player.playVideo();
  })
}
// переводим продолжительность видео в секунды
const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime/60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;
}
// получаем продолжительность видео
const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  $('.player__duration-estimate').text(formatTime(durationSec));

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $('.player__playback-button').css({
      left: `${completedPercent}%`
    });

    $('.player__duration-completed').text(formatTime(completedSec));
  }, 1000);
}

const onPlayerStateChange = event => {
  /*
    -1 – воспроизведение видео не началось
    0 – воспроизведение видео завершено
    1 – воспроизведение
    2 – пауза
    3 – буферизация
    5 – видео находится в очереди
  */
  switch (event.data) {
    case 1:
      playerContainer.addClass('active');
      playerContainer.addClass('paused');
      break;

    case 2:
      playerContainer.removeClass('active');
      playerContainer.removeClass('paused');
      break;
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'Gb0TQ7VeApY',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();