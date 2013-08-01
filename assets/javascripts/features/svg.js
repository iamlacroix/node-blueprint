jQuery(function($) {
  if (!Modernizr.svg) {
    $('img[src*=".svg"]').each(function() {
      var $this = $(this);
      var customFallback = $this.data("svg-fallback");
      var autoFallback   = $this.attr('src').replace('.svg', '.png');
      var src = customFallback || autoFallback;
      $this.attr('src', src);
    });
  }
});
