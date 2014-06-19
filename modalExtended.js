
+function ($) {

  "use strict"

  var ModalExtended = $.fn.modal.Constructor


  /**
   * Show
   */
  
  ModalExtended.prototype.show = function (_relatedTarget) {
    
    var that = this,
        e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget }),
        transition = $.support.transition

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body)
      }

      that.$element
        .show()
        .scrollTop(0)

      if ( transition || ( transition && 'undefined' != that.options.animateIn ) ) {
        that.$element[0].offsetWidth
        that.$element.addClass('animated ' + that.options.animateIn)
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })


      // TODO:
      // if anime => anime,
      // if fade => fade
      // else => hideModal()

      transition || transition && that.$element.hasClass('fade') ?
        that.$element.find('.modal-dialog')
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(1000) :
        that.$element.focus().trigger(e)
    })
  }



  /**
   * Prepare for hide
   */

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

    // TODO:
    // if anime => anime,
    // if fade => fade
    // else => hideModal()

    $.support.transition && 'undefined' != this.options.animateOut || $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .addClass('animated ' + this.options.animateOut)
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(1000) :
      this.hideModal()
  }



  /**
   * Hide
   */

  ModalExtended.prototype.hideModal = function () {

    var that = this

    if( 'undefined' != this.options.animateOut ){
      this.$element.removeClass('animated ' + this.options.animateOut)
    }

    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })

  }

}(jQuery);