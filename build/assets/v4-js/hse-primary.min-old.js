/* v4.2.7 */
_hse={notExternal:["hsebooks.com","hsesat.info","vbtlwb16"],secondaryScripts:hse_url("/assets/v4-js/hse-secondary.min.js"),tableScripts:hse_url("/assets/v4-js/hse-tables.min.js"),lightboxScripts:hse_url("/assets/v4-js/hse-lightbox.min.js"),colorboxScripts:hse_url("/assets/v4-js/hse-colorbox.min.js")};
_defaults={aria_roles:hse_aria_landmark_roles,aria_load_role:{load:hse_aria_landmark_load_roles},navigation:hse_subnav_init,ddm:hse_dropdownmenu_switch_init,link_icons:hse_link_icons_init,link_icons_positioning:{load:hse_link_icons_position},interface_tweaks:hse_interface_tweaks_init,footnote_links:{load:hse_footnote_link_init},footnote_abbreviations:{load:hse_footnote_abbr_init},equal_heights:hse_equaliseHeights,tab_boxes:_hse_load(".tabContainer",_hse.secondaryScripts,"hse_tabs_init"),tabbed_panels:_hse_load("#focusSwitcher",
_hse.secondaryScripts,"hse_tabbed_panel_init"),image_maps:_hse_load("img.imageMap",_hse.secondaryScripts,"hse_image_map"),pretty_forms:_hse_load(".hseform",_hse.secondaryScripts,"hse_prettyForms_init"),split_lists:_hse_load(".splitList2, .splitList3, .splitList4",_hse.secondaryScripts,"hse_splitList_init"),lightbox:_hse_load(".lightbox",_hse.lightboxScripts,"hse_lightbox_init"),colorbox:_hse_load(".colorbox",_hse.colorboxScripts,"hse_colorbox_init"),striped_tables:_hse_load("table:not(.noStripes)",
_hse.tableScripts,"hse_striped_tables"),sortable_tables:_hse_load("table.tablesortable, table.sortable",_hse.tableScripts,"hse_sortable_tables_init"),expandable_tables:_hse_load("table:has(tbody):not(.noProgressiveEnhancement):not(.noExpanding)",_hse.tableScripts,"hse_expandable_tables_init")};
$(function(){var b=preprocess(_defaults);"undefined"==typeof _local_preferences&&(_local_preferences={});_local_preferences=preprocess(_local_preferences);"undefined"==typeof _page_preferences&&(_page_preferences={});_page_preferences=preprocess(_page_preferences);var a=preprocess(hse_read_html_preferences()),b=$.extend(!0,b,_local_preferences,_page_preferences,a);$("body").data("settings",b);execute(b,"ready")});$(window).load(function(){execute($("body").data("settings"),"load")});
function preprocess(b){for(member in b)"function"==typeof b[member]&&(b[member]={ready:b[member]});return b}function off(){}function execute(b,a){for(member in b)if(member==a&&"function"==typeof b[member])b[member](b.properties);else"object"==typeof b[member]&&execute(b[member],a)}function hse_read_html_preferences(){var b=[];$("head meta[name^='hse.preferences.']").each(function(){var a=$(this);j=a.attr("name").replace(/hse\.preferences\./,"");b[j]=a.attr("content")});return b}
function hse_interface_tweaks_init(){$("body").addClass("hasScript");$(".autoSelect").autoSelect();$(".autoClear").toggleVal();$("p.more").parent("div, form").addClass("hasMore");$(document).bind("fontresize feedloaded",hse_equaliseHeights)}function isLocal(){try{return""==location.host||"localhost"==location.host}catch(b){}}function _hse_load(b,a,c){return function(){$(b).length&&dominoes(a,function(){if("function"==typeof c)c();else window[c]()})}}function hse_load(b,a,c){_hse_load(b,a,c)()}
function _getHostnameFromUrl(b){b=b.match(/^(.+):\/\/([^/]+)/im);return null==b?!1:b[2]}function hse_is_allowed_host(b,a){var c=_getHostnameFromUrl(b),d=!1;if(!1===c)return!1;if(null!=c.match(/^([A-Za-z0-9\-]*\.)?hse\.gov\.uk$/))return!0;$.each(a,function(){if(this==c||"www."+this==c)return d=!0,!1});return d}
function hse_url(b,a){var c=location;if(-1<b.indexOf("://"))return b;if(0===b.indexOf("/")){var d=$("link[rel='home']").attr("href");if(d&&d.match){var d=(d=d.match(/\.\.\//g))?d.length:0,f=c.pathname.split("/"),d=f.slice(0,f.length-d-1).join("/");return(a?c.protocol+"//"+c.host+"/":"")+d+b}}else{if(a){for(c=c.href.substring(0,c.toString().lastIndexOf("/"));/^\.\./.test(b);)c=c.substring(0,c.lastIndexOf("/")),b=b.substring(3);return c+"/"+b}return b}}
function hse_equaliseHeights(){var b={};$("[class*= equalHeight]").each(function(){var a=this.className.split(" ");$.each(a,function(){0===this.indexOf("equalHeight")&&(b[this]=1)})});$.each(b,function(a){$("."+a).equaliseCols()})}(function(b){b.fn.maxHeight=function(){var a=0;this.each(function(){a=Math.max(a,b(this).height())});return a}})(jQuery);
(function(b){b.fn.equaliseCols=function(){var a=0;return this.css("height",b.browser.msie?"1%":"auto").each(function(){a=Math.max(a,this.offsetHeight)}).css("height",a).each(function(){var c=this.offsetHeight;c>a&&b(this).css("height",a-(c-a))})}})(jQuery);
function hse_aria_landmark_roles(){$("#headerContainer").attr("role","banner");$("#contentContainer").attr("role","main");$("#navigationContainer").attr("role","navigation").attr("aria-label","Primary");$("#navSecondary").attr("role","navigation").attr("aria-label","Secondary");$("#search").attr("role","search").attr("aria-label","Primary");$("#localsearch").attr("role","search").attr("aria-label","Secondary");$("#sideBar").attr("role","complementary");$("#footerContainer").attr("role","contentinfo")}
function hse_aria_landmark_load_roles(){$("form.gsc-search-box").attr("role","search")}
function hse_link_icons_init(b){var a=$.extend(!0,{filetypes:{doc:"Word document",DOC:"Word document",docx:"Word document",DOCX:"Word document",ppt:"Powerpoint presentation",PPT:"Powerpoint presentation",pptx:"Powerpoint presentation",PPTX:"Powerpoint presentation",pps:"Powerpoint presentation",ppsx:"Powerpoint presentation",PPSX:"Powerpoint presentation",xls:"Excel spreadsheet",XLS:"Excel spreadsheet",xlsx:"Excel spreadsheet",xlsm:"Excel spreadsheet",XLSM:"Excel spreadsheet",pdf:"PDF",PDF:"PDF",
rtf:"RTF",zip:"ZIP"}},b);$("#pageContainer a, #navSecondary a").not(":not([href]), .noIcon, .shareBox a, div.downloadBox a, #navsub a, .socialMedia a").each(function(){var b=$(this);thisLinkUrl=b.attr("href");var d=_getHostnameFromUrl(thisLinkUrl),f=thisLinkUrl.split(".").pop();if(a.filetypes[f]){var h=a.filetypes[f];this.title+=h;b.append(' <img class="fileIcon" src="'+hse_url("/assets/v4-images/icons/"+f+".gif")+'" alt="'+h+'" />')}!1===d||d==location.hostname||hse_is_allowed_host(thisLinkUrl,_hse.notExternal)||
b.append(' <img class="fileIcon" src="'+hse_url("/assets/v4-images/icons/external.gif")+'" alt="link to external website" />')});$(".itemThumbBook li .fileIcon").css("visibility","hidden")}
function hse_link_icons_position(){$(".itemThumbBook li img").not(".fileIcon").each(function(){var b=$(this).height(),a=$(this).width(),c=$(this).siblings(".fileIcon").length;$(this).siblings(".fileIcon").each(function(d){var f=$(this).outerHeight(),h=$(this).outerWidth(),f=b-f;d=a-h*(c-d)-d;$(this).css("top",f+"px");$(this).css("left",d+"px");$(this).css("visibility","visible")})})}
function hse_footnote_link_init(b){var a=$.extend(!0,{append:function(){return $("#contentContainer")},selector:function(a){return $("#contentContainer a:not([href^='javascript:']):not([href^='mailto:']):not(:empty):not([href^='#'])").not($("body.blog .metadata a"))}},b);b=a.selector();a=a.append();if(b.length){var c='<h2 class="hideFromScreen footnotes">Link URLs in this page</h2><ol class="hideFromScreen">',d=0;b.each(function(){var a=this.href,b=$(this),v=$.trim(b.text());_title=v.length?v:b.find("img").attr("alt");
d++;c+=_title==a?"<li>"+_title+"</li>":"<li>"+_title+"<br />"+a+"</li>";$(this).after('<sup class="hideFromScreen">['+d+"]</sup>")});a.append("</ol>"+c)}}
function hse_footnote_abbr_init(){var b=$("#contentContainer"),a=b.find("acronym, abbr"),c="";a.length&&(c='<h2 class="hideFromScreen footnotes">Glossary of abbreviations/acronyms on this page</h2><dl class="hideFromScreen">',a.each(function(){var a=$(this),b=a.text(),a=a.attr("title");$(c).append("<dt>"+b+"</dt><dd>"+a+"</dd>")}),b.append("</dl>"+c))}
function hse_dropdownmenu_switch_init(b){b=$.extend(!0,{dropdownsToEnhance:"ul.ddmswitch:not(.noProgressiveEnhancement)"},b);$(".noProgressiveEnhancement").length||$(b.dropdownsToEnhance).each(function(){var a=$(this),b=a.attr("title");a.find("a.default:first").attr("href");var d=a.hasClass("separateLabel")?!0:!1;if(a.find("a img").length||a.hasClass("fauxDropdown")){var f=0,h=0;a.find("li").each(function(){var a=$(this);0<a.find("a.default").length||(f=Math.max(f,a.find("img:first").height(),a.find("span.nonLatin:first").height()),
h++)}).height(f);var v=f,y=Math.min(f*h,500)+2,D=500<f*h?!0:!1;a.height(v);var t=this.id+"-container";a.wrap('<div id="'+t+'" class="ddmswitchContainerWithImages"></div>');$("#"+t).height(v);d&&($("#"+t).prepend('<div class="ddmlabel">'+b+"</div>"),a.find("a.default:first").parent("li").remove());var q=function(){var b=parseInt(a.offset().top),d=parseInt($(window).height());parseInt($(document).scrollTop())+d<b+y?a.addClass("scrollUp").removeClass("scrollDown"):a.addClass("scrollDown").removeClass("scrollUp");
a.addClass("open").animate({height:y+"px"});D&&$("#"+u).hide()},E=function(){a.removeClass("open").animate({height:v+"px"});D&&($("#"+u).show(),a.scrollTop(0))},u=this.id+"-trigger";$("#"+t).prepend('<div id="'+u+'" class="trigger" title="View the options"></div>');$("#"+u).css("cursor","pointer").click(function(b){a.hasClass("open")?E():q();b.stopPropagation()});$(document).click(function(){a.hasClass("open")&&E()});a.click(function(b){a.hasClass("open")||(q(),b.preventDefault(),b.stopPropagation())});
a.find("li a").mouseover(function(){$(this).focus()})}else{var F=this.id,d=$("<select/>").attr("id",F),t=$('<input type="submit" value="Go" class="button" />');t.click(function(){document.location=$("#"+F).find("option:selected").val();return!1});t=$("<form/>").attr("action","#").addClass(a.attr("class")).insertBefore(this).append(d).append(t);$(t).wrapInner('<div class="ddmStyling"></div>');a.find("a:not(.default)").each(function(){var a=$(this);a.replaceWith('<option value="'+a.attr("href")+'">'+
a.text()+"</option>")});a.find("option").appendTo(d);a.remove();d[0].selectedIndex=0;d.before($("<label/>").attr("for",this.id).html(b).addClass("hidden hide"))}})}
function hse_subnav_init(b){var a=$.extend(!0,{root_selector:"ul#navSub",active_class:"active",expands_active_class:"expandsActive",first_active_class:"firstActive",expands_class:"expands",first_class:"first",open_class:"open",open_active_class:"openActive",closed_class:"closed"},b);$(a.root_selector+" li:eq(0):not(.first)").addClass(a.first_class);$.browser.msie&&8>$.browser.majorVersion&&$(a.root_selector).find("ul, li").andSelf().css({zoom:"1"});$(a.root_selector+" li:has(ul)").each(function(){$(a.root_selector).attr("role",
"tree").find("a").attr("role","treeitem").end().find("ul").attr("role","group");var b=this,d=$(b);b.open=function(a){d.children("a").attr("aria-expanded","true");!0!==b.isOpen&&(b.isOpen=!0,a?(d.children("ul").show(),b.updateClass()):d.children("ul").slideDown("normal",function(){b.updateClass()}),d.parents("ul li").each(function(){this.open&&this.open(a)}))};b.close=function(a){d.children("a").attr("aria-expanded","false");!1!==b.isOpen&&(a?(d.children("ul").hide(),b.updateClass()):d.children("ul").slideUp("normal",
function(){b.updateClass()}),b.isOpen=!1)};b.toggle=function(a){b.isOpen?b.close(a):b.open(a)};movePrev=function(a){a.parent().prev().hasClass("open")?a.parent().prev("li.open").find("li:visible").last().children("a").focus():null===a.parent().prev().html()?a.parent().parents("li").first().children("a").focus():a.parent().prev().children("a").focus()};moveNext=function(a){if(a.parent().hasClass("open"))a.parent().find("li").first().children("a").focus();else if(null===a.parent().next().html())for(i=
0;i<a.parent().parents("li").length;i++){if(null!==a.parent().parents("li").eq(i).next().html()){a.parent().parents("li").eq(i).next().children("a").focus();break}}else a.parent().next().children("a").focus()};b.updateClass=function(){if(b.isOpen){var c=d.hasClass(a.active_class)?a.open_active_class+" "+a.open_class:a.open_class;d.addClass(c).removeClass(a.closed_class)}else d.addClass(a.closed_class).removeClass(a.open_class+" "+a.open_active_class)};d.addClass(a.expands_class);d.click(function(a){b.toggle();
a.stopPropagation()});d.keydown(function(a){switch(a.which){case 37:b.close();d.children("a").focus();a.stopPropagation();break;case 39:b.open();break;default:return}a.preventDefault()});$("ul#navSub li a").keydown(function(a){switch(a.which){case 38:movePrev($(a.target));break;case 40:moveNext($(a.target));break;default:return}a.preventDefault()})});b="li."+a.expands_class+":not(."+a.active_class+")";$(a.root_selector+">"+b).add(a.root_selector+" ."+a.expands_class+" "+b).each(function(){this.close(!0)});
$(a.root_selector+"  li:not(."+a.expands_class+")").css("cursor","auto").add(a.root_selector+"  a").click(function(a){a.stopPropagation()});$(a.root_selector+" a").each(function(){$(this);this.activate=function(){var b=$(this).parent("li");b.addClass(a.active_class);b.hasClass(a.expands_class)?b.addClass(a.expands_active_class):b.hasClass(a.first_class)&&b.addClass(a.first_active_class);_expandingParents=$(this).parents("li."+a.expands_class);_expandingParents.length&&_expandingParents[0].open&&_expandingParents[0].open(!0)}});
b=$(a.root_selector+"  li."+a.active_class+" a");if(b.length&&b[0].activate)b[0].activate();else{var c=$("link[rel=index]");if(c.length){var d=!1;$(a.root_selector+" a").each(function(){d||$(this).attr("href")!=c.attr("href")||(this.activate(),d=!0)})}else d=!1,$(a.root_selector+" a").each(function(){if(!d){var a=decodeURI(this.href),b=new String(decodeURI(document.location)),b="/"==b.charAt(b.length-1)?b+"index.htm":b,b=b.split("?")[0],b=b.split("#")[0];a!=document.location&&a!=b||a.lastIndexOf("#")==
a.length-1||(this.activate(),found=d)}})}}(function(b){b.fn.autoSelect=function(){return this.each(function(){b(this).click(function(){this.select()})})}})(jQuery);(function(b){b.fn.toggleVal=function(a){var c=a||"hasFocus";return this.each(function(){var a=b(this),f=a.attr("title"),h=a.val();""==h&&a.val(f);a.focus(function(){var h=b(this);h.val()==f&&a.val("");h.addClass(c)}).blur(function(){var h=b(this);""==h.val()&&a.val(f);h.removeClass(c)});a.parents("form").submit(function(){h==f&&a.val("")})})}})(jQuery);
jQuery.id=function(b){if(b&&b.id)return b.id;var a=$(document).data("seed");a||(a=Math.round(1E4*Math.random()));$(document).data("seed",++a);a="id_"+$(document).data("seed");b&&(b.id=a);return a};
jQuery.onFontResize=function(b){b(document).ready(function(){var a=b("<iframe />").attr({id:"frame-onFontResize"+Date.parse(new Date),title:"Ignore this frame",src:"javascript:false;"}).addClass("div-onfontresize").css({width:"100em",height:"10px",position:"absolute",borderWidth:0,top:"-5000px",left:"-5000px"}).appendTo("body");if(b.browser.msie)a.bind("resize",function(){b.onFontResize.trigger(a[0].offsetWidth/100)});else{var c=a[0].contentWindow||a[0].contentDocument||a[0].document,c=c.document||
c;c.open();c.write('<script>window.onload = function(){var em = parent.jQuery(".div-onfontresize")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};\x3c/script>');c.close()}jQuery.onFontResize.initialSize=a[0].offsetWidth/100});return{trigger:function(a){b(document).trigger("fontresize",[a])}}}(jQuery);
$.fn.toEm=function(b){b=jQuery.extend({scope:"body"},b);var a=parseInt(this[0],10);b=jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">\u00a0</div>').appendTo(b.scope);var c=b.height();b.remove();return(a/c).toFixed(8)+"em"};
(function(b,a,c,d,f,h,v,y){if(!b[v])(function(D,t,q,E,u,F,L,y,n,G,M,N,r,H,w){function S(a,b){throw[v,a,b].join(": ");}function p(){A(I[q](arguments,0),{},{},T);return p}function T(){}function J(a,d){setTimeout(function(){a[h](d||b,I[q](arguments,2))},0);return p}function ka(){for(var a=[],b;B[n];){b=B.shift();try{if(b[0][h](I[q](b,1))!==d)a[r](b)}catch(k){}}B=a;B[n]||clearInterval(aa)}function ba(){for(;U[n];)args=U.shift(),args[0][h](a,I[q](args,1));O=d}function ca(){if((!a[H]||"complete"===a[H])&&
a.body)return da=O=c,J(ba),d}function la(a){K(a)&&((U[r](arguments),ea)?da&&!O&&(O=c,ba()):(ea=c,ca()||fa(ca)));return d}function V(a){var b={};return function(k,e){var c=arguments[n];if(1<c)if(e===d)b[k]&&delete b[k];else if(a)a[h](b,arguments);else b[k]=e;else if(k===d)b={};else if(c)return b[k];return p}}function A(a,b,k,e){var c,g;if(a)if(a.O&&e&&(e(),e=T),a[E]&&(b=a,a=a[E]),a[w]?c=a[w]:x(a)&&(c=a),c)c=P(c,b,k),x(c)?(x(a)?a={url:c}:a[w]=c,ma(a,e)):A(c,b,k,e);else if(K(a))a[q](b,e,k)!==d&&e();
else if(na(a)&&(g=a[n]))if(a.P){c=0;for(var m=g;c<g;)A(a[c++],b,k,function(){--m||e()})}else{var l=function(d){d<g?A(a[d++],b,k,function(){l(d)}):e()};l(0)}else e();else e()}function oa(a,b,k){function e(a){return(h=/^ { ([0-9]+) } $/.exec(a))?m[1*h[1]]:a.replace(/ { ([0-9]+) } /g,function(a,b){h=m[1*b];x(h)||S("type mismatch","string expected");return h})}for(var f,g,m={},l=0,h;!f;)f=c,a=a.replace(/\$([^$()]*)\(([^$()]*)\)/g,function(a,c,z){f=d;c&&!(g=ha[c]||Q(c))&&S("unknown functor",c);z=e(z);
x(z)&&(z=P(z,b,k));m[++l]=c?g[q](b,z,k):pa(z);x(m[l])&&(m[l]=P(m[l],b,k));return" { "+l+" } "});return e(a)}function P(a,b,k){var e;if(W.test(a)){a=a.split(W);b=0;k=a[n];e=[];var f=[],g=f,m,l;for(g.P=c;b<k;b++)if(l=a[b])if(X[l])if(l=X[l],1===l||2===l){if(2===l)g[r](la);g[n]&&(m=g.splice(0,g[n]),m.P=g.P,g[r](m,[]),g.P=d,g=g[1],g.P=c)}else if(3===l||5===l)m=[],g[r](m),e[r](g),g=m,g.P=c,g.O=5===l;else{if(4===l||6===l)e[n]?g=e.pop():S("unexpected symbol",a[b])}else g[r](l);e=f}else e=(e=b[a]||qa(a))?
x(e)?P(e,b,k):e:oa(a,b,k);return e}function Y(a){var b={},k={};return function(e,f){var g={},m,l=e[w],h;if(e[t]===d){for(h in e)g[h]=e[h];e=g;e[w]+=(/\?/.test(l)?"&":"?")+"_="+(new Date).getTime();a(e,f)}else if(b[l])f();else if(m=k[l])m[r](f);else k[l]=m=[f],a(e,function(){for(;m[n];)m.shift()();delete k[l];b[l]=c})}}function ra(a){var b={},k=d;return Y(function(e,f){b[e[w]]=f;k||(k=c,J(function(){var c=[],e,f=b;b={};k=d;for(e in f)c[r](e);A(a(c),{},{},function(){for(e in f)f[e]()})}))})}p.run=p;
var R=a[L]("head")[0]||a.documentElement,sa={}.toString,I=[].slice,ia=/loaded|complete/,C;p.later=J;for(C in{Array:1,Function:1,String:1})(function(a,b){b="[object "+a+"]";p["is"+a]=function(a){return sa[q](a)===b}})(C);var na=p.isArray,K=p.isFunction,x=p.isString,aa,B=[],fa=p.poll=function(a){K(a)&&(B[n]||(aa=setInterval(ka,13)),B[r](arguments));return p},U=[],ea=d,da=d,O=d,pa=p.property=V(),ha={},Q=p.functor=V(function(a,b){var c=/^([^$()]+)(?:\(([|SOF+]*)\))?$/.exec(a);if(c&&K(b))for(var e=c[1],
e=this[e]=this[e]||function(a,b){var c=a;c&&(g[N]&&x(c)?(g[N]!==h&&(h=g[N],f=ra(h)),c=function(b){f({url:a},b);return d}):x(c)&&(g.S||g.O)?g.S?c=g.S[q](this,c,b):g.O&&(c=g.O[q](this,{url:c},b)):c.url&&g.O?c=g.O[q](this,c,b):g.F&&(c=g.F[q](this,K(c)?c:function(b,c){A(a,this,c,b);return d},b)));return c},f=e.A,g=e.S=e.S||{},h=g[N],c=(c[2]||"F|S|O").split(/\|/),e=c[n];e--;)g[c[e]]=b}),qa=p.rule=V(function(a){var b=d,k=[],e=this[a]=this[a]||function(a,e){if(a&&a!==T)k[r](a);if(!b){b=c;var h=this;(function ga(){if(f[n])A(f.splice(0,
f[n]),h,e,ga);else if(k[n]){for(;k[n];)k.shift()();ga()}else b=d})()}return d},f=e.A=e.A||[];f[r](I[q](arguments,1))}),W=/\s+/,X={};L="0 > >| ( ) (( ))".split(W);for(C=L[n];--C;X[L[C]]=C);var ma=Y(function(b,c){var d=a[F]("script"),e;d[D]=D;b[u]&&(d[u]=b[u]);d.src=b[w];d[G]=d[M]=function(){if(!(e=d[H])||ia.test(e))d[G]=d[M]=f,R.removeChild(d),c&&J(c)};R.insertBefore(d,R.firstChild)}),ja=0,Z={},ta=function(){for(var b,c,f=a.styleSheets,e,h=f[n];h--;)if(c=f[h],(e=c[y])&&(b=Z[e]))try{throw b.r=c.cssRules,
"SECURITY";}catch(g){if(/SECURITY/.test(g)&&(J(b),delete Z[e],!--ja))return d}},ua=function(a,b){a[H]?a[M]=function(){ia.test(a[H])&&(a[M]=f,b())}:a[G]===f&&a.all?a[G]=function(){a[G]=f;b()}:(Z[a[y]]=b,ja++||fa(ta))};(function(a,b,c){Q(a+"("+b+")",function(a){return function(b){c(a,b);return d}});ha[a]=Q(a);Q(a,d)})("css","O",Y(function(b,c){var d=a[F]("link"),e=b.title;d.rel="stylesheet";d.type="text/css";d.media=b.media||"screen";d[y]=b[w];b[u]&&(d[u]=b[u]);ua(d,function(){e&&(d.title=e);c()});
R.appendChild(d)}));b[v]=p})[h](b,"async cache call chain charset createElement getElementsByTagName href length onload onreadystatechange + push readyState url".split(" "))})(window,document,!0,!1,null,"apply","dominoes");