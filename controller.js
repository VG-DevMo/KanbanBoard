var lastContextCard;

window.onload = function onload () {

  $('#input-file').before('<input type="button" id="button-file" value=" load " />');
  $('#input-file').hide();
  $('body').on('click', '#button-file', function() {
      $('#input-file').trigger('click');
  });

  $(window).resize(function () {
    $('#kontext_menu').css({
      'opacity': '0',
      'margin-left': "-500px",
      'margin-top': "-500px"
    });
  });

  $('#kontext_delete').click(function() {
    if (lastContextCard !== null) {
      console.log(lastContextCard);
      console.log(lastContextCard.path[0]);
      document.getElementById(lastContextCard.path[0].id).remove();
    }
  });

  $('#kontext_read').click(function() {
    var text = lastContextCard.path[0].innerHTML;
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  });

  if(confirm('We use cookies, is this ok?')) {
    var path = ud_read_cookie('_path');
    if(path !== undefined) {
      readFile(path);
    }
  } else {
    window.history.back();
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


  $('#button-file').click(function(){
    console.log('test');
    var fileInput = document.getElementById('button-file');
		var loadFile = [];

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = "*.json";

			if (file.type.match(textType)) {
				var reader = new FileReader();
				reader.onload = function(e) {
          loadFile.push(reader.result);
				}
				reader.readAsText(file);
			}
      console.log(loadFile);
		});
  });

  $('#save_kanban').click(function(){
    var path = prompt('Enter save path:');
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
    location.reload();
  });

  $('#clear_kanban').click(function(){

  });

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
    document.getElementById('add_text').value = "";
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
    return false;     // cancel default menu
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
