window.onload = function onload () {

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

  $('#load_kanban').click(function(){
    var path = prompt('Enter the path to JSON-file:');
    if(path !== null) {
      ud_create_cookie('_path', path);
    }
  });

  $('#save_kanban').click(function(){
    var path = prompt('Enter save path:');
    if(path !== null) {

    }
  });

  $('#refresh_kanban').click(function(){
    location.reload();
  });

  $('#clear_kanban').click(function(){

  });

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
