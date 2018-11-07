window.onload = function onload () {

  $('#add_popup').animate({
    'opacity': '0',
    'margin-left': '-=5000px',
    'margin-top': '-=5000px'
  }, 'fast');

  $('#add_kanban').click(function(){
    $('#add_popup').css({
      'height': '350px',
      'width': '375px'
    });
    $('#add_text').css({'opacity': '1'});
    $('#button_cancel').css({'opacity': '1'});
    $('#button_submit').css({'opacity': '1'});
    $('#add_popup').animate({
      'opacity': '1',
      'margin-left': '+=5000px',
      'margin-top': '+=5000px'
    }, 'fast');
  });

  $('#button_submit').click(function(){
    $('#add_popup').animate({
      'opacity': '0',
      'margin-left': '-=5000px',
      'margin-top': '-=5000px'
    }, 'fast');

    $('#add_text').animate({'opacity': '0'}, 'fast');
    $('#button_cancel').animate({'opacity': '0'}, 'fast');
    $('#button_submit').animate({'opacity': '0'}, 'fast');
  });

  $('#button_cancel').click(function(){
      $('#add_popup').animate({
        'opacity': '0',
        'margin-left': '-=5000px',
        'margin-top': '-=5000px'
      }, 'fast');
      $('#add_text').animate({'opacity': '0'}, 'fast');
      $('#button_cancel').animate({'opacity': '0'}, 'fast');
      $('#button_submit').animate({'opacity': '0'}, 'fast');
  });

}
