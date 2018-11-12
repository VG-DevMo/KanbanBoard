var lastContextCard;function showCustomMenu(e){if("card"===e.path[0].className){lastContextCard=e;var t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;$("#kontext_menu").css({opacity:"1","margin-left":(parseInt(t)+2).toString()+"px","margin-top":(parseInt(n)-79).toString()+"px"})}else lastContextCard=null,$("#kontext_menu").css({opacity:"0","margin-left":"-500px","margin-top":"-500px"})}window.onload=function(){if(n(),$(window).resize(function(){$("#kontext_menu").css({opacity:"0","margin-left":"-500px","margin-top":"-500px"})}),$("#load_kanban").click(function(){n()}),$("#kontext_delete").click(function(){null!==lastContextCard&&(console.log(lastContextCard),console.log(lastContextCard.path[0]),document.getElementById(lastContextCard.path[0].id).remove())}),$("#kontext_read").click(function(){var e=lastContextCard.path[0].innerHTML,t=new SpeechSynthesisUtterance(e);window.speechSynthesis.speak(t)}),null==a("__cookie")){if(confirm("We use cookies, is this ok?")){var e=a("_path");void 0!==e&&(t=e,$.getJSON(t))}else window.history.back();i("__cookie","true")}var t;function n(){var e=a("__path");console.log(e),$("#input-file").attr("value",e),console.log($("#input-file").attr("files")),$("#input-file").trigger("click")}$("#add_kanban").click(function(){var e,t,n=prompt("Card text:");null!==n&&(""!==n?(e=n,(t=document.createElement("div")).setAttribute("id","_"+Math.random().toString(36).substr(2,9)),t.setAttribute("class","card"),t.setAttribute("draggable","true"),t.setAttribute("ondragstart","drag(event)"),t.setAttribute("title","press left for moving"),t.innerHTML=e,document.getElementById("backlog").appendChild(t)):alert("You have to enter a card text!"))}),document.addEventListener("click",function(e){$("#kontext_menu").css({opacity:"0","margin-left":"-500px","margin-top":"-500px"})},!1),console.log("test");var r=document.getElementById("input-file");function o(e,t){for(var n=0;n<t.length;n++)if(""!==t[n].id){var r=document.createElement("div");r.setAttribute("id",t[n].id),r.setAttribute("class","card"),r.setAttribute("draggable","true"),r.setAttribute("ondragstart","drag(event)"),r.setAttribute("title","press left for moving"),r.innerHTML=t[n].text,document.getElementById(e).appendChild(r)}}function i(e,t){var n=new Date;n.setTime(n.getTime()+24*r*60*60*50);var r=n.toUTCString(),o=new Date;o.setFullYear(o.getFullYear()+1),document.cookie=e+"="+t+";expires="+o.toUTCString()+";"}function a(e){for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}}console.log(r),r.addEventListener("change",function(e){i("__path",$("#input-file").value);var t=e.target,n=new FileReader;n.onload=function(){n.result;!function(e){$("#clear_kanban").trigger("click");var t=JSON.parse(e);o("backlog",t.backlog),o("inprogress",t.inprogress),o("ready",t.ready),o("review",t.review)}(n.result)},n.readAsText(t.files[0])}),$("#button-file").click(function(){}),$("#save_kanban").click(function(){var e="";if(null!==(e=prompt("Enter save path:"))){var t="data:text/json;charset=utf-8,"+encodeURIComponent(function(){var e=[];e.push("{"),e.push('"backlog": [');for(var t=document.getElementById("backlog").childNodes,n=1;n<t.length;n++){var r=t[n],o='{ "id" : "'+r.id+'" , "text" : "'+r.innerHTML+'" },';e.push(o)}e.push('{ "id" : "" , "text" : "" }'),e.push("],"),e.push('"inprogress": [');for(var t=document.getElementById("inprogress").childNodes,n=1;n<t.length;n++){var r=t[n],o='{ "id" : "'+r.id+'" , "text" : "'+r.innerHTML+'" },';e.push(o)}e.push('{ "id" : "" , "text" : "" }'),e.push("],"),e.push('"review": [');for(var t=document.getElementById("review").childNodes,n=1;n<t.length;n++){var r=t[n],o='{ "id" : "'+r.id+'" , "text" : "'+r.innerHTML+'" },';e.push(o)}e.push('{ "id" : "" , "text" : "" }'),e.push("],"),e.push('"ready": [');for(var t=document.getElementById("ready").childNodes,n=1;n<t.length;n++){var r=t[n],o='{ "id" : "'+r.id+'" , "text" : "'+r.innerHTML+'" },';e.push(o)}e.push('{ "id" : "" , "text" : "" }'),e.push("]"),e.push("}");for(var i="",a=0;a<e.length;a++)i+=e[a].toString();return i}()),n=document.createElement("a");n.setAttribute("href",t),n.setAttribute("download",e+".json"),document.body.appendChild(n),n.click(),n.remove()}}),$("#refresh_kanban").click(function(){location.reload()}),$("#clear_kanban").click(function(){document.getElementById("backlog").innerHTML="",document.getElementById("backlog").innerHTML="backlog",document.getElementById("inprogress").innerHTML="",document.getElementById("inprogress").innerHTML="in progress",document.getElementById("review").innerHTML="",document.getElementById("review").innerHTML="review",document.getElementById("ready").innerHTML="",document.getElementById("ready").innerHTML="ready"})},window.oncontextmenu=function(e){return showCustomMenu(e),!1};
/*var lastContextCard;
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
  console.log(val);
  $('#input-file').attr('value', val);
  console.log($('#input-file').attr('files'));
  $('#input-file').trigger("click")
}

  console.log('test');
  var fileInput = document.getElementById('input-file');
  var loadFile;
  console.log(fileInput);
  fileInput.addEventListener('change', function(event) {
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

  $('#save_kanban').click(function(){
    var path = "",
    path = prompt('Enter save path:');
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
}*/
