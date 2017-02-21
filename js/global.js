$('.portfolio').owlCarousel({
    loop: true,
    autoplay: false,
    margin: 10,
    center: true,
    autoWidth: true
});

var xmlns="http://www.w3.org/2000/svg", 
    select = function(s) {
        return document.querySelector(s);
    },
    selectAll = function(s) {
        return document.querySelectorAll(s);
    }, 
    logo = select('.logo'), 
    homepage = select('.homepage'),
    content = select('.content'),
    ripple = select('.ripple'), 
    whiteFoamGroup = selectAll('.whiteFoamGroup use'), 
    lightBlueFoamGroup = selectAll('.lightBlueFoamGroup use'),
    darkBlueFoamGroup = selectAll('.darkBlueFoamGroup use'),
    splashGroup = selectAll('.splashGroup use');

var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};

//center
TweenMax.set([logo], {
    position:'absolute',
    top:'50%',
    left:'50%',
    xPercent:-50,
    yPercent:-50
});

TweenMax.set([homepage], {
    position:'absolute',
    top:'50%',
    left:'50%',
    xPercent:-50,
    yPercent:-50
});

TweenMax.set([content], {
    position:'absolute',
    top:'100%',
    left:'50%',
    xPercent:-50,
    yPercent:0
});

TweenMax.set(splashGroup, {
  transformOrigin:'50% 50%',
  fill:'#FFF'
});

var foamTl = new TimelineMax({repeat:-1, yoyo:true, repeatDelay:1});

var rippleTl = new TimelineMax({repeat:-1, onRepeat:changeRipple});
rippleTl.to(ripple, 2.7, {
  y:320,
  x:-225,
  ease:Linear.easeNone
});

animateFoam(whiteFoamGroup,'#FFF', [-5, 1], 0.6 );
animateFoam(lightBlueFoamGroup,'#7EE7F9', [28, 40], 2 );
animateFoam(darkBlueFoamGroup,'#52E1F1', [63, 73], 3 );
foamTl.timeScale(1);
var myTimeline = new TimelineMax({repeat:-1, repeatDelay:1});
myTimeline.timeScale(6);
myTimeline.add(foamTl, 0);
myTimeline.add(rippleTl, 0);



function animateFoam(el, col, range, scaleMax){
  forEach(el, function(e, c){
  var initScale = Math.random() + scaleMax;
  TweenMax.set(c, {
    x:e * 23,
    scale:initScale,
    y:randomBetween(range[0], range[1]),
    transformOrigin:'50% 50%',
    fill:col
  });
  var t = new TimelineMax({repeat:-1, yoyo:true});
  t.to(c, Math.random()*3 + 3, {
    scale:2,
    ease:Sine.easeInOut
  })
  .to(c, Math.random() * 3 + 3, {
    scale:initScale,
    ease:Sine.easeInOut
  });
  
  foamTl.add(t, e/100);
});  
  
}

forEach(splashGroup, makeSplash);

function makeSplash(i, p, posX){
  
  //console.log(posX)
  if(!posX){
    posX =  randomBetween(-10, 240);
  }

  //console.log(e, p)
  var angle = randomBetween(-134, 0);
  var vel = randomBetween(10, 50);
  var tl = new TimelineMax({repeat:0, onComplete:changeSplashPosX, onCompleteParams:[p]});
  
  tl.set(p, {
    scale:randomBetween(0.1, 1.6)/10,
    y:-30,
    x:posX
  })
  .to(p, randomBetween(12, 16), { 
    scale:0,
  physics2D:{
    velocity:vel, 
    angle:angle, 
    acceleration:angle, 
    gravity:12, 
    accelerationAngle:angle
  }
});
  

  tl.timeScale(myTimeline.timeScale());
  p.id = i;
}

function changeSplashPosX(p){

  makeSplash(p.id, p,  randomBetween(-10, 240));

}

function changeRipple(){
  
  if(ripple.getAttribute('fill') == '#98E9FA'){
    ripple.setAttribute('fill', '#6ADFF7');
  } else{
    ripple.setAttribute('fill', '#98E9FA');
    
  }
}

function randomBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

TweenMax.set('svg', {
  visibility:'visible'
});
