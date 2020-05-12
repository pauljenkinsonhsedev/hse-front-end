$('#offCanvas').offcanvas({    
    role: "navigation",
    modifiers: "top, push",
    baseClass: "c-offcanvas",
    modalClass: "c-offcanvas-bg",
    contentClass: "c-offcanvas-content-wrap",
    closeButtonClass: "js-offcanvas-close",
    bodyModifierClass: "has-offcanvas",
    supportNoTransitionsClass: "support-no-transitions",
    resize: false,
    triggerButton: '#triggerButton' ,
    modal: false,
    onOpen: function() {},
    onClose: function() {},
    onInit: function() {}
});