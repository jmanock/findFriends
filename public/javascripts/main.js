(function(){
  $('#loader').hide();
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      var search = $(this).val().toUpperCase();
      var split = search.split(' ');
      var firstName = split[0];
      var lastName = split[1];
      var firstChar = lastName.charAt(0).toLowerCase();
      /*
        ~ Caps on text box
        ~ Return more info
        ~ Loader
        ~ Clear text after enter
        ~ look for a space
      */
      var params = {
        firstName:firstName,
        lastName:lastName,
        firstChar:firstChar
      };
      $.get('/searching', params, function(data){
        if(data instanceof Array){
          // for each over 1
          for(var i = 0; i<data.length; i++){
            $('#results').append('<li><a href="#">'+data[i].name+'</a>'+data[i].id+'</li>');
          }
        }
        $('#results').on('click', function(){
          console.log(this);
        });
        // $.get('/results', paramers, function(data){
        //
        // });// End `Get Results`
      });// End `Get Searching`
    }
  });// End `KeyUp`

})();
