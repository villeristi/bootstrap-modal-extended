/**
 * 
 * Bootstrap Modal Extended v0.1
 * -----------------------------
 * 
 * Demo: http://villeristi.github.io/bootstrapModalExtended
 * 
 * github.com/villeristi
 * twitter.com/villeristi
 *
 * 
 */


+function ($) {

  "use strict"

  var ModalExtended = $.fn.modal.Constructor

  
  ModalExtended.prototype.show = function (_relatedTarget) {
    
    var that = this,
        e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget }),
        transition = $.support.transition

    if( this.$element.hasClass('fade') && undefined != this.options.animateIn ){
      this.$element
        .removeClass('fade')
    }

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body)
      }

      that.$element
        .show()
        .scrollTop(0)

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      if ( transition ) {
        that.$element[0].offsetWidth
      }

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      if ( transition && undefined != that.options.animateIn ) {
        that.$element.addClass('animated ' + that.options.animateIn)
        that.$element.find('.modal-dialog')
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(1000)        
      }

      else{
        transition && that.$element.hasClass('fade') ?
          that.$element.find('.modal-dialog')
            .one($.support.transition.end, function () {
              that.$element.focus().trigger(e)
            })
            .emulateTransitionEnd(300) :
          that.$element.focus().trigger(e)
      }
    })
  }


  ModalExtended.prototype.hide = function (e) {

    var that = this

    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    if( 'undefined' != this.options.animateIn ){
      this.$element
        .removeClass('animated ' + this.options.animateIn)        
    }

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')


    if ( $.support.transition && undefined != this.options.animateOut ){
      this.$element
        .addClass('animated ' + this.options.animateOut)
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(1000)
        return false
    }

    else{

      $.support.transition && this.$element.hasClass('fade') ?
        this.$element
          .one($.support.transition.end, $.proxy(this.hideModal, this))
          .emulateTransitionEnd(300) :
        this.hideModal()

    }
  }


  ModalExtended.prototype.hideModal = function () {

    var that = this

    if( undefined != this.options.animateOut ){
      this.$element
        .removeClass('animated ' + this.options.animateOut)
    }

    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })

  }

}(jQuery);