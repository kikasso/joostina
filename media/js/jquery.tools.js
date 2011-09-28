/*
 * jQuery Tools 1.2.5 - The missing UI library for the Web
 * 
 * [tabs, tabs.slideshow, tooltip, tooltip.slide, tooltip.dynamic, scrollable, scrollable.autoscroll, scrollable.navigator, overlay, overlay.apple, dateinput, validator, toolbox.mousewheel]
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * jquery.event.wheel.js - rev 1 
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 * 
 * -----
 * 
 * File generated: Thu Oct 14 09:32:28 GMT 2010
 */
(function(c) {
    function p(d, b, a) {
        var e = this, l = d.add(this), h = d.find(a.tabs), i = b.jquery ? b : d.children(b), j;
        h.length || (h = d.children());
        i.length || (i = d.parent().find(b));
        i.length || (i = c(b));
        c.extend(this, {click:function(f, g) {
            var k = h.eq(f);
            if (typeof f == "string" && f.replace("#", "")) {
                k = h.filter("[href*=" + f.replace("#", "") + "]");
                f = Math.max(h.index(k), 0)
            }
            if (a.rotate) {
                var n = h.length - 1;
                if (f < 0)return e.click(n, g);
                if (f > n)return e.click(0, g)
            }
            if (!k.length) {
                if (j >= 0)return e;
                f = a.initialIndex;
                k = h.eq(f)
            }
            if (f === j)return e;
            g = g || c.Event();
            g.type = "onBeforeClick";
            l.trigger(g, [f]);
            if (!g.isDefaultPrevented()) {
                o[a.effect].call(e, f, function() {
                    g.type = "onClick";
                    l.trigger(g, [f])
                });
                j = f;
                h.removeClass(a.current);
                k.addClass(a.current);
                return e
            }
        }, getConf:function() {
            return a
        }, getTabs:function() {
            return h
        }, getPanes:function() {
            return i
        }, getCurrentPane:function() {
            return i.eq(j)
        }, getCurrentTab:function() {
            return h.eq(j)
        }, getIndex:function() {
            return j
        }, next:function() {
            return e.click(j + 1)
        }, prev:function() {
            return e.click(j - 1)
        }, destroy:function() {
            h.unbind(a.event).removeClass(a.current);
            i.find("a[href^=#]").unbind("click.T");
            return e
        }});
        c.each("onBeforeClick,onClick".split(","), function(f, g) {
            c.isFunction(a[g]) && c(e).bind(g, a[g]);
            e[g] = function(k) {
                k && c(e).bind(g, k);
                return e
            }
        });
        if (a.history && c.fn.history) {
            c.tools.history.init(h);
            a.event = "history"
        }
        h.each(function(f) {
            c(this).bind(a.event, function(g) {
                e.click(f, g);
                return g.preventDefault()
            })
        });
        i.find("a[href^=#]").bind("click.T", function(f) {
            e.click(c(this).attr("href"), f)
        });
        if (location.hash && a.tabs == "a" && d.find("[href=" + location.hash + "]").length)e.click(location.hash);
        else if (a.initialIndex === 0 || a.initialIndex > 0)e.click(a.initialIndex)
    }

    c.tools = c.tools || {version:"1.2.5"};
    c.tools.tabs = {conf:{tabs:"a", current:"current", onBeforeClick:null, onClick:null, effect:"default", initialIndex:0, event:"click", rotate:false, history:false}, addEffect:function(d, b) {
        o[d] = b
    }};
    var o = {"default":function(d, b) {
        this.getPanes().hide().eq(d).show();
        b.call()
    }, fade:function(d, b) {
        var a = this.getConf(), e = a.fadeOutSpeed, l = this.getPanes();
        e ? l.fadeOut(e) : l.hide();
        l.eq(d).fadeIn(a.fadeInSpeed, b)
    }, slide:function(d, b) {
        this.getPanes().slideUp(200);
        this.getPanes().eq(d).slideDown(400, b)
    }, ajax:function(d, b) {
        this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"), b)
    }}, m;
    c.tools.tabs.addEffect("horizontal", function(d, b) {
        m || (m = this.getPanes().eq(0).width());
        this.getCurrentPane().animate({width:0}, function() {
            c(this).hide()
        });
        this.getPanes().eq(d).animate({width:m}, function() {
            c(this).show();
            b.call()
        })
    });
    c.fn.tabs = function(d, b) {
        var a = this.data("tabs");
        if (a) {
            a.destroy();
            this.removeData("tabs")
        }
        if (c.isFunction(b))b =
        {onBeforeClick:b};
        b = c.extend({}, c.tools.tabs.conf, b);
        this.each(function() {
            a = new p(c(this), d, b);
            c(this).data("tabs", a)
        });
        return b.api ? a : this
    }
})(jQuery);
(function(c) {
    function p(g, a) {
        function m(f) {
            var e = c(f);
            return e.length < 2 ? e : g.parent().find(f)
        }

        var b = this, i = g.add(this), d = g.data("tabs"), h, j = true, n = m(a.next).click(function() {
            d.next()
        }), k = m(a.prev).click(function() {
            d.prev()
        });
        c.extend(b, {getTabs:function() {
            return d
        }, getConf:function() {
            return a
        }, play:function() {
            if (h)return b;
            var f = c.Event("onBeforePlay");
            i.trigger(f);
            if (f.isDefaultPrevented())return b;
            h = setInterval(d.next, a.interval);
            j = false;
            i.trigger("onPlay");
            return b
        }, pause:function() {
            if (!h)return b;
            var f = c.Event("onBeforePause");
            i.trigger(f);
            if (f.isDefaultPrevented())return b;
            h = clearInterval(h);
            i.trigger("onPause");
            return b
        }, stop:function() {
            b.pause();
            j = true
        }});
        c.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function(f, e) {
            c.isFunction(a[e]) && c(b).bind(e, a[e]);
            b[e] = function(q) {
                return c(b).bind(e, q)
            }
        });
        a.autopause && d.getTabs().add(n).add(k).add(d.getPanes()).hover(b.pause, function() {
            j || b.play()
        });
        a.autoplay && b.play();
        a.clickable && d.getPanes().click(function() {
            d.next()
        });
        if (!d.getConf().rotate) {
            var l =
                a.disabledClass;
            d.getIndex() || k.addClass(l);
            d.onBeforeClick(function(f, e) {
                k.toggleClass(l, !e);
                n.toggleClass(l, e == d.getTabs().length - 1)
            })
        }
    }

    var o;
    o = c.tools.tabs.slideshow = {conf:{next:".forward", prev:".backward", disabledClass:"disabled", autoplay:false, autopause:true, interval:3E3, clickable:true, api:false}};
    c.fn.slideshow = function(g) {
        var a = this.data("slideshow");
        if (a)return a;
        g = c.extend({}, o.conf, g);
        this.each(function() {
            a = new p(c(this), g);
            c(this).data("slideshow", a)
        });
        return g.api ? a : this
    }
})(jQuery);
(function(f) {
    function p(a, b, c) {
        var h = c.relative ? a.position().top : a.offset().top, d = c.relative ? a.position().left : a.offset().left, i = c.position[0];
        h -= b.outerHeight() - c.offset[0];
        d += a.outerWidth() + c.offset[1];
        if (/iPad/i.test(navigator.userAgent))h -= f(window).scrollTop();
        var j = b.outerHeight() + a.outerHeight();
        if (i == "center")h += j / 2;
        if (i == "bottom")h += j;
        i = c.position[1];
        a = b.outerWidth() + a.outerWidth();
        if (i == "center")d -= a / 2;
        if (i == "left")d -= a;
        return{top:h, left:d}
    }

    function u(a, b) {
        var c = this, h = a.add(c), d, i = 0, j =
            0, m = a.attr("title"), q = a.attr("data-tooltip"), r = o[b.effect], l, s = a.is(":input"), v = s && a.is(":checkbox, :radio, select, :button, :submit"), t = a.attr("type"), k = b.events[t] || b.events[s ? v ? "widget" : "input" : "def"];
        if (!r)throw'Nonexistent effect "' + b.effect + '"';
        k = k.split(/,\s*/);
        if (k.length != 2)throw"Tooltip: bad events configuration for " + t;
        a.bind(k[0],
            function(e) {
                clearTimeout(i);
                if (b.predelay)j = setTimeout(function() {
                    c.show(e)
                }, b.predelay); else c.show(e)
            }).bind(k[1], function(e) {
                clearTimeout(j);
                if (b.delay)i =
                    setTimeout(function() {
                        c.hide(e)
                    }, b.delay); else c.hide(e)
            });
        if (m && b.cancelDefault) {
            a.removeAttr("title");
            a.data("title", m)
        }
        f.extend(c, {show:function(e) {
            if (!d) {
                if (q)d = f(q); else if (b.tip)d = f(b.tip).eq(0); else if (m)d = f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m); else {
                    d = a.next();
                    d.length || (d = a.parent().next())
                }
                if (!d.length)throw"Cannot find tooltip for " + a;
            }
            if (c.isShown())return c;
            d.stop(true, true);
            var g = p(a, d, b);
            b.tip && d.html(a.data("title"));
            e = e || f.Event();
            e.type = "onBeforeShow";
            h.trigger(e, [g]);
            if (e.isDefaultPrevented())return c;
            g = p(a, d, b);
            d.css({position:"absolute", top:g.top, left:g.left});
            l = true;
            r[0].call(c, function() {
                e.type = "onShow";
                l = "full";
                h.trigger(e)
            });
            g = b.events.tooltip.split(/,\s*/);
            if (!d.data("__set")) {
                d.bind(g[0], function() {
                    clearTimeout(i);
                    clearTimeout(j)
                });
                g[1] && !a.is("input:not(:checkbox, :radio), textarea") && d.bind(g[1], function(n) {
                    n.relatedTarget != a[0] && a.trigger(k[1].split(" ")[0])
                });
                d.data("__set", true)
            }
            return c
        }, hide:function(e) {
            if (!d || !c.isShown())return c;
            e = e || f.Event();
            e.type = "onBeforeHide";
            h.trigger(e);
            if (!e.isDefaultPrevented()) {
                l = false;
                o[b.effect][1].call(c, function() {
                    e.type = "onHide";
                    h.trigger(e)
                });
                return c
            }
        }, isShown:function(e) {
            return e ? l == "full" : l
        }, getConf:function() {
            return b
        }, getTip:function() {
            return d
        }, getTrigger:function() {
            return a
        }});
        f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function(e, g) {
            f.isFunction(b[g]) && f(c).bind(g, b[g]);
            c[g] = function(n) {
                n && f(c).bind(g, n);
                return c
            }
        })
    }

    f.tools = f.tools || {version:"1.2.5"};
    f.tools.tooltip =
    {conf:{effect:"toggle", fadeOutSpeed:"fast", predelay:0, delay:30, opacity:1, tip:0, position:["top", "center"], offset:[0, 0], relative:false, cancelDefault:true, events:{def:"mouseenter,mouseleave", input:"focus,blur", widget:"focus mouseenter,blur mouseleave", tooltip:"mouseenter,mouseleave"}, layout:"<div/>", tipClass:"tooltip"}, addEffect:function(a, b, c) {
        o[a] = [b, c]
    }};
    var o = {toggle:[function(a) {
        var b = this.getConf(), c = this.getTip();
        b = b.opacity;
        b < 1 && c.css({opacity:b});
        c.show();
        a.call()
    }, function(a) {
        this.getTip().hide();
        a.call()
    }], fade:[function(a) {
        var b = this.getConf();
        this.getTip().fadeTo(b.fadeInSpeed, b.opacity, a)
    }, function(a) {
        this.getTip().fadeOut(this.getConf().fadeOutSpeed, a)
    }]};
    f.fn.tooltip = function(a) {
        var b = this.data("tooltip");
        if (b)return b;
        a = f.extend(true, {}, f.tools.tooltip.conf, a);
        if (typeof a.position == "string")a.position = a.position.split(/,?\s/);
        this.each(function() {
            b = new u(f(this), a);
            f(this).data("tooltip", b)
        });
        return a.api ? b : this
    }
})(jQuery);
(function(d) {
    var i = d.tools.tooltip;
    d.extend(i.conf, {direction:"up", bounce:false, slideOffset:10, slideInSpeed:200, slideOutSpeed:200, slideFade:!d.browser.msie});
    var e = {up:["-", "top"], down:["+", "top"], left:["-", "left"], right:["+", "left"]};
    i.addEffect("slide", function(g) {
        var a = this.getConf(), f = this.getTip(), b = a.slideFade ? {opacity:a.opacity} : {}, c = e[a.direction] || e.up;
        b[c[1]] = c[0] + "=" + a.slideOffset;
        a.slideFade && f.css({opacity:0});
        f.show().animate(b, a.slideInSpeed, g)
    }, function(g) {
        var a = this.getConf(), f = a.slideOffset, b = a.slideFade ? {opacity:0} : {}, c = e[a.direction] || e.up, h = "" + c[0];
        if (a.bounce)h = h == "+" ? "-" : "+";
        b[c[1]] = h + "=" + f;
        this.getTip().animate(b, a.slideOutSpeed, function() {
            d(this).hide();
            g.call()
        })
    })
})(jQuery);
(function(g) {
    function j(a) {
        var c = g(window), d = c.width() + c.scrollLeft(), h = c.height() + c.scrollTop();
        return[a.offset().top <= c.scrollTop(), d <= a.offset().left + a.width(), h <= a.offset().top + a.height(), c.scrollLeft() >= a.offset().left]
    }

    function k(a) {
        for (var c = a.length; c--;)if (a[c])return false;
        return true
    }

    var i = g.tools.tooltip;
    i.dynamic = {conf:{classNames:"top right bottom left"}};
    g.fn.dynamic = function(a) {
        if (typeof a == "number")a = {speed:a};
        a = g.extend({}, i.dynamic.conf, a);
        var c = a.classNames.split(/\s/), d;
        this.each(function() {
            var h =
                g(this).tooltip().onBeforeShow(function(e, f) {
                    e = this.getTip();
                    var b = this.getConf();
                    d || (d = [b.position[0], b.position[1], b.offset[0], b.offset[1], g.extend({}, b)]);
                    g.extend(b, d[4]);
                    b.position = [d[0], d[1]];
                    b.offset = [d[2], d[3]];
                    e.css({visibility:"hidden", position:"absolute", top:f.top, left:f.left}).show();
                    f = j(e);
                    if (!k(f)) {
                        if (f[2]) {
                            g.extend(b, a.top);
                            b.position[0] = "top";
                            e.addClass(c[0])
                        }
                        if (f[3]) {
                            g.extend(b, a.right);
                            b.position[1] = "right";
                            e.addClass(c[1])
                        }
                        if (f[0]) {
                            g.extend(b, a.bottom);
                            b.position[0] = "bottom";
                            e.addClass(c[2])
                        }
                        if (f[1]) {
                            g.extend(b,
                                a.left);
                            b.position[1] = "left";
                            e.addClass(c[3])
                        }
                        if (f[0] || f[2])b.offset[0] *= -1;
                        if (f[1] || f[3])b.offset[1] *= -1
                    }
                    e.css({visibility:"visible"}).hide()
                });
            h.onBeforeShow(function() {
                var e = this.getConf();
                this.getTip();
                setTimeout(function() {
                    e.position = [d[0], d[1]];
                    e.offset = [d[2], d[3]]
                }, 0)
            });
            h.onHide(function() {
                var e = this.getTip();
                e.removeClass(a.classNames)
            });
            ret = h
        });
        return a.api ? ret : this
    }
})(jQuery);
(function(e) {
    function p(f, c) {
        var b = e(c);
        return b.length < 2 ? b : f.parent().find(c)
    }

    function u(f, c) {
        var b = this, n = f.add(b), g = f.children(), l = 0, j = c.vertical;
        k || (k = b);
        if (g.length > 1)g = e(c.items, f);
        e.extend(b, {getConf:function() {
            return c
        }, getIndex:function() {
            return l
        }, getSize:function() {
            return b.getItems().size()
        }, getNaviButtons:function() {
            return o.add(q)
        }, getRoot:function() {
            return f
        }, getItemWrap:function() {
            return g
        }, getItems:function() {
            return g.children(c.item).not("." + c.clonedClass)
        }, move:function(a, d) {
            return b.seekTo(l +
                a, d)
        }, next:function(a) {
            return b.move(1, a)
        }, prev:function(a) {
            return b.move(-1, a)
        }, begin:function(a) {
            return b.seekTo(0, a)
        }, end:function(a) {
            return b.seekTo(b.getSize() - 1, a)
        }, focus:function() {
            return k = b
        }, addItem:function(a) {
            a = e(a);
            if (c.circular) {
                g.children("." + c.clonedClass + ":last").before(a);
                g.children("." + c.clonedClass + ":first").replaceWith(a.clone().addClass(c.clonedClass))
            } else g.append(a);
            n.trigger("onAddItem", [a]);
            return b
        }, seekTo:function(a, d, h) {
            a.jquery || (a *= 1);
            if (c.circular && a === 0 && l == -1 && d !==
                0)return b;
            if (!c.circular && a < 0 || a > b.getSize() || a < -1)return b;
            var i = a;
            if (a.jquery)a = b.getItems().index(a); else i = b.getItems().eq(a);
            var r = e.Event("onBeforeSeek");
            if (!h) {
                n.trigger(r, [a, d]);
                if (r.isDefaultPrevented() || !i.length)return b
            }
            i = j ? {top:-i.position().top} : {left:-i.position().left};
            l = a;
            k = b;
            if (d === undefined)d = c.speed;
            g.animate(i, d, c.easing, h || function() {
                n.trigger("onSeek", [a])
            });
            return b
        }});
        e.each(["onBeforeSeek", "onSeek", "onAddItem"], function(a, d) {
            e.isFunction(c[d]) && e(b).bind(d, c[d]);
            b[d] = function(h) {
                h &&
                e(b).bind(d, h);
                return b
            }
        });
        if (c.circular) {
            var s = b.getItems().slice(-1).clone().prependTo(g), t = b.getItems().eq(1).clone().appendTo(g);
            s.add(t).addClass(c.clonedClass);
            b.onBeforeSeek(function(a, d, h) {
                if (!a.isDefaultPrevented())if (d == -1) {
                    b.seekTo(s, h, function() {
                        b.end(0)
                    });
                    return a.preventDefault()
                } else d == b.getSize() && b.seekTo(t, h, function() {
                    b.begin(0)
                })
            });
            b.seekTo(0, 0, function() {
            })
        }
        var o = p(f, c.prev).click(function() {
            b.prev()
        }), q = p(f, c.next).click(function() {
            b.next()
        });
        if (!c.circular && b.getSize() > 1) {
            b.onBeforeSeek(function(a, d) {
                setTimeout(function() {
                    if (!a.isDefaultPrevented()) {
                        o.toggleClass(c.disabledClass, d <= 0);
                        q.toggleClass(c.disabledClass, d >= b.getSize() - 1)
                    }
                }, 1)
            });
            c.initialIndex || o.addClass(c.disabledClass)
        }
        c.mousewheel && e.fn.mousewheel && f.mousewheel(function(a, d) {
            if (c.mousewheel) {
                b.move(d < 0 ? 1 : -1, c.wheelSpeed || 50);
                return false
            }
        });
        if (c.touch) {
            var m = {};
            g[0].ontouchstart = function(a) {
                a = a.touches[0];
                m.x = a.clientX;
                m.y = a.clientY
            };
            g[0].ontouchmove = function(a) {
                if (a.touches.length == 1 && !g.is(":animated")) {
                    var d = a.touches[0], h =
                        m.x - d.clientX;
                    d = m.y - d.clientY;
                    b[j && d > 0 || !j && h > 0 ? "next" : "prev"]();
                    a.preventDefault()
                }
            }
        }
        c.keyboard && e(document).bind("keydown.scrollable", function(a) {
            if (!(!c.keyboard || a.altKey || a.ctrlKey || e(a.target).is(":input")))if (!(c.keyboard != "static" && k != b)) {
                var d = a.keyCode;
                if (j && (d == 38 || d == 40)) {
                    b.move(d == 38 ? -1 : 1);
                    return a.preventDefault()
                }
                if (!j && (d == 37 || d == 39)) {
                    b.move(d == 37 ? -1 : 1);
                    return a.preventDefault()
                }
            }
        });
        c.initialIndex && b.seekTo(c.initialIndex, 0, function() {
        })
    }

    e.tools = e.tools || {version:"1.2.5"};
    e.tools.scrollable =
    {conf:{activeClass:"active", circular:false, clonedClass:"cloned", disabledClass:"disabled", easing:"swing", initialIndex:0, item:null, items:".items", keyboard:true, mousewheel:false, next:".next", prev:".prev", speed:400, vertical:false, touch:true, wheelSpeed:0}};
    var k;
    e.fn.scrollable = function(f) {
        var c = this.data("scrollable");
        if (c)return c;
        f = e.extend({}, e.tools.scrollable.conf, f);
        this.each(function() {
            c = new u(e(this), f);
            e(this).data("scrollable", c)
        });
        return f.api ? c : this
    }
})(jQuery);
(function(b) {
    var f = b.tools.scrollable;
    f.autoscroll = {conf:{autoplay:true, interval:3E3, autopause:true}};
    b.fn.autoscroll = function(c) {
        if (typeof c == "number")c = {interval:c};
        var d = b.extend({}, f.autoscroll.conf, c), g;
        this.each(function() {
            var a = b(this).data("scrollable");
            if (a)g = a;
            var e, h = true;
            a.play = function() {
                if (!e) {
                    h = false;
                    e = setInterval(function() {
                        a.next()
                    }, d.interval)
                }
            };
            a.pause = function() {
                e = clearInterval(e)
            };
            a.stop = function() {
                a.pause();
                h = true
            };
            d.autopause && a.getRoot().add(a.getNaviButtons()).hover(a.pause,
                a.play);
            d.autoplay && a.play()
        });
        return d.api ? g : this
    }
})(jQuery);
(function(d) {
    function p(b, g) {
        var h = d(g);
        return h.length < 2 ? h : b.parent().find(g)
    }

    var m = d.tools.scrollable;
    m.navigator = {conf:{navi:".navi", naviItem:null, activeClass:"active", indexed:false, idPrefix:null, history:false}};
    d.fn.navigator = function(b) {
        if (typeof b == "string")b = {navi:b};
        b = d.extend({}, m.navigator.conf, b);
        var g;
        this.each(function() {
            function h(a, c, i) {
                e.seekTo(c);
                if (j) {
                    if (location.hash)location.hash = a.attr("href").replace("#", "")
                } else return i.preventDefault()
            }

            function f() {
                return k.find(b.naviItem ||
                    "> *")
            }

            function n(a) {
                var c = d("<" + (b.naviItem || "a") + "/>").click(
                    function(i) {
                        h(d(this), a, i)
                    }).attr("href", "#" + a);
                a === 0 && c.addClass(l);
                b.indexed && c.text(a + 1);
                b.idPrefix && c.attr("id", b.idPrefix + a);
                return c.appendTo(k)
            }

            function o(a, c) {
                a = f().eq(c.replace("#", ""));
                a.length || (a = f().filter("[href=" + c + "]"));
                a.click()
            }

            var e = d(this).data("scrollable"), k = b.navi.jquery ? b.navi : p(e.getRoot(), b.navi), q = e.getNaviButtons(), l = b.activeClass, j = b.history && d.fn.history;
            if (e)g = e;
            e.getNaviButtons = function() {
                return q.add(k)
            };
            f().length ? f().each(function(a) {
                d(this).click(function(c) {
                    h(d(this), a, c)
                })
            }) : d.each(e.getItems(), function(a) {
                n(a)
            });
            e.onBeforeSeek(function(a, c) {
                setTimeout(function() {
                    if (!a.isDefaultPrevented()) {
                        var i = f().eq(c);
                        !a.isDefaultPrevented() && i.length && f().removeClass(l).eq(c).addClass(l)
                    }
                }, 1)
            });
            e.onAddItem(function(a, c) {
                c = n(e.getItems().index(c));
                j && c.history(o)
            });
            j && f().history(o)
        });
        return b.api ? g : this
    }
})(jQuery);
(function(a) {
    function t(d, b) {
        var c = this, j = d.add(c), o = a(window), k, f, m, g = a.tools.expose && (b.mask || b.expose), n = Math.random().toString().slice(10);
        if (g) {
            if (typeof g == "string")g = {color:g};
            g.closeOnClick = g.closeOnEsc = false
        }
        var p = b.target || d.attr("rel");
        f = p ? a(p) : d;
        if (!f.length)throw"Could not find Overlay: " + p;
        d && d.index(f) == -1 && d.click(function(e) {
            c.load(e);
            return e.preventDefault()
        });
        a.extend(c, {load:function(e) {
            if (c.isOpened())return c;
            var h = q[b.effect];
            if (!h)throw'Overlay: cannot find effect : "' + b.effect +
                '"';
            b.oneInstance && a.each(s, function() {
                this.close(e)
            });
            e = e || a.Event();
            e.type = "onBeforeLoad";
            j.trigger(e);
            if (e.isDefaultPrevented())return c;
            m = true;
            g && a(f).expose(g);
            var i = b.top, r = b.left, u = f.outerWidth({margin:true}), v = f.outerHeight({margin:true});
            if (typeof i == "string")i = i == "center" ? Math.max((o.height() - v) / 2, 0) : parseInt(i, 10) / 100 * o.height();
            if (r == "center")r = Math.max((o.width() - u) / 2, 0);
            h[0].call(c, {top:i, left:r}, function() {
                if (m) {
                    e.type = "onLoad";
                    j.trigger(e)
                }
            });
            g && b.closeOnClick && a.mask.getMask().one("click",
                c.close);
            b.closeOnClick && a(document).bind("click." + n, function(l) {
                a(l.target).parents(f).length || c.close(l)
            });
            b.closeOnEsc && a(document).bind("keydown." + n, function(l) {
                l.keyCode == 27 && c.close(l)
            });
            return c
        }, close:function(e) {
            if (!c.isOpened())return c;
            e = e || a.Event();
            e.type = "onBeforeClose";
            j.trigger(e);
            if (!e.isDefaultPrevented()) {
                m = false;
                q[b.effect][1].call(c, function() {
                    e.type = "onClose";
                    j.trigger(e)
                });
                a(document).unbind("click." + n).unbind("keydown." + n);
                g && a.mask.close();
                return c
            }
        }, getOverlay:function() {
            return f
        },
            getTrigger:function() {
                return d
            }, getClosers:function() {
                return k
            }, isOpened:function() {
                return m
            }, getConf:function() {
                return b
            }});
        a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function(e, h) {
            a.isFunction(b[h]) && a(c).bind(h, b[h]);
            c[h] = function(i) {
                i && a(c).bind(h, i);
                return c
            }
        });
        k = f.find(b.close || ".close");
        if (!k.length && !b.close) {
            k = a('<a class="close"></a>');
            f.prepend(k)
        }
        k.click(function(e) {
            c.close(e)
        });
        b.load && c.load()
    }

    a.tools = a.tools || {version:"1.2.5"};
    a.tools.overlay = {addEffect:function(d, b, c) {
        q[d] = [b, c]
    }, conf:{close:null, closeOnClick:true, closeOnEsc:true, closeSpeed:"fast", effect:"default", fixed:!a.browser.msie || a.browser.version > 6, left:"center", load:false, mask:null, oneInstance:true, speed:"normal", target:null, top:"10%"}};
    var s = [], q = {};
    a.tools.overlay.addEffect("default", function(d, b) {
        var c = this.getConf(), j = a(window);
        if (!c.fixed) {
            d.top += j.scrollTop();
            d.left += j.scrollLeft()
        }
        d.position = c.fixed ? "fixed" : "absolute";
        this.getOverlay().css(d).fadeIn(c.speed, b)
    }, function(d) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed,
            d)
    });
    a.fn.overlay = function(d) {
        var b = this.data("overlay");
        if (b)return b;
        if (a.isFunction(d))d = {onBeforeLoad:d};
        d = a.extend(true, {}, a.tools.overlay.conf, d);
        this.each(function() {
            b = new t(a(this), d);
            s.push(b);
            a(this).data("overlay", b)
        });
        return d.api ? b : this
    }
})(jQuery);
(function(h) {
    function k(d) {
        var e = d.offset();
        return{top:e.top + d.height() / 2, left:e.left + d.width() / 2}
    }

    var l = h.tools.overlay, f = h(window);
    h.extend(l.conf, {start:{top:null, left:null}, fadeInSpeed:"fast", zIndex:9999});
    function o(d, e) {
        var a = this.getOverlay(), c = this.getConf(), g = this.getTrigger(), p = this, m = a.outerWidth({margin:true}), b = a.data("img"), n = c.fixed ? "fixed" : "absolute";
        if (!b) {
            b = a.css("backgroundImage");
            if (!b)throw"background-image CSS property not set for overlay";
            b = b.slice(b.indexOf("(") + 1, b.indexOf(")")).replace(/\"/g,
                "");
            a.css("backgroundImage", "none");
            b = h('<img src="' + b + '"/>');
            b.css({border:0, display:"none"}).width(m);
            h("body").append(b);
            a.data("img", b)
        }
        var i = c.start.top || Math.round(f.height() / 2), j = c.start.left || Math.round(f.width() / 2);
        if (g) {
            g = k(g);
            i = g.top;
            j = g.left
        }
        if (c.fixed) {
            i -= f.scrollTop();
            j -= f.scrollLeft()
        } else {
            d.top += f.scrollTop();
            d.left += f.scrollLeft()
        }
        b.css({position:"absolute", top:i, left:j, width:0, zIndex:c.zIndex}).show();
        d.position = n;
        a.css(d);
        b.animate({top:a.css("top"), left:a.css("left"), width:m},
            c.speed,
            function() {
                a.css("zIndex", c.zIndex + 1).fadeIn(c.fadeInSpeed, function() {
                    p.isOpened() && !h(this).index(a) ? e.call() : a.hide()
                })
            }).css("position", n)
    }

    function q(d) {
        var e = this.getOverlay().hide(), a = this.getConf(), c = this.getTrigger();
        e = e.data("img");
        var g = {top:a.start.top, left:a.start.left, width:0};
        c && h.extend(g, k(c));
        a.fixed && e.css({position:"absolute"}).animate({top:"+=" + f.scrollTop(), left:"+=" + f.scrollLeft()}, 0);
        e.animate(g, a.closeSpeed, d)
    }

    l.addEffect("apple", o, q)
})(jQuery);
(function(d) {
    function R(a, c) {
        return 32 - (new Date(a, c, 32)).getDate()
    }

    function S(a, c) {
        a = "" + a;
        for (c = c || 2; a.length < c;)a = "0" + a;
        return a
    }

    function T(a, c, j) {
        var q = a.getDate(), h = a.getDay(), r = a.getMonth();
        a = a.getFullYear();
        var f = {d:q, dd:S(q), ddd:B[j].shortDays[h], dddd:B[j].days[h], m:r + 1, mm:S(r + 1), mmm:B[j].shortMonths[r], mmmm:B[j].months[r], yy:String(a).slice(2), yyyy:a};
        c = c.replace(X, function(s) {
            return s in f ? f[s] : s.slice(1, s.length - 1)
        });
        return Y.html(c).html()
    }

    function v(a) {
        return parseInt(a, 10)
    }

    function U(a, c) {
        return a.getFullYear() === c.getFullYear() && a.getMonth() == c.getMonth() && a.getDate() == c.getDate()
    }

    function C(a) {
        if (a) {
            if (a.constructor == Date)return a;
            if (typeof a == "string") {
                var c = a.split("-");
                if (c.length == 3)return new Date(v(c[0]), v(c[1]) - 1, v(c[2]));
                if (!/^-?\d+$/.test(a))return;
                a = v(a)
            }
            c = new Date;
            c.setDate(c.getDate() + a);
            return c
        }
    }

    function Z(a, c) {
        function j(b, e, g) {
            n = b;
            D = b.getFullYear();
            E = b.getMonth();
            G = b.getDate();
            g = g || d.Event("api");
            g.type = "change";
            H.trigger(g, [b]);
            if (!g.isDefaultPrevented()) {
                a.val(T(b,
                    e.format, e.lang));
                a.data("date", b);
                h.hide(g)
            }
        }

        function q(b) {
            b.type = "onShow";
            H.trigger(b);
            d(document).bind("keydown.d", function(e) {
                if (e.ctrlKey)return true;
                var g = e.keyCode;
                if (g == 8) {
                    a.val("");
                    return h.hide(e)
                }
                if (g == 27)return h.hide(e);
                if (d(V).index(g) >= 0) {
                    if (!w) {
                        h.show(e);
                        return e.preventDefault()
                    }
                    var i = d("#" + f.weeks + " a"), t = d("." + f.focus), o = i.index(t);
                    t.removeClass(f.focus);
                    if (g == 74 || g == 40)o += 7; else if (g == 75 || g == 38)o -= 7; else if (g == 76 || g == 39)o += 1; else if (g == 72 || g == 37)o -= 1;
                    if (o > 41) {
                        h.addMonth();
                        t = d("#" +
                            f.weeks + " a:eq(" + (o - 42) + ")")
                    } else if (o < 0) {
                        h.addMonth(-1);
                        t = d("#" + f.weeks + " a:eq(" + (o + 42) + ")")
                    } else t = i.eq(o);
                    t.addClass(f.focus);
                    return e.preventDefault()
                }
                if (g == 34)return h.addMonth();
                if (g == 33)return h.addMonth(-1);
                if (g == 36)return h.today();
                if (g == 13)d(e.target).is("select") || d("." + f.focus).click();
                return d([16, 17, 18, 9]).index(g) >= 0
            });
            d(document).bind("click.d", function(e) {
                var g = e.target;
                if (!d(g).parents("#" + f.root).length && g != a[0] && (!L || g != L[0]))h.hide(e)
            })
        }

        var h = this, r = new Date, f = c.css, s = B[c.lang], k = d("#" + f.root), M = k.find("#" + f.title), L, I, J, D, E, G, n = a.attr("data-value") || c.value || a.val(), m = a.attr("min") || c.min, p = a.attr("max") || c.max, w;
        if (m === 0)m = "0";
        n = C(n) || r;
        m = C(m || c.yearRange[0] * 365);
        p = C(p || c.yearRange[1] * 365);
        if (!s)throw"Dateinput: invalid language: " + c.lang;
        if (a.attr("type") == "date") {
            var N = d("<input/>");
            d.each("class,disabled,id,maxlength,name,readonly,required,size,style,tabindex,title,value".split(","), function(b, e) {
                N.attr(e, a.attr(e))
            });
            a.replaceWith(N);
            a = N
        }
        a.addClass(f.input);
        var H =
            a.add(h);
        if (!k.length) {
            k = d("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({position:"absolute"}).attr("id", f.root);
            k.children().eq(0).attr("id", f.head).end().eq(1).attr("id", f.body).children().eq(0).attr("id", f.days).end().eq(1).attr("id", f.weeks).end().end().end().find("a").eq(0).attr("id", f.prev).end().eq(1).attr("id", f.next);
            M = k.find("#" + f.head).find("div").attr("id", f.title);
            if (c.selectors) {
                var z = d("<select/>").attr("id", f.month), A = d("<select/>").attr("id", f.year);
                M.html(z.add(A))
            }
            for (var $ =
                k.find("#" + f.days), O = 0; O < 7; O++)$.append(d("<span/>").text(s.shortDays[(O + c.firstDay) % 7]));
            d("body").append(k)
        }
        if (c.trigger)L = d("<a/>").attr("href", "#").addClass(f.trigger).click(
            function(b) {
                h.show();
                return b.preventDefault()
            }).insertAfter(a);
        var K = k.find("#" + f.weeks);
        A = k.find("#" + f.year);
        z = k.find("#" + f.month);
        d.extend(h, {show:function(b) {
            if (!(a.attr("readonly") || a.attr("disabled") || w)) {
                b = b || d.Event();
                b.type = "onBeforeShow";
                H.trigger(b);
                if (!b.isDefaultPrevented()) {
                    d.each(W, function() {
                        this.hide()
                    });
                    w = true;
                    z.unbind("change").change(function() {
                        h.setValue(A.val(), d(this).val())
                    });
                    A.unbind("change").change(function() {
                        h.setValue(d(this).val(), z.val())
                    });
                    I = k.find("#" + f.prev).unbind("click").click(function() {
                        I.hasClass(f.disabled) || h.addMonth(-1);
                        return false
                    });
                    J = k.find("#" + f.next).unbind("click").click(function() {
                        J.hasClass(f.disabled) || h.addMonth();
                        return false
                    });
                    h.setValue(n);
                    var e = a.offset();
                    if (/iPad/i.test(navigator.userAgent))e.top -= d(window).scrollTop();
                    k.css({top:e.top + a.outerHeight({margins:true}) +
                        c.offset[0], left:e.left + c.offset[1]});
                    if (c.speed)k.show(c.speed, function() {
                        q(b)
                    }); else {
                        k.show();
                        q(b)
                    }
                    return h
                }
            }
        }, setValue:function(b, e, g) {
            var i = v(e) >= -1 ? new Date(v(b), v(e), v(g || 1)) : b || n;
            if (i < m)i = m; else if (i > p)i = p;
            b = i.getFullYear();
            e = i.getMonth();
            g = i.getDate();
            if (e == -1) {
                e = 11;
                b--
            } else if (e == 12) {
                e = 0;
                b++
            }
            if (!w) {
                j(i, c);
                return h
            }
            E = e;
            D = b;
            g = new Date(b, e, 1 - c.firstDay);
            g = g.getDay();
            var t = R(b, e), o = R(b, e - 1), P;
            if (c.selectors) {
                z.empty();
                d.each(s.months, function(x, F) {
                    m < new Date(b, x + 1, -1) && p > new Date(b, x, 0) && z.append(d("<option/>").html(F).attr("value",
                        x))
                });
                A.empty();
                i = r.getFullYear();
                for (var l = i + c.yearRange[0]; l < i + c.yearRange[1]; l++)m <= new Date(l + 1, -1, 1) && p > new Date(l, 0, 0) && A.append(d("<option/>").text(l));
                z.val(e);
                A.val(b)
            } else M.html(s.months[e] + " " + b);
            K.empty();
            I.add(J).removeClass(f.disabled);
            l = !g ? -7 : 0;
            for (var u, y; l < (!g ? 35 : 42); l++) {
                u = d("<a/>");
                if (l % 7 === 0) {
                    P = d("<div/>").addClass(f.week);
                    K.append(P)
                }
                if (l < g) {
                    u.addClass(f.off);
                    y = o - g + l + 1;
                    i = new Date(b, e - 1, y)
                } else if (l >= g + t) {
                    u.addClass(f.off);
                    y = l - t - g + 1;
                    i = new Date(b, e + 1, y)
                } else {
                    y = l - g + 1;
                    i = new Date(b,
                        e, y);
                    if (U(n, i))u.attr("id", f.current).addClass(f.focus); else U(r, i) && u.attr("id", f.today)
                }
                m && i < m && u.add(I).addClass(f.disabled);
                p && i > p && u.add(J).addClass(f.disabled);
                u.attr("href", "#" + y).text(y).data("date", i);
                P.append(u)
            }
            K.find("a").click(function(x) {
                var F = d(this);
                if (!F.hasClass(f.disabled)) {
                    d("#" + f.current).removeAttr("id");
                    F.attr("id", f.current);
                    j(F.data("date"), c, x)
                }
                return false
            });
            f.sunday && K.find(f.week).each(function() {
                var x = c.firstDay ? 7 - c.firstDay : 0;
                d(this).children().slice(x, x + 1).addClass(f.sunday)
            });
            return h
        }, setMin:function(b, e) {
            m = C(b);
            e && n < m && h.setValue(m);
            return h
        }, setMax:function(b, e) {
            p = C(b);
            e && n > p && h.setValue(p);
            return h
        }, today:function() {
            return h.setValue(r)
        }, addDay:function(b) {
            return this.setValue(D, E, G + (b || 1))
        }, addMonth:function(b) {
            return this.setValue(D, E + (b || 1), G)
        }, addYear:function(b) {
            return this.setValue(D + (b || 1), E, G)
        }, hide:function(b) {
            if (w) {
                b = d.Event();
                b.type = "onHide";
                H.trigger(b);
                d(document).unbind("click.d").unbind("keydown.d");
                if (b.isDefaultPrevented())return;
                k.hide();
                w = false
            }
            return h
        },
            getConf:function() {
                return c
            }, getInput:function() {
                return a
            }, getCalendar:function() {
                return k
            }, getValue:function(b) {
                return b ? T(n, b, c.lang) : n
            }, isOpen:function() {
                return w
            }});
        d.each(["onBeforeShow", "onShow", "change", "onHide"], function(b, e) {
            d.isFunction(c[e]) && d(h).bind(e, c[e]);
            h[e] = function(g) {
                g && d(h).bind(e, g);
                return h
            }
        });
        a.bind("focus click", h.show).keydown(function(b) {
            var e = b.keyCode;
            if (!w && d(V).index(e) >= 0) {
                h.show(b);
                return b.preventDefault()
            }
            return b.shiftKey || b.ctrlKey || b.altKey || e == 9 ? true : b.preventDefault()
        });
        C(a.val()) && j(n, c)
    }

    d.tools = d.tools || {version:"1.2.5"};
    var W = [], Q, V = [75, 76, 38, 39, 74, 72, 40, 37], B = {};
    Q = d.tools.dateinput = {conf:{format:"mm/dd/yy", selectors:false, yearRange:[-5, 5], lang:"en", offset:[0, 0], speed:0, firstDay:0, min:undefined, max:undefined, trigger:false, css:{prefix:"cal", input:"date", root:0, head:0, title:0, prev:0, next:0, month:0, year:0, days:0, body:0, weeks:0, today:0, current:0, week:0, off:0, sunday:0, focus:0, disabled:0, trigger:0}}, localize:function(a, c) {
        d.each(c, function(j, q) {
            c[j] = q.split(",")
        });
        B[a] = c
    }};
    Q.localize("en", {months:"January,February,March,April,May,June,July,August,September,October,November,December", shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec", days:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday", shortDays:"Sun,Mon,Tue,Wed,Thu,Fri,Sat"});
    var X = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, Y = d("<a/>");
    d.expr[":"].date = function(a) {
        var c = a.getAttribute("type");
        return c && c == "date" || !!d(a).data("dateinput")
    };
    d.fn.dateinput = function(a) {
        if (this.data("dateinput"))return this;
        a = d.extend(true, {}, Q.conf, a);
        d.each(a.css, function(j, q) {
            if (!q && j != "prefix")a.css[j] = (a.css.prefix || "") + (q || j)
        });
        var c;
        this.each(function() {
            var j = new Z(d(this), a);
            W.push(j);
            j = j.getInput().data("dateinput", j);
            c = c ? c.add(j) : j
        });
        return c ? c : this
    }
})(jQuery);
(function(e) {
    function t(a, b, c) {
        var k = a.offset().top, f = a.offset().left, l = c.position.split(/,?\s+/), p = l[0];
        l = l[1];
        k -= b.outerHeight() - c.offset[0];
        f += a.outerWidth() + c.offset[1];
        if (/iPad/i.test(navigator.userAgent))k -= e(window).scrollTop();
        c = b.outerHeight() + a.outerHeight();
        if (p == "center")k += c / 2;
        if (p == "bottom")k += c;
        a = a.outerWidth();
        if (l == "center")f -= (a + b.outerWidth()) / 2;
        if (l == "left")f -= a;
        return{top:k, left:f}
    }

    function y(a) {
        function b() {
            return this.getAttribute("type") == a
        }

        b.key = "[type=" + a + "]";
        return b
    }

    function u(a, b, c) {
        function k(g, d, i) {
            if (!(!c.grouped && g.length)) {
                var j;
                if (i === false || e.isArray(i)) {
                    j = h.messages[d.key || d] || h.messages["*"];
                    j = j[c.lang] || h.messages["*"].en;
                    (d = j.match(/\$\d/g)) && e.isArray(i) && e.each(d, function(m) {
                        j = j.replace(this, i[m])
                    })
                } else j = i[c.lang] || i;
                g.push(j)
            }
        }

        var f = this, l = b.add(f);
        a = a.not(":button, :image, :reset, :submit");
        e.extend(f, {getConf:function() {
            return c
        }, getForm:function() {
            return b
        }, getInputs:function() {
            return a
        }, reflow:function() {
            a.each(function() {
                var g = e(this), d = g.data("msg.el");
                if (d) {
                    g = t(g, d, c);
                    d.css({top:g.top, left:g.left})
                }
            });
            return f
        }, invalidate:function(g, d) {
            if (!d) {
                var i = [];
                e.each(g, function(j, m) {
                    j = a.filter("[name='" + j + "']");
                    if (j.length) {
                        j.trigger("OI", [m]);
                        i.push({input:j, messages:[m]})
                    }
                });
                g = i;
                d = e.Event()
            }
            d.type = "onFail";
            l.trigger(d, [g]);
            d.isDefaultPrevented() || q[c.effect][0].call(f, g, d);
            return f
        }, reset:function(g) {
            g = g || a;
            g.removeClass(c.errorClass).each(
                function() {
                    var d = e(this).data("msg.el");
                    if (d) {
                        d.remove();
                        e(this).data("msg.el", null)
                    }
                }).unbind(c.errorInputEvent ||
                "");
            return f
        }, destroy:function() {
            b.unbind(c.formEvent + ".V").unbind("reset.V");
            a.unbind(c.inputEvent + ".V").unbind("change.V");
            return f.reset()
        }, checkValidity:function(g, d) {
            g = g || a;
            g = g.not(":disabled");
            if (!g.length)return true;
            d = d || e.Event();
            d.type = "onBeforeValidate";
            l.trigger(d, [g]);
            if (d.isDefaultPrevented())return d.result;
            var i = [];
            g.not(":radio:not(:checked)").each(function() {
                var m = [], n = e(this).data("messages", m), v = r && n.is(":date") ? "onHide.v" : c.errorInputEvent + ".v";
                n.unbind(v);
                e.each(w, function() {
                    var o =
                        this, s = o[0];
                    if (n.filter(s).length) {
                        o = o[1].call(f, n, n.val());
                        if (o !== true) {
                            d.type = "onBeforeFail";
                            l.trigger(d, [n, s]);
                            if (d.isDefaultPrevented())return false;
                            var x = n.attr(c.messageAttr);
                            if (x) {
                                m = [x];
                                return false
                            } else k(m, s, o)
                        }
                    }
                });
                if (m.length) {
                    i.push({input:n, messages:m});
                    n.trigger("OI", [m]);
                    c.errorInputEvent && n.bind(v, function(o) {
                        f.checkValidity(n, o)
                    })
                }
                if (c.singleError && i.length)return false
            });
            var j = q[c.effect];
            if (!j)throw'Validator: cannot find effect "' + c.effect + '"';
            if (i.length) {
                f.invalidate(i, d);
                return false
            } else {
                j[1].call(f,
                    g, d);
                d.type = "onSuccess";
                l.trigger(d, [g]);
                g.unbind(c.errorInputEvent + ".v")
            }
            return true
        }});
        e.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","), function(g, d) {
            e.isFunction(c[d]) && e(f).bind(d, c[d]);
            f[d] = function(i) {
                i && e(f).bind(d, i);
                return f
            }
        });
        c.formEvent && b.bind(c.formEvent + ".V", function(g) {
            if (!f.checkValidity(null, g))return g.preventDefault()
        });
        b.bind("reset.V", function() {
            f.reset()
        });
        a[0] && a[0].validity && a.each(function() {
            this.oninvalid = function() {
                return false
            }
        });
        if (b[0])b[0].checkValidity =
            f.checkValidity;
        c.inputEvent && a.bind(c.inputEvent + ".V", function(g) {
            f.checkValidity(e(this), g)
        });
        a.filter(":checkbox, select").filter("[required]").bind("change.V", function(g) {
            var d = e(this);
            if (this.checked || d.is("select") && e(this).val())q[c.effect][1].call(f, d, g)
        });
        var p = a.filter(":radio").change(function(g) {
            f.checkValidity(p, g)
        });
        e(window).resize(function() {
            f.reflow()
        })
    }

    e.tools = e.tools || {version:"1.2.5"};
    var z = /\[type=([a-z]+)\]/, A = /^-?[0-9]*(\.[0-9]+)?$/, r = e.tools.dateinput, B = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i, C = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i, h;
    h = e.tools.validator = {conf:{grouped:false, effect:"default", errorClass:"invalid", inputEvent:null, errorInputEvent:"keyup", formEvent:"submit", lang:"en", message:"<div/>", messageAttr:"data-message", messageClass:"error", offset:[0, 0], position:"center right", singleError:false, speed:"normal"}, messages:{"*":{en:"Please correct this value"}}, localize:function(a, b) {
        e.each(b, function(c, k) {
            h.messages[c] = h.messages[c] || {};
            h.messages[c][a] = k
        })
    },
        localizeFn:function(a, b) {
            h.messages[a] = h.messages[a] || {};
            e.extend(h.messages[a], b)
        }, fn:function(a, b, c) {
            if (e.isFunction(b))c = b; else {
                if (typeof b == "string")b = {en:b};
                this.messages[a.key || a] = b
            }
            if (b = z.exec(a))a = y(b[1]);
            w.push([a, c])
        }, addEffect:function(a, b, c) {
            q[a] = [b, c]
        }};
    var w = [], q = {"default":[function(a) {
        var b = this.getConf();
        e.each(a, function(c, k) {
            c = k.input;
            c.addClass(b.errorClass);
            var f = c.data("msg.el");
            if (!f) {
                f = e(b.message).addClass(b.messageClass).appendTo(document.body);
                c.data("msg.el", f)
            }
            f.css({visibility:"hidden"}).find("p").remove();
            e.each(k.messages, function(l, p) {
                e("<p/>").html(p).appendTo(f)
            });
            f.outerWidth() == f.parent().width() && f.add(f.find("p")).css({display:"inline"});
            k = t(c, f, b);
            f.css({visibility:"visible", position:"absolute", top:k.top, left:k.left}).fadeIn(b.speed)
        })
    }, function(a) {
        var b = this.getConf();
        a.removeClass(b.errorClass).each(function() {
            var c = e(this).data("msg.el");
            c && c.css({visibility:"hidden"})
        })
    }]};
    e.each("email,url,number".split(","), function(a, b) {
        e.expr[":"][b] = function(c) {
            return c.getAttribute("type") === b
        }
    });
    e.fn.oninvalid = function(a) {
        return this[a ? "bind" : "trigger"]("OI", a)
    };
    h.fn(":email", "Please enter a valid email address", function(a, b) {
        return!b || B.test(b)
    });
    h.fn(":url", "Please enter a valid URL", function(a, b) {
        return!b || C.test(b)
    });
    h.fn(":number", "Please enter a numeric value.", function(a, b) {
        return A.test(b)
    });
    h.fn("[max]", "Please enter a value smaller than $1", function(a, b) {
        if (b === "" || r && a.is(":date"))return true;
        a = a.attr("max");
        return parseFloat(b) <= parseFloat(a) ? true : [a]
    });
    h.fn("[min]", "Please enter a value larger than $1",
        function(a, b) {
            if (b === "" || r && a.is(":date"))return true;
            a = a.attr("min");
            return parseFloat(b) >= parseFloat(a) ? true : [a]
        });
    h.fn("[required]", "Please complete this mandatory field.", function(a, b) {
        if (a.is(":checkbox"))return a.is(":checked");
        return!!b
    });
    h.fn("[pattern]", function(a) {
        var b = new RegExp("^" + a.attr("pattern") + "$");
        return b.test(a.val())
    });
    e.fn.validator = function(a) {
        var b = this.data("validator");
        if (b) {
            b.destroy();
            this.removeData("validator")
        }
        a = e.extend(true, {}, h.conf, a);
        if (this.is("form"))return this.each(function() {
            var c =
                e(this);
            b = new u(c.find(":input"), c, a);
            c.data("validator", b)
        }); else {
            b = new u(this, this.eq(0).closest("form"), a);
            return this.data("validator", b)
        }
    }
})(jQuery);
(function(b) {
    function c(a) {
        switch (a.type) {
            case "mousemove":
                return b.extend(a.data, {clientX:a.clientX, clientY:a.clientY, pageX:a.pageX, pageY:a.pageY});
            case "DOMMouseScroll":
                b.extend(a, a.data);
                a.delta = -a.detail / 3;
                break;
            case "mousewheel":
                a.delta = a.wheelDelta / 120;
                break
        }
        a.type = "wheel";
        return b.event.handle.call(this, a, a.delta)
    }

    b.fn.mousewheel = function(a) {
        return this[a ? "bind" : "trigger"]("wheel", a)
    };
    b.event.special.wheel = {setup:function() {
        b.event.add(this, d, c, {})
    }, teardown:function() {
        b.event.remove(this,
            d, c)
    }};
    var d = !b.browser.mozilla ? "mousewheel" : "DOMMouseScroll" + (b.browser.version < "1.9" ? " mousemove" : "")
})(jQuery);
