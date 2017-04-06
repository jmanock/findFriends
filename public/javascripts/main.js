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
      */
      var params = {
        firstName:firstName,
        lastName:lastName,
        firstChar:firstChar
      };
      $.get('/searching', params, function(data){
        $('#results').append('<li><a href="#">'+data+'</a></li>');
      });// End `Get`
    }
  });// End `KeyUp`
})();
