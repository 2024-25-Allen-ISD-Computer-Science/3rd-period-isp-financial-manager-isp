document.addEventListener('DOMContentLoaded',function(event){

    var dataText = [ "budget", "save", "invest", "succeed." ];
    function typeWriter(text, i, fnCallback) {

        if (i < (text.length)) {

         document.getElementById('typewrite').innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
    
          setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
          }, 150);
        }

        else if (typeof fnCallback == 'function') {

          setTimeout(fnCallback, 1500);
        }
      }

       function StartTextAnimation(i) {
         if (typeof dataText[i] == 'undefined'){
            setTimeout(function() {
              StartTextAnimation(0);
            }, 20000);
         }

        if (i < dataText[i].length) {
            typeWriter(dataText[i], 0, function(){
                StartTextAnimation(i + 1);
            });
        }
    }

    StartTextAnimation(0);
});