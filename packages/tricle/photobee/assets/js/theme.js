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

});