!function(t){"use strict";var e=t.utils||{};e.classes={hiddenVisually:"u-hidden-visually",modifier:"--",isActive:"is-active",isClosed:"is-closed",isOpen:"is-open",isClicked:"is-clicked",isAnimating:"is-animating",isVisible:"is-visible",hidden:"u-hidden"},e.keyCodes={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},e.a11yclick=function(t){var s=t.charCode||t.keyCode,i=t.type;return"click"===i||"keydown"===i&&(s===e.keyCodes.SPACE||s===e.keyCodes.ENTER||void 0)},e.a11yclickBind=function(t,s,i){t.on("click."+i+" keydown."+i,function(n){e.a11yclick(n)&&(n.preventDefault(n),s&&"function"==typeof s&&s.call(),t.trigger("clicked."+i))})},e.supportTransition="transition"in document.documentElement.style||"WebkitTransition"in document.documentElement.style,e.whichTransitionEvent=function(){var t=document.createElement("fakeelement"),e={transition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var s in e)if(void 0!==t.style[s])return e[s]},e.transEndEventName=e.whichTransitionEvent(),e.onEndTransition=function(t,s){var i=function(t){if(e.supportTransition){if(t.target!=this)return;this.removeEventListener(e.transEndEventName,i)}s&&"function"==typeof s&&s.call()};e.supportTransition?t.addEventListener(e.transEndEventName,i):i()},e.createModifierClass=function(t,s){return t+e.classes.modifier+s},e.cssModifiers=function(t,s,i){for(var n=t.split(","),o=0,a=n.length;o<a;o++)s.push(e.createModifierClass(i,n[o]))},e.getMetaOptions=function(t,e,s){var i="data-"+e,n=i+"-options",o=t.getAttribute(i)||t.getAttribute(n);try{return o&&JSON.parse(o)||{}}catch(e){return void(console&&console.error("Error parsing "+i+" on "+t.className+": "+e))}},t.utils=e}(this),function(t,e){"use strict";var s="trab-tab",i=s+"-component";t.componentNamespace=t.componentNamespace||{};var n=t.componentNamespace.TrapTabKey=function(t,s){if(!t)throw new Error("Element required to initialize object");this.element=t,this.$element=e(t),s=s||{},this.options=e.extend({},this.defaults,s)};n.prototype.init=function(){this.$element.data(i)||this.$element.data(i,this)},n.prototype.bindTrap=function(){var t=this;this.$element.on("keydown."+s,function(e){t._trapTabKey(t.$element,e)})},n.prototype.unbindTrap=function(){this.$element.off("keydown."+s)},n.prototype.giveFocus=function(){var t=this,e=t.options,s=t.$element.find("*"),i=t.$element.find("[data-focus]");i.length?i.first().focus():s.filter(e.focusableElementsString).filter(":visible").first().focus()},n.prototype._trapTabKey=function(t,e){var s,i,n,o,a=this.options;9==e.which&&(s=t.find("*").filter(a.focusableElementsString).filter(":visible"),i=jQuery(":focus"),n=s.length,o=s.index(i),e.shiftKey?0==o&&(s.get(n-1).focus(),e.preventDefault()):o==n-1&&(s.get(0).focus(),e.preventDefault()))},n.prototype.defaults={focusableElementsString:"a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]"},n.defaults=n.prototype.defaults}(this,jQuery),function(t,e){"use strict";var s="button",i=s+"-component",n=t.utils,o="icon-only",a="icon",r="toggle-state",l="visible-on-active";t.componentNamespace=t.componentNamespace||{};var c=t.componentNamespace.Button=function(t,i){if(!t)throw new Error("Element required to initialize object");this.element=t,this.$element=e(t),this.options=i=i||{},this.metadata=n.getMetaOptions(this.element,s),this.options=e.extend({},this.defaults,this.metadata,i)};c.prototype.init=function(){this.$element.data(i)||(this.$element.data(i,this),this.hasTitle=!!this.$element.attr("title"),this.$element.trigger("beforecreate."+s),this.isPressed=!1,this.isExpanded=!1,this._create())},c.prototype._create=function(){var t=this.options,i=[t.baseClass+"__text"];this._buttonClasses=[t.baseClass],null===t.label&&(t.label=this.$element.html()),t.wrapText&&(this.$buttonText=e("<span></span>").html(t.label).appendTo(this.$element.empty())),t.icon&&(this.$buttonIcon=e("<span class='"+t.iconFamily+" "+n.createModifierClass(t.iconFamily,t.icon)+"'></span>").prependTo(this.$element),this._buttonClasses.push(n.createModifierClass(t.baseClass,a)),t.iconActive&&(t.toggle=!0,this.$buttonIconActive=e("<span class='"+t.iconFamily+" "+n.createModifierClass(t.iconFamily,t.iconActive)+" "+n.createModifierClass(t.iconFamily,l)+"'></span>").insertAfter(this.$buttonIcon),this._buttonClasses.push(n.createModifierClass(t.baseClass,r))),t.hideText&&(i.push(n.classes.hiddenVisually),this._buttonClasses.push(n.createModifierClass(t.baseClass,o)))),t.modifiers&&n.cssModifiers(t.modifiers,this._buttonClasses,t.baseClass),t.wrapText&&this.$buttonText.addClass(i.join(" ")),t.textActive&&t.wrapText&&(t.toggle=!0,i.push(n.createModifierClass(t.baseClass+"__text",l)),this._buttonClasses.push(n.createModifierClass(t.baseClass,r)),this.$buttonTextActive=e("<span></span>").addClass(i.join(" ")).html(t.textActive).insertAfter(this.$buttonText),this.$element.attr("aria-live","polite")),this.$element.addClass(this._buttonClasses.join(" ")),t.role&&this.$element.attr("role",t.role),t.controls&&this.controls(t.controls),t.pressed&&this._isPressed(t.pressed),t.expanded&&(this.isPressed=!0,this._isExpanded(t.expanded)),this.hasTitle||!t.hideText||t.hideTitle||this.$element.attr("title",this.$element.text()),this.$element.trigger("create."+s)},c.prototype._isPressed=function(t){this.isPressed=t,this.$element.attr("aria-pressed",t)[t?"addClass":"removeClass"](n.classes.isActive)},c.prototype._isExpanded=function(t){this.isExpanded=t,this.$element.attr("aria-expanded",t)[t?"addClass":"removeClass"](n.classes.isActive)},c.prototype.controls=function(t){this.$element.attr("aria-controls",t)},c.prototype.destroy=function(){var t=this.options;if(this.$element.removeData(i).removeAttr("role").removeAttr("aria-pressed").removeAttr("aria-expanded").removeAttr("aria-controls").removeClass(this._buttonClasses.join(" ")).removeClass(n.classes.isActive).off("."+s),this.options.icon&&this.$element.find('[class^="'+this.options.iconFamily+'"]').remove(),t.wrapText){var e=this.$buttonText.html();this.$element.empty().html(e)}this.element=null,this.$element=null},c.prototype.defaults={baseClass:"c-button",role:"button",label:null,modifiers:null,controls:null,textActive:null,wrapText:!0,hideText:!1,hideTitle:!1,icon:null,iconActive:null,iconFamily:"o-icon",iconPosition:null,pressed:!1,expanded:!1},c.defaults=c.prototype.defaults}(this,jQuery),function(t,e){"use strict";var s="jsButton",i=".js-button";e.fn[s]=function(){return this.each(function(){new window.componentNamespace.Button(this).init()})},e(document).bind("enhance",function(t){e(e(t.target).is(i)&&t.target).add(i,t.target).filter(i)[s]()})}(0,jQuery),function(t,e){"use strict";var s="offcanvas",i=s+"-component",n=t.utils,o=document;t.componentNamespace=t.componentNamespace||{};var a=t.componentNamespace.Offcanvas=function(t,i){if(!t)throw new Error("Element required to initialize object");this.element=t,this.$element=e(t),this.options=i=i||{},this.metadata=n.getMetaOptions(this.element,s),this.options=e.extend({},this.defaults,this.metadata,i),this.isOpen=!1,this.onOpen=this.options.onOpen,this.onClose=this.options.onClose,this.onInit=this.options.onInit};a.prototype.init=function(){this.$element.data(i)||(this.$element.data(i,this),this.$element.trigger("beforecreate."+s),this._addAttributes(),this._initTrigger(),this._createModal(),this._trapTabKey(),this._closeButton(),this.onInit&&"function"==typeof this.onInit&&this.onInit.call(this.element),this.$element.trigger("create."+s))},a.prototype._addAttributes=function(){var s=this.options,i={tabindex:"-1","aria-hidden":!this.isOpen};s.role&&(i.role=s.role),this._panelClasses=[s.baseClass,n.classes.isClosed],t.utils.supportTransition||this._panelClasses.push(n.createModifierClass(s.baseClass,s.supportNoTransitionsClass)),n.cssModifiers(s.modifiers,this._panelClasses,s.baseClass),this.$element.attr(i).addClass(this._panelClasses.join(" ")),this.$content=e("."+s.contentClass),this._contentOpenClasses=[],n.cssModifiers(s.modifiers,this._contentOpenClasses,s.contentClass),this._modalOpenClasses=[s.modalClass,n.classes.isClosed],n.cssModifiers(s.modifiers,this._modalOpenClasses,s.modalClass),this._bodyOpenClasses=[s.bodyModifierClass+"--visible"],n.cssModifiers(s.modifiers,this._bodyOpenClasses,s.bodyModifierClass),s.modifiers.toLowerCase().indexOf("reveal")>=0?this.transitionElement=this.$content[0]:this.transitionElement=this.element},a.prototype._createModal=function(){var t=this,i=t.$element.parent();this.options.modal&&(this.$modal=e("<div></div>").on("mousedown."+s,function(){t.close()}).appendTo(i),this.$modal.addClass(this._modalOpenClasses.join(" ")))},a.prototype._trapTabKey=function(){this.trapTabKey=new t.componentNamespace.TrapTabKey(this.element),this.trapTabKey.init()},a.prototype._trapTabEscKey=function(){var t=this;e(o).on("keyup."+s,function(s){if((s.keyCode||s.which)===n.keyCodes.ESCAPE&&t.isOpen){if(e("input").is(":focus"))return;t.close()}})},a.prototype._closeButton=function(){var e=this,i=e.options;this.$closeBtn=this.$element.find("."+i.closeButtonClass),this.$closeBtn.length&&(this.closeBtn=new t.componentNamespace.Button(this.$closeBtn[0]),this.closeBtn.init(),this.closeBtn.controls(this.$element.attr("id")),n.a11yclickBind(this.$closeBtn,function(){e.close()},s))},a.prototype.open=function(){var t=this,a=t.options;this.isOpen||(a.resize&&this.resize(),this.$trigger||(this.$trigger=this.$element.data(i+"-trigger")),o.activeElement&&(this.lastFocus=o.activeElement),this.isOpen=!0,e("html, body").addClass(this._bodyOpenClasses.join(" ")),this._addClasses(this.$element,this.isOpen,!0),this._addClasses(this.$content,this.isOpen,!0),a.modal&&(this._addClasses(this.$modal,this.isOpen,!0),this.$modal.addClass(n.createModifierClass(a.modalClass,"opening"))),this.$element.attr("aria-hidden","false").addClass(n.createModifierClass(a.baseClass,"opening")).trigger("opening."+s),this.$content.addClass(this._contentOpenClasses.join(" ")),n.onEndTransition(this.transitionElement,function(){t.trapTabKey.giveFocus(),t.trapTabKey.bindTrap(),t._addClasses(t.$element,t.isOpen,!1),t._addClasses(t.$content,t.isOpen,!1),a.modal&&(t._addClasses(t.$modal,t.isOpen,!1),t.$modal.removeClass(n.createModifierClass(a.modalClass,"opening"))),t.$element.removeClass(n.createModifierClass(a.baseClass,"opening"))}),this.$trigger&&this.$trigger.button._isExpanded(!0),this.onOpen&&"function"==typeof this.onOpen&&this.onOpen.call(this.$element),this.$element.trigger("open."+s),this._trapTabEscKey())},a.prototype.close=function(){var i=this,a=i.options;this.isOpen&&(this.isOpen=!1,this._addClasses(this.$element,this.isOpen,!0),this._addClasses(this.$content,this.isOpen,!0),this.options.modal&&(this._addClasses(this.$modal,this.isOpen,!0),this.$modal.addClass(n.createModifierClass(a.modalClass,"closing"))),this.$element.attr("aria-hidden","true").addClass(n.createModifierClass(a.baseClass,"closing")).trigger("closing."+s),this.trapTabKey.unbindTrap(),i.$trigger&&i.$trigger.button._isExpanded(!1),n.onEndTransition(this.transitionElement,function(){i._addClasses(i.$element,i.isOpen,!1),i._addClasses(i.$content,i.isOpen,!1),i.options.modal&&(i._addClasses(i.$modal,i.isOpen,!1),i.$modal.removeClass(n.createModifierClass(a.modalClass,"closing"))),i.$content.removeClass(i._contentOpenClasses.join(" ")),i.$element.removeClass(n.createModifierClass(a.baseClass,"closing")),e("html, body").removeClass(i._bodyOpenClasses.join(" ")),i.lastFocus&&i.lastFocus.focus()}),this.onClose&&"function"==typeof this.onClose&&this.onClose.call(this.element),this.$element.trigger("close."+s),e(o).off("keyup."+s),e(t).off("."+s))},a.prototype._addClasses=function(t,e,s){e?s?t.removeClass(n.classes.isClosed).addClass(n.classes.isAnimating).addClass(n.classes.isOpen):t.removeClass(n.classes.isAnimating):s?t.removeClass(n.classes.isOpen).addClass(n.classes.isAnimating):t.addClass(n.classes.isClosed).removeClass(n.classes.isAnimating)},a.prototype.toggle=function(){this[this.isOpen?"close":"open"]()},a.prototype.resize=function(){function i(){n=!1}var n,o=this,a=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(e){t.setTimeout(e,1e3/60)};e(t).on("resize."+s+" orientationchange."+s,function(){n||a(i),n=!0,o.$element.trigger("resizing."+s),o.options.resize&&o.close()})},a.prototype._initTrigger=function(){var s=this.options,i=this.$element.attr("id");s.triggerButton?this.$triggerBtn=e(s.triggerButton):this.$triggerBtn=e("[data-offcanvas-trigger='"+i+"']"),new t.componentNamespace.OffcanvasTrigger(this.$triggerBtn[0],{offcanvas:i}).init()},a.prototype.setButton=function(t){this.$element.data(i+"-trigger",t)},a.prototype.destroy=function(){this.$element.trigger("destroy."+s),this.isOpen&&this.close(),this.options.modal&&this.$modal.remove(),this.$element.removeData().removeClass(this._panelClasses.join(" ")).removeAttr("tabindex").removeAttr("aria-hidden"),this.$triggerBtn&&this.$triggerBtn.removeData("offcanvas-trigger-component").off(".offcanvas").off(".offcanvas-trigger").data("button-component").destroy(),this.$element.off("."+s),e(o).off("."+s),e(t).off("."+s)},a.prototype.defaults={role:"dialog",modifiers:"left,overlay",baseClass:"c-offcanvas",modalClass:"c-offcanvas-bg",contentClass:"c-offcanvas-content-wrap",closeButtonClass:"js-offcanvas-close",bodyModifierClass:"has-offcanvas",supportNoTransitionsClass:"support-no-transitions",resize:!1,triggerButton:null,modal:!0,onOpen:null,onClose:null,onInit:null},a.defaults=a.prototype.defaults}(this,jQuery),function(t,e){"use strict";var s="offcanvas",i=".js-"+s;e.fn[s]=function(e){return this.each(function(){new t.componentNamespace.Offcanvas(this,e).init()})},e(t.document).on("enhance",function(t){e(e(t.target).is(i)&&t.target).add(i,t.target).filter(i)[s]()})}(this,jQuery),function(t,e){"use strict";var s="offcanvas-trigger",i=s+"-component",n=t.utils;t.componentNamespace=t.componentNamespace||{};var o=t.componentNamespace.OffcanvasTrigger=function(t,s){if(!t)throw new Error("Element required to initialize object");this.element=t,this.$element=e(t),this.options=s=s||{},this.options=e.extend({},this.defaults,s)};o.prototype.init=function(){this.$element.data(i)||(this.$element.data(i,this),this._create())},o.prototype._create=function(){if(this.options.offcanvas=this.options.offcanvas||this.$element.attr("data-offcanvas-trigger"),this.$offcanvas=e("#"+this.options.offcanvas),this.offcanvas=this.$offcanvas.data("offcanvas-component"),!this.offcanvas)throw new Error("Offcanvas Element not found");this.button=new t.componentNamespace.Button(this.element),this.button.init(),this.button.controls(this.options.offcanvas),this.button._isExpanded(!1),this._bindbehavior()},o.prototype._bindbehavior=function(){var t=this;this.offcanvas.setButton(t),n.a11yclickBind(this.$element,function(){t.offcanvas.toggle()},s)},o.prototype.defaults={offcanvas:null}}(this,jQuery),function(t,e){"use strict";var s="offcanvasTrigger",i="[data-offcanvas-trigger],.js-"+s;e.fn[s]=function(e){return this.each(function(){new t.componentNamespace.OffcanvasTrigger(this,e).init()})},e(t.document).on("enhance",function(t){e(e(t.target).is(i)&&t.target).add(i,t.target).filter(i)[s]()})}(this,jQuery),$(document).ready(function(){$("#article").attr("role","article"),$("#pagination").attr("role","navigation").attr("aria-label","Pagination Navigation"),$("#asideBottom").attr("role","complementary"),$("#multistepNav").attr("role","navigation").attr("aria-label","Secondary")});