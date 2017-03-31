$('.portfolio').owlCarousel({
    loop: true,
    autoplay: false,
    margin: 10,
    center: true,
    autoWidth: true
});

document.getElementById("sendEmail").onclick = function() {
    var inputName = document.getElementById("emailInput").value;
    var inputMessage = document.getElementById("messageInput").value;

    if (inputName.includes("@") && inputMessage != "") {
      emailjs.send("gmail","main_template",{name: inputName, notes: inputMessage})
      .then(function(response) {
        alert("Message successfully sent!")
      }, function(err) {
        alert("Message failed to send, please contact binit@graph.house");
      });
    } else {
      alert("One of the input fields is empty.");
    }
}

var xmlns="http://www.w3.org/2000/svg", 
    select = function(s) {
        return document.querySelector(s);
    },
    selectAll = function(s) {
        return document.querySelectorAll(s);
    }, 
    logo = select('.logo'), 
    homepage = select('.homepage'),
    content = select('.content');

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
    top:'51%',
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

TweenMax.set('svg', {
  visibility:'visible'
});
