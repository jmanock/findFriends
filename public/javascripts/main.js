(function(){
  var FindFriends = function(){

    var startSetup = function(){
      $('#loader').hide();
      $('#address').hide();
      $(ZipCode).each(function(i,k){
        $('#results').append('<li><a href=#>'+k.zip+'</li>');
      });
    };

    var SearchZip = function(){
      // Need to show list if nothing in the list
      // Should be able to use this again with address
      $('#search').on('keyup', function(){
        var filter = $(this).val(), count = 0;
        $('li > a').each(function(){
          if($(this).text().search(new RegExp(filter, "i"))<0){
            $(this).fadeOut();
          }else{
            $(this).show();
            count++
          }
        });
      });
      $('li a').on('click', function(e){
        e.preventDefault();

        feed.loadFeed();
        var parameters = {
          search:$(this).text()
        };

        $.get('/searching', parameters, function(data){
          Address(data);
        });
      });
    };

    var Address = function(data){
      // Should be able to run search on this
      $(data).each(function(i,k){
        $('#addressResults').append('<li><a href=#>'+k+'</li>');
      });
      AddressSearch();
    };

    var AddressSearch = function(){
      $('#addressSearch').on('keyup', function(){
        var filter = $(this).val().toUpperCase(), count = 0;
        $('li > a').each(function(){
          if($(this).text().search(new RegExp(filter, "i"))<0){
            $(this).fadeOut();
          }else{
            $(this).show();
            count++;
          }
        });
      });
      $('li > a').on('click', function(){
        var parameters = {
          search:$(this).text()
        };
        $.get('/address', parameters, function(data){
          // Send to another function
        });
      });
    };

    var feed = {
      init:function(){
        startSetup();
        this.bindUI();
      },
      bindUI:function(){
        SearchZip()
      },
      loadFeed:function(){
        $(document).ajaxStart(function(){
          $('#zip').fadeOut('slow');
          $('#loader').css('display', 'block');
        }).ajaxStop(function(){
          $('#address').fadeIn('slow');
          $('#loader').css('display', 'none');
        });
      }
    }
    return feed;
  };

  $(function(){
    var Start = new FindFriends();
    Start.init();
  });
})();

