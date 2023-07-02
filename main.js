let bg = document.querySelector('.mouse-parallax-bg');
let card1 = document.querySelector('.mouse-parallax-card-1');

window.addEventListener('mousemove', function (e) {
  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;
  bg.style.transform = 'translate(-' + x * 20 + 'px, -' + y * 20 + 'px)';
  card1.style.transform = 'translate(+' + x * 10 + 'px, -' + y * 10 + 'px)';
});
