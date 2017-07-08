//import $ from "jquery";

$(document).ready(function () {

    $(".lock-char").keyup(function () {
        console.log(this);
        if (this.value.length == this.maxLength) {
            $(this).parent().next().find('.lock-char').focus().select();;
        }
    });
    $(".lock-char").focus(function() {
        if (this.value.length > 0) {
            this.select();
        }
    });

    document.getElementById('openMenu').onclick = function(){
        this.classList.toggle('open')
        document.getElementsByClassName('main-menu')[0].classList.toggle("open");
    };

    $('.bee-modal-wrapper').hide();

    $('main').on('click','.bee-item',function (e) {
        let modalId = $(this).data('modal');
        $('.bee-modal-wrapper').hide();
        $('.bee-modal-wrapper#'+modalId).css('display','flex').toggleClass('dspf');
    });

    $('main').on('click','.close-modal',function (e) {
        $(this).closest('.bee-modal-wrapper').hide().toggleClass('dspf');
    })

    $('main').on('click','.modal-overlay',function (e) {
        $(this).closest('.bee-modal-wrapper').hide().toggleClass('dspf');
    })



});