var ZipCode = [
  {zip:32003},
  {zip:32007},
  {zip:32008},
  {zip:32009},
  {zip:32011},
  {zip:32020},
  {zip:32024},
  {zip:32025},
  {zip:32026},
  {zip:32033},
  {zip:32034},
  {zip:32038},
  {zip:32040},
  {zip:32043},
  {zip:32044},
  {zip:32046},
  {zip:32052},
  {zip:32053},
  {zip:32054},
  {zip:32055},
  {zip:32058},
  {zip:32059},
  {zip:32060},
  {zip:32061},
  {zip:32062},
  {zip:32063},
  {zip:32064},
  {zip:32065},
  {zip:32066},
  {zip:32068},
  {zip:32071},
  {zip:32073},
  {zip:32079},
  {zip:32080},
  {zip:32081},
  {zip:32082},
  {zip:32083},
  {zip:32084},
  {zip:32085},
  {zip:32086},
  {zip:32087},
  {zip:32091},
  {zip:32092},
  {zip:32094},
  {zip:32095},
  {zip:32096},
  {zip:32097},
  {zip:32102},
  {zip:32110},
  {zip:32112},
  {zip:32113},
  {zip:32114},
  {zip:32116},
  {zip:32117},
  {zip:32118},
  {zip:32119},
  {zip:32123},
  {zip:32124},
  {zip:32127},
  {zip:32128},
  {zip:32129},
  {zip:32130},
  {zip:32131},
  {zip:32132},
  {zip:32133},
  {zip:32134},
  {zip:32136},
  {zip:32137},
  {zip:32138},
  {zip:32139},
  {zip:32140},
  {zip:32141},
  {zip:32145},
  {zip:32147},
  {zip:32148},
  {zip:32157},
  {zip:32159},
  {zip:32162},
  {zip:32163},
  {zip:32164},
  {zip:32168},
  {zip:32169},
  {zip:32174},
  {zip:32176},
  {zip:32177},
  {zip:32179},
  {zip:32180},
  {zip:32181},
  {zip:32182},
  {zip:32185},
  {zip:32187},
  {zip:32189},
  {zip:32190},
  {zip:32192},
  {zip:32193},
  {zip:32195},
  {zip:32202},
  {zip:32204},
  {zip:32205},
  {zip:32206},
  {zip:32207},
  {zip:32208},
  {zip:32209},
  {zip:32210},
  {zip:32211},
  {zip:32212},
  {zip:32213},
  {zip:32216},
  {zip:32217},
  {zip:32218},
  {zip:32219},
  {zip:32220},
  {zip:32221},
  {zip:32222},
  {zip:32223},
  {zip:32224},
  {zip:32225},
  {zip:32226},
  {zip:32227},
  {zip:32228},
  {zip:32233},
  {zip:32234},
  {zip:32240},
  {zip:32244},
  {zip:32246},
  {zip:32250},
  {zip:32254},
  {zip:32256},
  {zip:32257},
  {zip:32258},
  {zip:32259},
  {zip:32266},
  {zip:32277},
  {zip:32301},
  {zip:32303},
  {zip:32304},
  {zip:32305},
  {zip:32306},
  {zip:32307},
  {zip:32308},
  {zip:32309},
  {zip:32310},
  {zip:32311},
  {zip:32312},
  {zip:32317},
  {zip:32320},
  {zip:32321},
  {zip:32322},
  {zip:32323},
  {zip:32324},
  {zip:32326},
  {zip:32327},
  {zip:32328},
  {zip:32330},
  {zip:32331},
  {zip:32332},
  {zip:32333},
  {zip:32334},
  {zip:32335},
  {zip:32336},
  {zip:32337},
  {zip:32340},
  {zip:32343},
  {zip:32344},
  {zip:32345},
  {zip:32346},
  {zip:32347},
  {zip:32348},
  {zip:32350},
  {zip:32351},
  {zip:32352},
  {zip:32355},
  {zip:32356},
  {zip:32358},
  {zip:32359},
  {zip:32360},
  {zip:32361},
  {zip:32401},
  {zip:32403},
  {zip:32404},
  {zip:32405},
  {zip:32407},
  {zip:32408},
  {zip:32409},
  {zip:32413},
  {zip:32420},
  {zip:32421},
  {zip:32423},
  {zip:32424},
  {zip:32425},
  {zip:32426},
  {zip:32427},
  {zip:32428},
  {zip:32430},
  {zip:32431},
  {zip:32432},
  {zip:32433},
  {zip:32435},
  {zip:32437},
  {zip:32438},
  {zip:32439},
  {zip:32440},
  {zip:32442},
  {zip:32443},
  {zip:32444},
  {zip:32445},
  {zip:32446},
  {zip:32448},
  {zip:32449},
  {zip:32455},
  {zip:32456},
  {zip:32459},
  {zip:32460},
  {zip:32461},
  {zip:32462},
  {zip:32463},
  {zip:32464},
  {zip:32465},
  {zip:32466},
  {zip:32501},
  {zip:32502},
  {zip:32503},
  {zip:32504},
  {zip:32505},
  {zip:32506},
  {zip:32507},
  {zip:32508},
  {zip:32511},
  {zip:32512},
  {zip:32514},
  {zip:32518},
  {zip:32522},
  {zip:32526},
  {zip:32531},
  {zip:32533},
  {zip:32534},
  {zip:32535},
  {zip:32536},
  {zip:32537},
  {zip:32538},
  {zip:32539},
  {zip:32541},
  {zip:32542},
  {zip:32544},
  {zip:32547},
  {zip:32548},
  {zip:32550},
  {zip:32561},
  {zip:32563},
  {zip:32564},
  {zip:32565},
  {zip:32566},
  {zip:32567},
  {zip:32568},
  {zip:32569},
  {zip:32570},
  {zip:32571},
  {zip:32577},
  {zip:32578},
  {zip:32579},
  {zip:32580},
  {zip:32583},
  {zip:32591},
  {zip:32601},
  {zip:32603},
  {zip:32605},
  {zip:32606},
  {zip:32607},
  {zip:32608},
  {zip:32609},
  {zip:32610},
  {zip:32611},
  {zip:32612},
  {zip:32615},
  {zip:32616},
  {zip:32617},
  {zip:32618},
  {zip:32619},
  {zip:32620},
  {zip:32621},
  {zip:32622},
  {zip:32625},
  {zip:32626},
  {zip:32628},
  {zip:32631},
  {zip:32633},
  {zip:32639},
  {zip:32640},
  {zip:32641},
  {zip:32643},
  {zip:32644},
  {zip:32648},
  {zip:32653},
  {zip:32654},
  {zip:32656},
  {zip:32658},
  {zip:32663},
  {zip:32664},
  {zip:32666},
  {zip:32667},
  {zip:32668},
  {zip:32669},
  {zip:32680},
  {zip:32681},
  {zip:32683},
  {zip:32686},
  {zip:32692},
  {zip:32693},
  {zip:32694},
  {zip:32696},
  {zip:32701},
  {zip:32702},
  {zip:32703},
  {zip:32704},
  {zip:32706},
  {zip:32707},
  {zip:32708},
  {zip:32709},
  {zip:32710},
  {zip:32712},
  {zip:32713},
  {zip:32714},
  {zip:32720},
  {zip:32723},
  {zip:32724},
  {zip:32725},
  {zip:32726},
  {zip:32730},
  {zip:32732},
  {zip:32735},
  {zip:32736},
  {zip:32737},
  {zip:32738},
  {zip:32744},
  {zip:32746},
  {zip:32750},
  {zip:32751},
  {zip:32754},
  {zip:32757},
  {zip:32759},
  {zip:32763},
  {zip:32764},
  {zip:32765},
  {zip:32766},
  {zip:32767},
  {zip:32768},
  {zip:32771},
  {zip:32773},
  {zip:32776},
  {zip:32778},
  {zip:32779},
  {zip:32780},
  {zip:32784},
  {zip:32789},
  {zip:32791},
  {zip:32792},
  {zip:32796},
  {zip:32798},
  {zip:32800},
  {zip:32801},
  {zip:32802},
  {zip:32803},
  {zip:32804},
  {zip:32805},
  {zip:32806},
  {zip:32807},
  {zip:32808},
  {zip:32809},
  {zip:32810},
  {zip:32811},
  {zip:32812},
  {zip:32814},
  {zip:32816},
  {zip:32817},
  {zip:32818},
  {zip:32819},
  {zip:32820},
  {zip:32821},
  {zip:32822},
  {zip:32824},
  {zip:32825},
  {zip:32826},
  {zip:32827},
  {zip:32828},
  {zip:32829},
  {zip:32830},
  {zip:32831},
  {zip:32832},
  {zip:32833},
  {zip:32835},
  {zip:32836},
  {zip:32837},
  {zip:32839},
  {zip:32868},
  {zip:32881},
  {zip:32901},
  {zip:32903},
  {zip:32904},
  {zip:32905},
  {zip:32907},
  {zip:32908},
  {zip:32909},
  {zip:32920},
  {zip:32922},
  {zip:32925},
  {zip:32926},
  {zip:32927},
  {zip:32931},
  {zip:32934},
  {zip:32935},
  {zip:32937},
  {zip:32940},
  {zip:32948},
  {zip:32949},
  {zip:32950},
  {zip:32951},
  {zip:32952},
  {zip:32953},
  {zip:32955},
  {zip:32958},
  {zip:32960},
  {zip:32962},
  {zip:32963},
  {zip:32966},
  {zip:32967},
  {zip:32968},
  {zip:32970},
  {zip:32976},
  {zip:33001},
  {zip:33004},
  {zip:33006},
  {zip:33009},
  {zip:33010},
  {zip:33012},
  {zip:33013},
  {zip:33014},
  {zip:33015},
  {zip:33016},
  {zip:33017},
  {zip:33018},
  {zip:33019},
  {zip:33020},
  {zip:33021},
  {zip:33022},
  {zip:33023},
  {zip:33024},
  {zip:33025},
  {zip:33026},
  {zip:33027},
  {zip:33028},
  {zip:33029},
  {zip:33030},
  {zip:33031},
  {zip:33032},
  {zip:33033},
  {zip:33034},
  {zip:33035},
  {zip:33036},
  {zip:33037},
  {zip:33039},
  {zip:33040},
  {zip:33041},
  {zip:33042},
  {zip:33043},
  {zip:33044},
  {zip:33050},
  {zip:33051},
  {zip:33054},
  {zip:33055},
  {zip:33056},
  {zip:33060},
  {zip:33062},
  {zip:33063},
  {zip:33064},
  {zip:33065},
  {zip:33066},
  {zip:33067},
  {zip:33068},
  {zip:33069},
  {zip:33070},
  {zip:33071},
  {zip:33072},
  {zip:33073},
  {zip:33076},
  {zip:33082},
  {zip:33101},
  {zip:33102},
  {zip:33104},
  {zip:33109},
  {zip:33122},
  {zip:33125},
  {zip:33126},
  {zip:33127},
  {zip:33128},
  {zip:33129},
  {zip:33130},
  {zip:33131},
  {zip:33132},
  {zip:33133},
  {zip:33134},
  {zip:33135},
  {zip:33136},
  {zip:33137},
  {zip:33138},
  {zip:33139},
  {zip:33140},
  {zip:33141},
  {zip:33142},
  {zip:33143},
  {zip:33144},
  {zip:33145},
  {zip:33146},
  {zip:33147},
  {zip:33149},
  {zip:33150},
  {zip:33153},
  {zip:33154},
  {zip:33155},
  {zip:33156},
  {zip:33157},
  {zip:33158},
  {zip:33160},
  {zip:33161},
  {zip:33162},
  {zip:33165},
  {zip:33166},
  {zip:33167},
  {zip:33168},
  {zip:33169},
  {zip:33170},
  {zip:33172},
  {zip:33173},
  {zip:33174},
  {zip:33175},
  {zip:33176},
  {zip:33177},
  {zip:33178},
  {zip:33179},
  {zip:33180},
  {zip:33181},
  {zip:33182},
  {zip:33183},
  {zip:33184},
  {zip:33185},
  {zip:33186},
  {zip:33187},
  {zip:33189},
  {zip:33190},
  {zip:33193},
  {zip:33194},
  {zip:33196},
  {zip:33217},
  {zip:33234},
  {zip:33301},
  {zip:33302},
  {zip:33304},
  {zip:33305},
  {zip:33306},
  {zip:33308},
  {zip:33309},
  {zip:33310},
  {zip:33311},
  {zip:33312},
  {zip:33313},
  {zip:33314},
  {zip:33315},
  {zip:33316},
  {zip:33317},
  {zip:33319},
  {zip:33321},
  {zip:33322},
  {zip:33323},
  {zip:33324},
  {zip:33325},
  {zip:33326},
  {zip:33327},
  {zip:33328},
  {zip:33330},
  {zip:33331},
  {zip:33332},
  {zip:33333},
  {zip:33334},
  {zip:33348},
  {zip:33351},
  {zip:33388},
  {zip:33394},
  {zip:33401},
  {zip:33403},
  {zip:33404},
  {zip:33405},
  {zip:33406},
  {zip:33407},
  {zip:33408},
  {zip:33409},
  {zip:33410},
  {zip:33411},
  {zip:33412},
  {zip:33413},
  {zip:33414},
  {zip:33415},
  {zip:33417},
  {zip:33418},
  {zip:33426},
  {zip:33428},
  {zip:33430},
  {zip:33431},
  {zip:33432},
  {zip:33433},
  {zip:33434},
  {zip:33435},
  {zip:33436},
  {zip:33437},
  {zip:33438},
  {zip:33439},
  {zip:33440},
  {zip:33441},
  {zip:33442},
  {zip:33444},
  {zip:33445},
  {zip:33446},
  {zip:33449},
  {zip:33455},
  {zip:33458},
  {zip:33459},
  {zip:33460},
  {zip:33461},
  {zip:33462},
  {zip:33463},
  {zip:33467},
  {zip:33469},
  {zip:33470},
  {zip:33471},
  {zip:33472},
  {zip:33473},
  {zip:33476},
  {zip:33477},
  {zip:33478},
  {zip:33480},
  {zip:33483},
  {zip:33484},
  {zip:33486},
  {zip:33487},
  {zip:33493},
  {zip:33496},
  {zip:33498},
  {zip:33501},
  {zip:33510},
  {zip:33511},
  {zip:33513},
  {zip:33514},
  {zip:33521},
  {zip:33523},
  {zip:33525},
  {zip:33527},
  {zip:33530},
  {zip:33534},
  {zip:33537},
  {zip:33538},
  {zip:33539},
  {zip:33540},
  {zip:33541},
  {zip:33542},
  {zip:33543},
  {zip:33544},
  {zip:33545},
  {zip:33547},
  {zip:33548},
  {zip:33549},
  {zip:33550},
  {zip:33556},
  {zip:33558},
  {zip:33559},
  {zip:33563},
  {zip:33565},
  {zip:33566},
  {zip:33567},
  {zip:33568},
  {zip:33569},
  {zip:33570},
  {zip:33572},
  {zip:33573},
  {zip:33574},
  {zip:33576},
  {zip:33578},
  {zip:33579},
  {zip:33584},
  {zip:33585},
  {zip:33586},
  {zip:33592},
  {zip:33593},
  {zip:33594},
  {zip:33596},
  {zip:33597},
  {zip:33598},
  {zip:33602},
  {zip:33603},
  {zip:33604},
  {zip:33605},
  {zip:33606},
  {zip:33607},
  {zip:33608},
  {zip:33609},
  {zip:33610},
  {zip:33611},
  {zip:33612},
  {zip:33613},
  {zip:33614},
  {zip:33615},
  {zip:33616},
  {zip:33617},
  {zip:33618},
  {zip:33619},
  {zip:33620},
  {zip:33621},
  {zip:33624},
  {zip:33625},
  {zip:33626},
  {zip:33629},
  {zip:33634},
  {zip:33635},
  {zip:33637},
  {zip:33647},
  {zip:33654},
  {zip:33701},
  {zip:33702},
  {zip:33703},
  {zip:33704},
  {zip:33705},
  {zip:33706},
  {zip:33707},
  {zip:33708},
  {zip:33709},
  {zip:33710},
  {zip:33711},
  {zip:33712},
  {zip:33713},
  {zip:33714},
  {zip:33715},
  {zip:33716},
  {zip:33730},
  {zip:33733},
  {zip:33736},
  {zip:33744},
  {zip:33755},
  {zip:33756},
  {zip:33758},
  {zip:33759},
  {zip:33760},
  {zip:33761},
  {zip:33762},
  {zip:33763},
  {zip:33764},
  {zip:33765},
  {zip:33767},
  {zip:33770},
  {zip:33771},
  {zip:33772},
  {zip:33773},
  {zip:33774},
  {zip:33776},
  {zip:33777},
  {zip:33778},
  {zip:33781},
  {zip:33782},
  {zip:33785},
  {zip:33786},
  {zip:33801},
  {zip:33802},
  {zip:33803},
  {zip:33805},
  {zip:33809},
  {zip:33810},
  {zip:33811},
  {zip:33812},
  {zip:33813},
  {zip:33815},
  {zip:33820},
  {zip:33823},
  {zip:33825},
  {zip:33827},
  {zip:33830},
  {zip:33834},
  {zip:33835},
  {zip:33836},
  {zip:33837},
  {zip:33838},
  {zip:33839},
  {zip:33840},
  {zip:33841},
  {zip:33842},
  {zip:33843},
  {zip:33844},
  {zip:33846},
  {zip:33847},
  {zip:33848},
  {zip:33849},
  {zip:33850},
  {zip:33851},
  {zip:33852},
  {zip:33853},
  {zip:33854},
  {zip:33855},
  {zip:33856},
  {zip:33857},
  {zip:33858},
  {zip:33859},
  {zip:33860},
  {zip:33863},
  {zip:33865},
  {zip:33867},
  {zip:33868},
  {zip:33870},
  {zip:33872},
  {zip:33873},
  {zip:33875},
  {zip:33876},
  {zip:33877},
  {zip:33880},
  {zip:33881},
  {zip:33884},
  {zip:33890},
  {zip:33896},
  {zip:33897},
  {zip:33898},
  {zip:33901},
  {zip:33903},
  {zip:33904},
  {zip:33905},
  {zip:33907},
  {zip:33908},
  {zip:33909},
  {zip:33912},
  {zip:33913},
  {zip:33914},
  {zip:33916},
  {zip:33917},
  {zip:33919},
  {zip:33920},
  {zip:33921},
  {zip:33922},
  {zip:33924},
  {zip:33928},
  {zip:33930},
  {zip:33931},
  {zip:33935},
  {zip:33936},
  {zip:33944},
  {zip:33946},
  {zip:33947},
  {zip:33948},
  {zip:33950},
  {zip:33952},
  {zip:33953},
  {zip:33954},
  {zip:33955},
  {zip:33956},
  {zip:33957},
  {zip:33960},
  {zip:33965},
  {zip:33966},
  {zip:33967},
  {zip:33971},
  {zip:33972},
  {zip:33973},
  {zip:33974},
  {zip:33975},
  {zip:33976},
  {zip:33980},
  {zip:33981},
  {zip:33982},
  {zip:33983},
  {zip:33990},
  {zip:33991},
  {zip:33993},
  {zip:34101},
  {zip:34102},
  {zip:34103},
  {zip:34104},
  {zip:34105},
  {zip:34108},
  {zip:34109},
  {zip:34110},
  {zip:34112},
  {zip:34113},
  {zip:34114},
  {zip:34116},
  {zip:34117},
  {zip:34119},
  {zip:34120},
  {zip:34134},
  {zip:34135},
  {zip:34137},
  {zip:34138},
  {zip:34139},
  {zip:34140},
  {zip:34141},
  {zip:34142},
  {zip:34145},
  {zip:34201},
  {zip:34202},
  {zip:34203},
  {zip:34205},
  {zip:34206},
  {zip:34207},
  {zip:34208},
  {zip:34209},
  {zip:34210},
  {zip:34211},
  {zip:34212},
  {zip:34215},
  {zip:34216},
  {zip:34217},
  {zip:34219},
  {zip:34221},
  {zip:34222},
  {zip:34223},
  {zip:34224},
  {zip:34228},
  {zip:34229},
  {zip:34231},
  {zip:34232},
  {zip:34233},
  {zip:34234},
  {zip:34235},
  {zip:34236},
  {zip:34237},
  {zip:34238},
  {zip:34239},
  {zip:34240},
  {zip:34241},
  {zip:34242},
  {zip:34243},
  {zip:34250},
  {zip:34251},
  {zip:34266},
  {zip:34269},
  {zip:34272},
  {zip:34275},
  {zip:34285},
  {zip:34286},
  {zip:34287},
  {zip:34288},
  {zip:34289},
  {zip:34291},
  {zip:34292},
  {zip:34293},
  {zip:34420},
  {zip:34428},
  {zip:34429},
  {zip:34431},
  {zip:34432},
  {zip:34433},
  {zip:34434},
  {zip:34436},
  {zip:34442},
  {zip:34445},
  {zip:34446},
  {zip:34448},
  {zip:34449},
  {zip:34450},
  {zip:34452},
  {zip:34453},
  {zip:34461},
  {zip:34465},
  {zip:34470},
  {zip:34471},
  {zip:34472},
  {zip:34473},
  {zip:34474},
  {zip:34475},
  {zip:34476},
  {zip:34479},
  {zip:34480},
  {zip:34481},
  {zip:34482},
  {zip:34484},
  {zip:34488},
  {zip:34491},
  {zip:34498},
  {zip:34601},
  {zip:34602},
  {zip:34604},
  {zip:34606},
  {zip:34607},
  {zip:34608},
  {zip:34609},
  {zip:34610},
  {zip:34613},
  {zip:34614},
  {zip:34637},
  {zip:34638},
  {zip:34639},
  {zip:34641},
  {zip:34652},
  {zip:34653},
  {zip:34654},
  {zip:34655},
  {zip:34660},
  {zip:34661},
  {zip:34667},
  {zip:34668},
  {zip:34669},
  {zip:34677},
  {zip:34679},
  {zip:34681},
  {zip:34683},
  {zip:34684},
  {zip:34685},
  {zip:34688},
  {zip:34689},
  {zip:34690},
  {zip:34691},
  {zip:34695},
  {zip:34698},
  {zip:34705},
  {zip:34711},
  {zip:34714},
  {zip:34715},
  {zip:34729},
  {zip:34731},
  {zip:34734},
  {zip:34736},
  {zip:34737},
  {zip:34739},
  {zip:34740},
  {zip:34741},
  {zip:34743},
  {zip:34744},
  {zip:34746},
  {zip:34747},
  {zip:34748},
  {zip:34753},
  {zip:34755},
  {zip:34756},
  {zip:34758},
  {zip:34759},
  {zip:34760},
  {zip:34761},
  {zip:34762},
  {zip:34769},
  {zip:34771},
  {zip:34772},
  {zip:34773},
  {zip:34778},
  {zip:34785},
  {zip:34786},
  {zip:34787},
  {zip:34788},
  {zip:34797},
  {zip:34848},
  {zip:34945},
  {zip:34946},
  {zip:34947},
  {zip:34949},
  {zip:34950},
  {zip:34951},
  {zip:34952},
  {zip:34953},
  {zip:34956},
  {zip:34957},
  {zip:34972},
  {zip:34974},
  {zip:34981},
  {zip:34982},
  {zip:34983},
  {zip:34984},
  {zip:34986},
  {zip:34987},
  {zip:34988},
  {zip:34990},
  {zip:34994},
  {zip:34996},
  {zip:34997}
];
