jQuery(document).ready(function($) {
  $('.level-bar-inner').css('width', '0')
  $('.level-bar-inner').each(function () {
    var itemWidth = $(this).data('level')
    $(this).animate({
      width: itemWidth
    }, 800)
  })
})

function printWithSpecialFileName(){
    var tempTitle = document.title;
    document.title = "Special File Name.pdf";
    window.print();
    document.title = tempTitle;
}
