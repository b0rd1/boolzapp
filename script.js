$(document).ready(function() {

  // seleziona chat sulla sinistra
  $('.chat').click(function() {
    $('.chat').removeClass('active');
    $(this).addClass('active');
  });

  // fa comparire paper-plane
  $('#textarea').click(function(e) {
    $('.fa-microphone').hide();
    $('.fa-paper-plane').show();
    e.stopPropagation();
  });

  // fa scomparire paper-plane
  $(document).click(function(e) {
    $('.fa-microphone').show();
    $('.fa-paper-plane').hide();
    e.stopPropagation();
  });

  // scrive messaggio utente
  $('#textarea').keypress(function(e) {

    if (e.which == 13) {

      var d = new Date();
      var testoInserito = $('#textarea').val();

      if (testoInserito != 0) {

        $('.main_right').append('<div class="message_user fl_r">' + testoInserito + '<div class="time_user">' + d.getHours() + ':' + d.getMinutes() + '</div></div><div class="clear"></div>');
        $('#textarea').val('');

        //scrive messaggio contatto dopo un secondo
        setTimeout(function() {
          $('.main_right').append('<div class="message_contact fl_l">Ok<div class="time_contact">' + d.getHours() + ':' + d.getMinutes() + '</div></div><div class="clear"></div>')
        }, 1000);
      }
    }
  });

  // chiude menu delete
  $(document).mouseup(function(e) {
    if ((!$('.delete_menu').is(e.target) && $('.delete_menu').has(e.target).length === 0) || (!$('.delete_menu_user').is(e.target) && $('.delete_menu_user').has(e.target).length === 0)) {
      $('.delete_menu').hide();
      $('.delete_menu_user').hide();
    }
  });

  // cancella messaggio CONTATTO
  $(document).on("mouseenter", ".message_contact", function() {

    //aggiunge classe freccia giu
    $(this).append('<i class="fas fa-angle-down delete_row"></i>');


    //evento quando il mouse esce dal messaggio
    $('.message_contact').mouseleave(function(e) {
      $('.delete_row').remove();
      e.stopPropagation()
    });

    //click sulla freccia
    $('.delete_row').click(function() {

      // aggiunge menu cancella messaggio
      $(this).prev().append('<div class="delete_menu">Cancella il messaggio</div>').css('opacity', '1');

      // apre menu modale
      $('.delete_menu').click(function() {
          $('.menu_modale').addClass('active');
      });

      $('#btn-elimina').click(function() {
        $('.message_contact').remove();
        $('.menu_modale').removeClass('active');
      });

      $('#btn-chiudi').click(function() {
        $('.menu_modale').removeClass('active');
      });
    });
  });

  // cancella messaggio UTENTE
  $(document).on("mouseenter", ".message_user", function() {

    //aggiunge classe freccia giu
    $(this).append('<i class="fas fa-angle-down delete_row_user"></i>');

    //evento quando il mouse esce dal messaggio
    $('.message_user').mouseleave(function(e) {
      $('.delete_row_user').remove();
      e.stopPropagation()
    });

    //click sulla freccia
    $('.delete_row_user').click(function() {

      // aggiunge menu cancella messaggio
      $(this).parent().append('<div class="delete_menu_user">Cancella il messaggio</div>');

      // apre menu modale
      $('.delete_menu_user').click(function() {
          $('.menu_modale').addClass('active');
      });

      $('#btn-elimina').click(function() {
        $('.message_user').remove();
        $('.menu_modale').removeClass('active');
      });

      $('#btn-chiudi').click(function() {
        $('.menu_modale').removeClass('active');
      });
    });
  });

  //ricerca nome
  $('#search_bar').on("keyup", function() {

    // nome che stiamo cercando in minuscolo
    var nomeCercato = $(this).val().toLowerCase();

    //cicla i nomi degli utenti
    $(".nome_utente").each(function() {

      //nome contatto in lista in minuscolo
      var nomeContatto = $(this).text().toLowerCase();

      if ((nomeContatto.includes(nomeCercato))) {
        $(this).parent().children().show();
      } else {
        $(this).parent().children().hide();

      }

    });

  });


  // // new chat
  // $('.chat').click(function() {
  //   console.log($('.message_contact').length >= 1);
  //
  //
  //
  //   //clona la finestra
  //   if ($('.message_contact').length >= 1) {
  //     // $('.main_right').clone().append('.main_right')
  //     $('.main_right').add('.main_right')
  //   }else {
  //     $('.main_right').empty()
  //   }
  //
  //
  //   // $('.main_right').clone().append('.main_right')
  //
  //
  // });





  //chiusura document.ready
});
