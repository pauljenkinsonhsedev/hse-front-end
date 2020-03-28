$('#offCanvas').offcanvas({    
    role: "navigation",
    modifiers: "top,overlay",
    baseClass: "c-offcanvas",
    modalClass: "c-offcanvas-bg",
    contentClass: "c-offcanvas-content-wrap",
    closeButtonClass: "js-offcanvas-close",
    bodyModifierClass: "has-offcanvas",
    supportNoTransitionsClass: "support-no-transitions",
    resize: true,
    triggerButton: '#triggerButton' ,
    modal: true,
    onOpen: function() {},
    onClose: function() {},
    onInit: function() {}
})
.on( "create.offcanvas", function( e ){ } )
.on( "open.offcanvas", function( e ){ } )
.on( "opening.offcanvas", function( e ){ } )
.on( "close.offcanvas", function( e ){ } )
.on( "closing.offcanvas", function( e ){ } )
.on( "resizing.offcanvas", function( e ){ } );