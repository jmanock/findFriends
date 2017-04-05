(function(){
  $('#loader').hide();
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      var search = $(this).val().toUpperCase();
      var split = search.split(' ');
      var firstName = split[0];
      var lastName = split[1];
      var firstChar = lastName.charAt(0).toLowerCase();

      var params = {
        firstName:firstName,
        lastName:lastName,
        firstChar:firstChar
      };
      $.get('/searching', params, function(data){
        $(data).each(function(i,k){
          //$('#results').append('<li><a href="#">'+data+'</a></li>');
          console.log(data);
        });
        $('#results').append('<li><a href="#">'+data+'</a></li>');
      });// End `Get`
    }
  });// End `KeyUp`
})();
