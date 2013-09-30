
// Custom dblkeydown, dblkeypress & dblkeyup events, rather like dblclick.
// https://github.com/georgeadamson/dblkey-event

;(function (factory) {

  // Register as an anonymous AMD module if relevant, otherwise assume oldskool browser globals:
  /* global define */
  if ( typeof this.define === "function" && define.amd ){
    define( ["jquery"], factory)
  }else{
    factory( jQuery )
  }

})(function( $, undefined ) {

  var dblkeyDelay = 300   // milliseconds

  $.each( ['down','press','up'], function(i,action){

    var prevKey, prevTarget, timeout

    $(document).on( 'key' + action, function(e){

      clearTimeout(timeout)

      if( e.which === prevKey && e.target === prevTarget ){

        prevKey = prevTarget = undefined
        var dbl = $.extend( {}, e, { type: 'dblkey' + action } )
        $(dbl.target).trigger( dbl )

      }else{

        prevKey    = e.which
        prevTarget = e.target
        timeout    = setTimeout( function(){ prevKey = prevTarget = undefined }, dblkeyDelay )

      }

    })

  })

});