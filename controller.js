var lastContextCard;
window.onload = function onload () {
setPathToLoad();

  $(window).resize(function () {
    $('#kontext_menu').css({
      'opacity': '0',
      'margin-left': "-500px",
      'margin-top': "-500px"
    });
  });

  $('#load_kanban').click(function() {

    setPathToLoad();
  });

  $('#kontext_delete').click(function() {
    if (lastContextCard !== null) {
      document.getElementById(lastContextCard.path[0].id).remove();
    }
  });

  $('#kontext_read').click(function() {
    var text = lastContextCard.path[0].innerHTML;
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  });

  if (ud_read_cookie('__cookie') == null) {
  if(confirm('We use cookies, is this ok?')) {
    var path = ud_read_cookie('_path');
    if(path !== undefined) {
      readFile(path);
    }
  } else {
    window.history.back();
  }
  ud_create_cookie('__cookie', 'true');
}

  function readFile(path) {
    var json = $.getJSON(path);
    return json;
  }


  $('#add_kanban').click(function(){
    var text = prompt('Card text:');
    if(text !== null) {
      if(text !== '') {
        generateKanbanBoard(text);
      }else{
        alert('You have to enter a card text!');
      }
    }
  });

  document.addEventListener("click", function( event ) {
    $('#kontext_menu').css({
      'opacity': '0',
      'margin-left': "-500px",
      'margin-top': "-500px"
    });
  }, false);


function setPathToLoad() {
  var val = ud_read_cookie('__path');
  $('#input-file').attr('value', val);
  $('#input-file').trigger("click")
}

  var fileInput = document.getElementById('input-file');
  var loadFile;
  $('#input-file').change(function(event) {
      ud_create_cookie('__path', $('#input-file').value);
      var input = event.target;

      var reader = new FileReader();
      reader.onload = function(){
        var text = reader.result;
        parseJsonToHtml(reader.result);
      };

      reader.readAsText(input.files[0]);
    });

  $('#button-file').click(function(){

  });

  $('#kontext_print').click(function(){
  //  lastContextCard.path[0].print();
  var elemId = '#' + lastContextCard.path[0].id.toString();
  var elem = $(elemId);
  Popup(elem.html());

function Popup(data) {
    var myWindow = window.open('', 'my div', 'height=400,width=600');
    myWindow.document.write('<html><head>');
    /*optional stylesheet*/ //myWindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    myWindow.document.write('</head><body><div style="font-family:arial;border-style: solid; border-radius: 8px; padding-left: 5px; padding-top: 5px; text-align: justify; border-color: #4286f4; height: 90%; width: 90%; margin-left: 4%; background-color: #fefefe;">');
    myWindow.document.write(data);
    myWindow.document.write('</div></body></html>');
    myWindow.document.close(); // necessary for IE >= 10

    myWindow.onload=function(){ // necessary if the div contain images

    myWindow.focus(); // necessary for IE >= 10
    myWindow.print();
    myWindow.close();
};
}
  });

  $('#save_kanban').click(function(){
    var path = "",
    path = prompt('File-Name:');
    if(path !== null) {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(saveFile());
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", path + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  });

  $('#refresh_kanban').click(function(){
      $('#input-file').trigger('change');
    //location.reload();
  });

  $('#kontext_copy_text').click(function() {
    var input;
    input = document.getElementById('phantom-input');
    input.value = lastContextCard.path[0].innerHTML;
    input.select();
    document.execCommand('copy');
    input.value = "";
  });

  $('#clear_kanban').click(function(){
    document.getElementById('backlog').innerHTML = '';
    document.getElementById('backlog').innerHTML = 'backlog';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('inprogress').innerHTML = 'in progress';
    document.getElementById('review').innerHTML = '';
    document.getElementById('review').innerHTML = 'review';
    document.getElementById('ready').innerHTML = '';
    document.getElementById('ready').innerHTML = 'ready';
  });

  function removeChildNodes (array) {
    for(var i=0; i<array.length; i++) {
      array[i].remove();
    }
  }

  function saveFile () {
    var fileArray = [];

    fileArray.push('{');

    // Start: Backlog save files
    fileArray.push('"backlog": [');

    var backlog_elements = document.getElementById('backlog').childNodes;

    for(var i=1; i<backlog_elements.length; i++) {
      var element = backlog_elements[i];
      var json_obj = '{ ' + '"id" : "' + element.id + '" , "text" : "' + element.innerHTML + '" },';
      fileArray.push(json_obj);
    }
    fileArray.push('{ "id" : "" , "text" : "" }');

    fileArray.push('],');
    // End: Backlog save files

    // Start: inprogress save files
    fileArray.push('"inprogress": [');

    var backlog_elements = document.getElementById('inprogress').childNodes;

    for(var i=1; i<backlog_elements.length; i++) {
      var element = backlog_elements[i];
      var json_obj = '{ ' + '"id" : "' + element.id + '" , "text" : "' + element.innerHTML + '" },';
      fileArray.push(json_obj);
    }
    fileArray.push('{ "id" : "" , "text" : "" }');

    fileArray.push('],');
    // End: inprogress save files

    // Start: review save files
    fileArray.push('"review": [');

    var backlog_elements = document.getElementById('review').childNodes;

    for(var i=1; i<backlog_elements.length; i++) {
      var element = backlog_elements[i];
      var json_obj = '{ ' + '"id" : "' + element.id + '" , "text" : "' + element.innerHTML + '" },';
      fileArray.push(json_obj);
    }
    fileArray.push('{ "id" : "" , "text" : "" }');

    fileArray.push('],');
    // End: review save files

    // Start: ready save files
    fileArray.push('"ready": [');

    var backlog_elements = document.getElementById('ready').childNodes;

    for(var i=1; i<backlog_elements.length; i++) {
      var element = backlog_elements[i];
      var json_obj = '{ ' + '"id" : "' + element.id + '" , "text" : "' + element.innerHTML + '" },';
      fileArray.push(json_obj);
    }
    fileArray.push('{ "id" : "" , "text" : "" }');

    fileArray.push(']');
    // End: ready save files

    fileArray.push('}');

    var fileData = "";
    for(var x=0; x< fileArray.length; x++) {
      fileData += fileArray[x].toString();
    }

    return fileData;

  }

  function parseJsonToHtml (file) {

    $('#clear_kanban').trigger('click');

    var fileObj = JSON.parse(file);

    addCardsToDiv('backlog', fileObj.backlog);
    addCardsToDiv('inprogress', fileObj.inprogress);
    addCardsToDiv('ready', fileObj.ready);
    addCardsToDiv('review', fileObj.review);


  }

  function addCardsToDiv(divId, cardArray) {
    for (var i=0; i<cardArray.length; i++) {
      if(cardArray[i].id !== '') {
        var card = document.createElement('div');
        card.setAttribute('id', cardArray[i].id);
        card.setAttribute('class', 'card');
        card.setAttribute('draggable', 'true');
        card.setAttribute('ondragstart', 'drag(event)');
        card.setAttribute('title', 'press left for moving');
        card.innerHTML = cardArray[i].text;
        var div = document.getElementById(divId);
        div.appendChild(card);
      }
    }
  }

  function generateKanbanBoard (text) {
    var card = document.createElement('div');
    card.setAttribute('id', generateId());
    card.setAttribute('class', 'card');
    card.setAttribute('draggable', 'true');
    card.setAttribute('ondragstart', 'drag(event)');
    card.setAttribute('title', 'press left for moving');
    card.innerHTML = text;
    var backlog = document.getElementById('backlog');
    backlog.appendChild(card);
  }

  function generateId () {
     return '_' + Math.random().toString(36).substr(2, 9);
  }

  function ud_create_cookie(UD_NAME, UD_VALUE) {

    var UD_DATUM = new Date();
    UD_DATUM.setTime(UD_DATUM.getTime() + (UD_DELETE*24*60*60*50));

      var UD_DELETE = UD_DATUM.toUTCString();

     var CookieDate = new Date;
    CookieDate.setFullYear(CookieDate.getFullYear() +1);

    document.cookie = UD_NAME + '=' + UD_VALUE + ';' + "expires=" + CookieDate.toUTCString()  + ';';

  }

  function ud_read_cookie (UD_OBJECT) {

    var UD_ELEMENT = UD_OBJECT + "=";

    var UD_COOKIE_ARRAY = document.cookie.split(";");

    for(var i=0; i<UD_COOKIE_ARRAY.length;i++) {
      var UD_COOKIE_ELEMENT = UD_COOKIE_ARRAY[i];

      while(UD_COOKIE_ELEMENT.charAt(0) === ' ') {
        UD_COOKIE_ELEMENT = UD_COOKIE_ELEMENT.substring(1);
      }

      if(UD_COOKIE_ELEMENT.indexOf(UD_ELEMENT) === 0) {
        return UD_COOKIE_ELEMENT.substring(UD_ELEMENT.length, UD_COOKIE_ELEMENT.length);
      }
    }
}

}

window.oncontextmenu = function (e)
{
    showCustomMenu(e);
    return false;
}

function showCustomMenu(e) {
    if(e.path[0].className === "card") {
      lastContextCard = e;

      var pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      var pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

      $('#kontext_menu').css({
        'opacity': '1',
        'margin-left': ((parseInt(pageX) + 2).toString() + "px"),
        'margin-top': ((parseInt(pageY) - 79).toString() + "px")
      });

    } else {
      lastContextCard = null;
      $('#kontext_menu').css({
        'opacity': '0',
        'margin-left': "-500px",
        'margin-top': "-500px"
      });
    }
}
