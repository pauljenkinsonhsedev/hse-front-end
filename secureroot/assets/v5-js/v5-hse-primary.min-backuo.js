/* v4.2.7 */

// Global cookie notification bar

$(document).ready(function () {
			
$('<div id="cookieNotifyClose"><a href="#"><img src="'+platformPath+'/assets/v4-images/shared/cookie-close.png" alt="Close this information" /></a></div>').appendTo("#cookieNotify");
	
	
if ($.cookie('hseCookieNotify') == 'true') {
  $('#cookieContainer').addClass('hide-notification');
}
	
$('#cookieNotifyClose a').click(function() {
 $.cookie('hseCookieNotify', 'true', {expires: 365, path: '/' });
 $("#cookieContainer").remove();
});

});

	$(document).ready(function () {
		


// Appends relative file type to <a> tag
$('p a[href$="pdf"], ul li a[href$="pdf"]').append('<span class="fileType">' + '<span> (PDF)</span>' + '<span class="hide"> - Portable Document Format </span>' + '</span>');
$('p a[href$="docx"], ul li a[href$="docx"]').append('<span class="fileType">' + '<span> (.docx)</span>' + '<span class="hide"> - Microsoft Word document</span>' + '</span>');
$('p a[href$="doc"], ul li a[href$="doc"]').append('<span class="fileType">' + '<span> (.doc)</span>' + '<span class="hide"> - Microsoft Word document </span>' + '</span>');
$('p a[href$="xls"], ul li a[href$="xls"]').append('<span class="fileType">' + '<span> (.xls)</span> ' + '<span class="hide"> - Microsoft Excel spreadsheet</span>' + '</span>');
$('p a[href$="xlsx"], ul li a[href$="xlsx"]').append('<span class="fileType">' + '<span> (.xlsx)</span>' + '<span class="hide"> - Microsoft Excel spreadsheet </span>' + '</span>');
$('p a[href$="ppt"], ul li a[href$="ppt"]').append('<span class="fileType">' + ' <span> (.ppt)</span>' + '<span class="hide"> - Microsoft PowerPoint presentation </span>' + '</span>');
$('p a[href$="pptx"], ul li a[href$="pptx"]').append('<span class="fileType">' + ' <span> (.pptx)</span>' + '<span class="hide"> - Microsoft PowerPoint presentation </span>' + '</span>');
$('p a[href$="pps"], ul li a[href$="pps"]').append('<span class="fileType">' + ' <span> (.pps)</span>' + '<span class="hide"> - Microsoft PowerPoint presentation </span>' + '</span>');
$('p a[href$="zip"], ul li a[href$="zip"]').append('<span class="fileType">' + ' <span> (.zip)</span>' + '<span class="hide"> - ZIP file </span>' + '</span>');
$('p a[href$="mp3"], ul li a[href$="mp3"]').append('<span class="fileType">' + ' <span> (.mp3)</span>' + '<span class="hide"> - MP3 audio file </span>' + '</span>');
		

		
// Appends relative file type to resource title	
$('a[href$="pdf"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + '<span> (PDF)</span>' + '<span class="hide"> - Portable Document Format </span>' + '</span>');
$('a[href$="doc"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + '<span> (.doc)</span>' + '<span class="hide"> - Microsoft Word document </span>' + '</span>');
$('a[href$="docx"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.docx)</span>' + '<span class="hide"> - Microsoft Word document </span>' + '</span>');
$('a[href$="xls"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.xls)</span>' + '<span class="hide"> - Microsoft Excel spreadsheet </span>' + '</span>');
$('a[href$="xlsx"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.xlsx)</span>' + '<span class="hide"> - Microsoft Excel spreadsheet </span>' + '</span>');
$('a[href$="ppt"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.ppt)</span>' + '<span class="hide"> - Microsoft PowerPoint presentation </span>' + '</span>');
$('a[href$="pptx"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.pptx)</span>' + '<span class="hide"> - Microsoft PowerPoint presentation </span>' + '</span>');
$('a[href$="pps"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.pps)</span>' + '<span class="hide"> - Microsoft PowerPoint presentation </span>' + '</span>');
$('a[href$="zip"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.zip)</span>' + '<span class="hide"> - ZIP file </span>' + '</span>');
$('a[href$="mp3"]').find('.resourceTitle').append('<span class="fileType">' + '&nbsp;' + ' <span> (.mp3)</span>' + '<span class="hide"> - MP3 audio file</span>' + '</span>');
		
		
// Removes existing file type class	

		
$('.resourceTitle').siblings('.fileType').remove();
		
		
});


_hse = {
    notExternal: ["hsebooks.com", "hsesat.info", "vbtlwb16"],
    secondaryScripts: hse_url("/assets/v4-js/hse-secondary.min.js"),
    tableScripts: hse_url("/assets/v4-js/hse-tables.min.js"),
    lightboxScripts: hse_url("/assets/v4-js/hse-lightbox.min.js"),
    colorboxScripts: hse_url("/assets/v4-js/hse-colorbox.min.js")
};
_defaults = {
    aria_roles: hse_aria_landmark_roles,
    navigation: hse_subnav_init,
    ddm: hse_dropdownmenu_switch_init,
    interface_tweaks: hse_interface_tweaks_init,
    footnote_links: {
        load: hse_footnote_link_init
    },
    footnote_spaneviations: {
        load: hse_footnote_span_init
    },
    equal_heights: hse_equaliseHeights,
    tab_boxes: _hse_load(".tabContainer", _hse.secondaryScripts, "hse_tabs_init"),
    tabbed_panels: _hse_load("#focusSwitcher",
        _hse.secondaryScripts, "hse_tabbed_panel_init"),
    image_maps: _hse_load("img.imageMap", _hse.secondaryScripts, "hse_image_map"),
    pretty_forms: _hse_load(".hseform", _hse.secondaryScripts, "hse_prettyForms_init"),
    split_lists: _hse_load(".splitList2, .splitList3, .splitList4", _hse.secondaryScripts, "hse_splitList_init"),
    lightbox: _hse_load(".lightbox", _hse.lightboxScripts, "hse_lightbox_init"),
    colorbox: _hse_load(".colorbox", _hse.colorboxScripts, "hse_colorbox_init"),
    sortable_tables: _hse_load("table.tablesortable, table.sortable", _hse.tableScripts, "hse_sortable_tables_init"),
    expandable_tables: _hse_load("table:has(tbody):not(.noProgressiveEnhancement):not(.noExpanding)", _hse.tableScripts, "hse_expandable_tables_init")
};
$(function() {
    var b = preprocess(_defaults);
    "undefined" == typeof _local_preferences && (_local_preferences = {});
    _local_preferences = preprocess(_local_preferences);
    "undefined" == typeof _page_preferences && (_page_preferences = {});
    _page_preferences = preprocess(_page_preferences);
    var a = preprocess(hse_read_html_preferences()),
        b = $.extend(!0, b, _local_preferences, _page_preferences, a);
    $("body").data("settings", b);
    execute(b, "ready")
});
$(window).load(function() {
    execute($("body").data("settings"), "load")
});

function preprocess(b) {
    for (member in b) "function" == typeof b[member] && (b[member] = {
        ready: b[member]
    });
    return b
}

function off() {}

function execute(b, a) {
    for (member in b)
        if (member == a && "function" == typeof b[member]) b[member](b.properties);
        else "object" == typeof b[member] && execute(b[member], a)
}

function hse_read_html_preferences() {
    var b = [];
    $("head meta[name^='hse.preferences.']").each(function() {
        var a = $(this);
        j = a.attr("name").replace(/hse\.preferences\./, "");
        b[j] = a.attr("content")
    });
    return b
}

function hse_interface_tweaks_init() {
    $("body").addClass("hasScript");
    $(".autoSelect").autoSelect();
    $(".autoClear").toggleVal();
    $("p.more").parent("div, form").addClass("hasMore");
    $(document).bind("fontresize feedloaded", hse_equaliseHeights)
}

function isLocal() {
    try {
        return "" == location.host || "localhost" == location.host
    } catch (b) {}
}

function _hse_load(b, a, c) {
    return function() {
        $(b).length && dominoes(a, function() {
            if ("function" == typeof c) c();
            else window[c]()
        })
    }
}

function hse_load(b, a, c) {
    _hse_load(b, a, c)()
}

function _getHostnameFromUrl(b) {
    b = b.match(/^(.+):\/\/([^/]+)/im);
    return null == b ? !1 : b[2]
}

function hse_is_allowed_host(b, a) {
    var c = _getHostnameFromUrl(b),
        d = !1;
    if (!1 === c) return !1;
    if (null != c.match(/^([A-Za-z0-9\-]*\.)?hse\.gov\.uk$/)) return !0;
    $.each(a, function() {
        if (this == c || "www." + this == c) return d = !0, !1
    });
    return d
}

function hse_url(b, a) {
    var c = location;
    if (-1 < b.indexOf("://")) return b;
    if (0 === b.indexOf("/")) {
        var d = $("link[rel='home']").attr("href");
        if (d && d.match) {
            var d = (d = d.match(/\.\.\//g)) ? d.length : 0,
                f = c.pathname.split("/"),
                d = f.slice(0, f.length - d - 1).join("/");
            return (a ? c.protocol + "//" + c.host + "/" : "") + d + b
        }
    } else {
        if (a) {
            for (c = c.href.substring(0, c.toString().lastIndexOf("/"));
                /^\.\./.test(b);) c = c.substring(0, c.lastIndexOf("/")), b = b.substring(3);
            return c + "/" + b
        }
        return b
    }
}


	   
function hse_equaliseHeights() {

	
// If desktop use equaliseHeights function - Fix for users resizing to desktop from mobile
if ($("#backTo").css('display') == 'none') {

	//
 var b = {};
    $("[class*= equalHeight]").each(function() {
        var a = this.className.split(" ");
        $.each(a, function() {
            0 === this.indexOf("equalHeight") && (b[this] = 1)
        })
    });
    $.each(b, function(a) {
        $("." + a).equaliseCols()
    })
}
	
	//
	
(function(b) {
    b.fn.maxHeight = function() {
        var a = 0;
        this.each(function() {
            a = Math.max(a, b(this).height())
        });
        return a
    }
})


}
   (jQuery);
(function(b) {
    b.fn.equaliseCols = function() {
        var a = 0;
        return this.css("height", b.browser.msie ? "1%" : "auto").each(function() {
            a = Math.max(a, this.offsetHeight)
        }).css("height", a).each(function() {
            var c = this.offsetHeight;
            c > a && b(this).css("height", a - (c - a))
        })
    }
})(jQuery);
	   

function hse_aria_landmark_roles() {
	$("#search").attr("role", "search").attr("aria-label", "Primary");
    $("#headerContainer").attr("role", "banner");
    $("#navigationContainer").attr("role", "navigation").attr("aria-label", "Primary");
    $("#localsearch").attr("role", "search").attr("aria-label", "Secondary");
    $("#sideBar").attr("role", "complementary");
	$("form.gsc-search-box").attr("role", "search")
}



function hse_footnote_link_init(b) {
    var a = $.extend(!0, {
        append: function() {
            return $("#contentContainer")
        },
        selector: function(a) {
            return $("#contentContainer a:not([href^='javascript:']):not([href^='mailto:']):not(:empty):not([href^='#'])").not($("body.blog .metadata a"))
        }
    }, b);
    b = a.selector();
    a = a.append();
    if (b.length) {
        var c = '<h2 class="hideFromScreen footnotes">Link URLs in this page</h2><ol class="hideFromScreen">',
            d = 0;
        b.each(function() {
            var a = this.href,
                b = $(this),
                v = $.trim(b.text());
            _title = v.length ? v : b.find("img").attr("alt");
            d++;
            c += _title == a ? "<li>" + _title + "</li>" : "<li>" + _title + "<br />" + a + "</li>";
            $(this).after('<sup class="hideFromScreen">[' + d + "]</sup>")
        });
        a.append("</ol>" + c)
    }
}

function hse_footnote_span_init() {
    var b = $("#contentContainer"),
        a = b.find("acronym, span"),
        c = "";
    a.length && (c = '<h2 class="hideFromScreen footnotes">Glossary of spaneviations/acronyms on this page</h2><dl class="hideFromScreen">', a.each(function() {
        var a = $(this),
            b = a.text(),
            a = a.attr("title");
        $(c).append("<dt>" + b + "</dt><dd>" + a + "</dd>")
    }), b.append("</dl>" + c))
}

function hse_dropdownmenu_switch_init(b) {
    b = $.extend(!0, {
        dropdownsToEnhance: "ul.ddmswitch:not(.noProgressiveEnhancement)"
    }, b);
    $(".noProgressiveEnhancement").length || $(b.dropdownsToEnhance).each(function() {
        var a = $(this),
            b = a.attr("title");
        a.find("a.default:first").attr("href");
        var d = a.hasClass("separateLabel") ? !0 : !1;
        if (a.find("a img").length || a.hasClass("fauxDropdown")) {
            var f = 0,
                h = 0;
            a.find("li").each(function() {
                var a = $(this);
                0 < a.find("a.default").length || (f = Math.max(f, a.find("img:first").height(), a.find("span.nonLatin:first").height()),
                    h++)
            }).height(f);
            var v = f,
                y = Math.min(f * h, 500) + 2,
                D = 500 < f * h ? !0 : !1;
            a.height(v);
            var t = this.id + "-container";
            a.wrap('<div id="' + t + '" class="ddmswitchContainerWithImages"></div>');
            $("#" + t).height(v);
            d && ($("#" + t).prepend('<div class="ddmlabel">' + b + "</div>"), a.find("a.default:first").parent("li").remove());
            var q = function() {
                    var b = parseInt(a.offset().top),
                        d = parseInt($(window).height());
                    parseInt($(document).scrollTop()) + d < b + y ? a.addClass("scrollUp").removeClass("scrollDown") : a.addClass("scrollDown").removeClass("scrollUp");
                    a.addClass("open").animate({
                        height: y + "px"
                    });
                    D && $("#" + u).hide()
                },
                E = function() {
                    a.removeClass("open").animate({
                        height: v + "px"
                    });
                    D && ($("#" + u).show(), a.scrollTop(0))
                },
                u = this.id + "-trigger";
            $("#" + t).prepend('<div id="' + u + '" class="trigger" title="View the options"></div>');
            $("#" + u).css("cursor", "pointer").click(function(b) {
                a.hasClass("open") ? E() : q();
                b.stopPropagation()
            });
            $(document).click(function() {
                a.hasClass("open") && E()
            });
            a.click(function(b) {
                a.hasClass("open") || (q(), b.preventDefault(), b.stopPropagation())
            });
            a.find("li a").mouseover(function() {
                $(this).focus()
            })
        } else {
            var F = this.id,
                d = $("<select/>").attr("id", F),
                t = $('<input type="submit" value="Go" class="button" />');
            t.click(function() {
                document.location = $("#" + F).find("option:selected").val();
                return !1
            });
            t = $("<form/>").attr("action", "#").addClass(a.attr("class")).insertBefore(this).append(d).append(t);
            $(t).wrapInner('<div class="ddmStyling"></div>');
            a.find("a:not(.default)").each(function() {
                var a = $(this);
                a.replaceWith('<option value="' + a.attr("href") + '">' +
                    a.text() + "</option>")
            });
            a.find("option").appendTo(d);
            a.remove();
            d[0].selectedIndex = 0;
            d.before($("<label/>").attr("for", this.id).html(b).addClass("hidden hide"))
        }
    })
}

function hse_subnav_init(b) {
    var a = $.extend(!0, {
        root_selector: "ul#navSub",
        active_class: "active",
        expands_active_class: "expandsActive",
        first_active_class: "firstActive",
        expands_class: "expands",
        first_class: "first",
        open_class: "open",
        open_active_class: "openActive",
        closed_class: "closed"
    }, b);
    $(a.root_selector + " li:eq(0):not(.first)").addClass(a.first_class);
    $.browser.msie && 8 > $.browser.majorVersion && $(a.root_selector).find("ul, li").andSelf().css({
        zoom: "1"
    });
    $(a.root_selector + " li:has(ul)").each(function() {
        $(a.root_selector).attr("role",
            "tree").find("a").attr("role", "treeitem").end().find("ul").attr("role", "group");
        var b = this,
            d = $(b);
        b.open = function(a) {
            d.children("a").attr("aria-expanded", "true");
            !0 !== b.isOpen && (b.isOpen = !0, a ? (d.children("ul").show(), b.updateClass()) : d.children("ul").slideDown("normal", function() {
                b.updateClass()
            }), d.parents("ul li").each(function() {
                this.open && this.open(a)
            }))
        };
        b.close = function(a) {
            d.children("a").attr("aria-expanded", "false");
            !1 !== b.isOpen && (a ? (d.children("ul").hide(), b.updateClass()) : d.children("ul").slideUp("normal",
                function() {
                    b.updateClass()
                }), b.isOpen = !1)
        };
        b.toggle = function(a) {
            b.isOpen ? b.close(a) : b.open(a)
        };
        movePrev = function(a) {
            a.parent().prev().hasClass("open") ? a.parent().prev("li.open").find("li:visible").last().children("a").focus() : null === a.parent().prev().html() ? a.parent().parents("li").first().children("a").focus() : a.parent().prev().children("a").focus()
        };
        moveNext = function(a) {
            if (a.parent().hasClass("open")) a.parent().find("li").first().children("a").focus();
            else if (null === a.parent().next().html())
                for (i =
                    0; i < a.parent().parents("li").length; i++) {
                    if (null !== a.parent().parents("li").eq(i).next().html()) {
                        a.parent().parents("li").eq(i).next().children("a").focus();
                        break
                    }
                } else a.parent().next().children("a").focus()
        };
        b.updateClass = function() {
            if (b.isOpen) {
                var c = d.hasClass(a.active_class) ? a.open_active_class + " " + a.open_class : a.open_class;
                d.addClass(c).removeClass(a.closed_class)
            } else d.addClass(a.closed_class).removeClass(a.open_class + " " + a.open_active_class)
        };
        d.addClass(a.expands_class);
        d.click(function(a) {
            b.toggle();
            a.stopPropagation()
        });
        d.keydown(function(a) {
            switch (a.which) {
                case 37:
                    b.close();
                    d.children("a").focus();
                    a.stopPropagation();
                    break;
                case 39:
                    b.open();
                    break;
                default:
                    return
            }
            a.preventDefault()
        });
        $("ul#navSub li a").keydown(function(a) {
            switch (a.which) {
                case 38:
                    movePrev($(a.target));
                    break;
                case 40:
                    moveNext($(a.target));
                    break;
                default:
                    return
            }
            a.preventDefault()
        })
    });
    b = "li." + a.expands_class + ":not(." + a.active_class + ")";
    $(a.root_selector + ">" + b).add(a.root_selector + " ." + a.expands_class + " " + b).each(function() {
        this.close(!0)
    });
    $(a.root_selector + "  li:not(." + a.expands_class + ")").css("cursor", "auto").add(a.root_selector + "  a").click(function(a) {
        a.stopPropagation()
    });
    $(a.root_selector + " a").each(function() {
        $(this);
        this.activate = function() {
            var b = $(this).parent("li");
            b.addClass(a.active_class);
            b.hasClass(a.expands_class) ? b.addClass(a.expands_active_class) : b.hasClass(a.first_class) && b.addClass(a.first_active_class);
            _expandingParents = $(this).parents("li." + a.expands_class);
            _expandingParents.length && _expandingParents[0].open && _expandingParents[0].open(!0)
        }
    });
    b = $(a.root_selector + "  li." + a.active_class + " a");
    if (b.length && b[0].activate) b[0].activate();
    else {
        var c = $("link[rel=index]");
        if (c.length) {
            var d = !1;
            $(a.root_selector + " a").each(function() {
                d || $(this).attr("href") != c.attr("href") || (this.activate(), d = !0)
            })
        } else d = !1, $(a.root_selector + " a").each(function() {
            if (!d) {
                var a = decodeURI(this.href),
                    b = new String(decodeURI(document.location)),
                    b = "/" == b.charAt(b.length - 1) ? b + "index.htm" : b,
                    b = b.split("?")[0],
                    b = b.split("#")[0];
                a != document.location && a != b || a.lastIndexOf("#") ==
                    a.length - 1 || (this.activate(), found = d)
            }
        })
    }
}(function(b) {
    b.fn.autoSelect = function() {
        return this.each(function() {
            b(this).click(function() {
                this.select()
            })
        })
    }
})(jQuery);
(function(b) {
    b.fn.toggleVal = function(a) {
        var c = a || "hasFocus";
        return this.each(function() {
            var a = b(this),
                f = a.attr("title"),
                h = a.val();
            "" == h && a.val(f);
            a.focus(function() {
                var h = b(this);
                h.val() == f && a.val("");
                h.addClass(c)
            }).blur(function() {
                var h = b(this);
                "" == h.val() && a.val(f);
                h.removeClass(c)
            });
            a.parents("form").submit(function() {
                h == f && a.val("")
            })
        })
    }
})(jQuery);
jQuery.id = function(b) {
    if (b && b.id) return b.id;
    var a = $(document).data("seed");
    a || (a = Math.round(1E4 * Math.random()));
    $(document).data("seed", ++a);
    a = "id_" + $(document).data("seed");
    b && (b.id = a);
    return a
};

$.fn.toEm = function(b) {
    b = jQuery.extend({
        scope: "body"
    }, b);
    var a = parseInt(this[0], 10);
    b = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">\u00a0</div>').appendTo(b.scope);
    var c = b.height();
    b.remove();
    return (a / c).toFixed(8) + "em"
};

