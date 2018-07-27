$(document).ready(function() {

  // apre e chiude sub menu
  $('.fa-ellipsis-v.right').click(function() {
    if ($(".info-contatto").is(":hidden")) {
      $(".info-contatto").show("slide");
    } else {
      $(".info-contatto").hide('slide');
    }
  });
  $('.fa-ellipsis-v.left').click(function() {
    if ($(".info-profilo").is(":hidden")) {
      $(".info-profilo").show("slide");
    } else {
      $(".info-profilo").hide('slide');
    }
  });
  $('.fa-paperclip').click(function() {
    if ($(".allegati").is(":hidden")) {
      $(".allegati").slideDown();
    } else {
      $(".allegati").slideUp();
    }
  });

  // chiude menu delete
  $(document).mouseup(function(e) {
    if ((!$('.delete_menu').is(e.target) && $('.delete_menu').has(e.target).length === 0) ||
      (!$('.delete_menu_user').is(e.target) && $('.delete_menu_user').has(e.target).length === 0) ||
      (!$('.info-contatto').is(e.target) && $('.info-contatto').has(e.target).length === 0) ||
      (!$('.info-profilo').is(e.target) && $('.info-profilo').has(e.target).length === 0) ||
      (!$('.allegati').is(e.target) && $('.allegati').has(e.target).length === 0)) {
      $('.delete_menu').hide();
      $('.delete_menu_user').hide();
      $('.info-profilo').hide('slide');
      $('.info-contatto').hide('slide');
      $('.allegati').slideUp();
    }
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

  // scrive messaggio
  $('#textarea').keyup(function(e) {

    if (e.which == 13) {

      var nomeContatto = $('.chat.active');
      var index = $(nomeContatto).index();
      var mainRightActive = $('.main_right')[index - 1];

      var d = new Date();
      var testoInserito = $('#textarea').val();

      $('#message_user_to_clone .message_user .testo_user').text(testoInserito);
      $('#message_user_to_clone .message_user .time_user').text(d.getHours() + ':' + d.getMinutes());
      $('#message_contact_to_clone .message_contact .testo_contact').text('Ok');
      $('#message_contact_to_clone .message_contact .time_contact').text(d.getHours() + ':' + d.getMinutes());

      var messaggioUtente = $('#message_user_to_clone').clone();
      var contenutoContainerUtente = $(messaggioUtente).html();

      var messaggioContatto = $('#message_contact_to_clone').clone();
      var contenutoContainerContatto = $(messaggioContatto).html();

      if (testoInserito.length > 0) {
        $(mainRightActive).append(contenutoContainerUtente);
        $('.message_user').addClass('active');
        $('#textarea').val('');

        //scrive messaggio contatto dopo un secondo
        setTimeout(function() {
          $(mainRightActive).append(contenutoContainerContatto)
          $('.message_contact').addClass('active');
        }, 1000);
      };
    };
  });

  // cancella messaggio CONTATTO
  $(document).on("mouseenter", ".message_contact", function(e) {

    //aggiunge classe freccia giu
    $(this).append('<i class="fas fa-angle-down delete_row"></i>');

    //evento quando il mouse esce dal messaggio
    $('.message_contact').mouseleave(function() {
      $('.delete_row').remove();
    });

    //click sulla freccia
    $('.delete_row').click(function() {

      // aggiunge menu cancella messaggio
      $(this).prev().append('<div class="delete_menu">Cancella il messaggio</div>').css('opacity', '1');

      // apre menu modale
      $('.delete_menu').click(function() {
        $('.menu_modale').addClass('active');
      });

      // elimina messaggio
      $('#btn-elimina').click(function() {
        $(e.target).remove()
        $('.menu_modale').removeClass('active');
      });

      // chiude menu modale
      $('#btn-chiudi').click(function() {
        $('.menu_modale').removeClass('active');
      });
    });
  });

  // cancella messaggio UTENTE
  $(document).on("mouseenter", ".message_user", function(e) {

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
        $(e.target).remove()
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


  // seleziona chat
  $('.chat').click(function() {

    // evidenzia chat selezionata
    $('.chat').removeClass('active');
    $('.home').css('display', 'none');
    $('.main_right_footer').css('display', 'flex');
    $('.header_right').css('display', 'flex');
    $(this).addClass('active');

    //nome contatto ed immagine in lista
    var nomeContatto = $(this).children().closest('.nome_utente').text();
    var iconaContatto = $(this).children().closest('.avatar').attr('src');

    //cambia nome contatto attivo
    $('.header_right span').text(nomeContatto);
    $('.header_right img').attr('src', iconaContatto);

    var index = $(this).index();
    var mainRightActive = $('.main_right')[index - 1];

    $('.main_right').removeClass('active');
    $(mainRightActive).addClass('active');

  });









  //chiusura document.ready
});
