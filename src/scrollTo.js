// I found this function here: https://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation


function scrollTo(params) {
  var {
    element,
    to,
    duration,
    scrollDirection,
    listLength
  } = params;
  listLength = (1000/listLength)*2
  var start = element[scrollDirection],
      change = to - start,
      increment = (1000/listLength);
  var animateScroll = function(elapsedTime) {
    elapsedTime += increment;
    var position = easeInOut(elapsedTime, start, change, duration);
    element[scrollDirection] = position;
    if (elapsedTime <= duration) {
      window.requestAnimationFrame(animateScroll.bind(null, elapsedTime))
    }
  };

  animateScroll(0);
  window.requestAnimationFrame(animateScroll.bind(null, 0))
}

function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2;
  if (currentTime < 1) {
    return change / 2 * currentTime + currentTime + start;
  }
  currentTime -= 1;
  return -change /2 * (currentTime * (currentTime -2) - 1) + start;
}

export default scrollTo;
