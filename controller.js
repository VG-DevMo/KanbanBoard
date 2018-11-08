window.onload = function onload () {

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

}
