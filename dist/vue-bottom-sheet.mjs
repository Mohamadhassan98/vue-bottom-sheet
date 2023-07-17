import { defineComponent as V, useCssVars as P, ref as s, onBeforeUnmount as Y, openBlock as S, createBlock as I, Teleport as z, createElementVNode as d, mergeProps as L, createElementBlock as N, normalizeStyle as B, createCommentVNode as W, normalizeClass as $, unref as A, renderSlot as D, nextTick as F } from "vue";
import f from "hammerjs";
const M = /* @__PURE__ */ d("div", { class: "bottom-sheet__bar" }, null, -1), O = [
  M
], U = /* @__PURE__ */ V({
  __name: "VueBottomSheet",
  props: {
    overlay: { type: Boolean, default: !0 },
    maxWidth: { default: "640px" },
    maxHeight: { default: "95vh" },
    clickToClose: { type: Boolean, default: !0 },
    effect: { default: "fx-default" },
    rounded: { type: Boolean, default: !0 },
    swipeable: { type: Boolean, default: !0 },
    fullScreen: { type: Boolean, default: !1 },
    overlayColor: { default: "#0000004D" },
    backgroundScrollable: { type: Boolean, default: !1 },
    backgroundClickable: { type: Boolean, default: !1 }
  },
  emits: ["closed", "opened"],
  setup(o, { expose: _, emit: m }) {
    const n = o;
    P((e) => ({
      "094de529": y.value
    }));
    const i = s(), p = s(), h = s(), c = s(!1), v = s(!1), y = s("auto"), l = s(0), a = {
      pan: null,
      content: null
    };
    let g = !1, b = 0, r = 0, u = 0;
    Y(() => {
      var e, t;
      (e = a.pan) == null || e.destroy(), (t = a.content) == null || t.destroy();
    });
    const H = () => {
      const e = /iPhone/.test(navigator.userAgent) && !window.MSStream, t = window.screen.width / window.screen.height;
      return e && t.toFixed(3) === "0.462";
    }, T = async () => {
      if (await F(), y.value = "auto", u = H() ? 20 : 0, r = p.value.clientHeight, y.value = `${r - h.value.clientHeight}px`, p.value.style.maxHeight = n.maxHeight, l.value = n.effect === "fx-slide-from-right" || n.effect === "fx-slide-from-left" ? 0 : -r - u, !g) {
        const e = {
          recognizers: [[f.Pan, { direction: f.DIRECTION_VERTICAL }]]
        };
        a.pan = new f(h.value, e), a.pan && a.pan.on("panstart panup pandown panend", (t) => {
          k(t, "pan");
        }), a.content = new f(i.value, e), a.content && a.content.on("panstart panup pandown panend", (t) => {
          k(t, "content");
        }), g = !0;
      }
    }, E = () => {
      c.value = !0, l.value = 0, n.backgroundScrollable || (document.documentElement.style.overflowY = "hidden"), m("opened");
    }, k = (e, t) => {
      if (n.swipeable) {
        const C = -e.deltaY;
        t === "content" && e.type === "panup" || t === "content" && e.type === "pandown" && b > 0 ? i.value.scrollTop = b + C : (e.type === "panup" || e.type === "pandown") && (v.value = !0, e.deltaY > 0 && (l.value = C)), e.isFinal && (b = i.value.scrollTop, v.value = !1, l.value < -30 ? (c.value = !1, l.value = -r - u, document.documentElement.style.overflowY = "", m("closed")) : l.value = 0);
      }
    }, w = () => {
      c.value = !1, l.value = n.effect === "fx-slide-from-right" || n.effect === "fx-slide-from-left" ? 0 : -r - u, document.documentElement.style.overflowY = "", m("closed");
    }, x = (e) => {
      if (n.clickToClose) {
        const t = e.target;
        (t.classList.contains("bottom-sheet__backdrop") || t.classList.contains("bottom-sheet")) && w();
      }
    };
    return _({ open: E, close: w }), T(), (e, t) => (S(), I(z, { to: "body" }, [
      d("div", L({ ref: "bottomSheet" }, e.$attrs, {
        class: [
          "bottom-sheet",
          {
            opened: c.value,
            closed: c.value === !1,
            moving: v.value
          }
        ],
        style: {
          "pointer-events": o.backgroundClickable && o.clickToClose === !1 ? "none" : "all"
        },
        onMousedown: x,
        onTouchstart: x
      }), [
        o.overlay ? (S(), N("div", {
          key: 0,
          class: "bottom-sheet__backdrop",
          style: B({ background: o.overlayColor })
        }, null, 4)) : W("", !0),
        d("div", {
          ref_key: "bottomSheetCard",
          ref: p,
          style: B([
            { bottom: l.value + "px", maxWidth: o.maxWidth, maxHeight: o.maxHeight },
            { height: o.fullScreen ? "100vh" : "auto" },
            { "pointer-events": "all" }
          ]),
          class: $([
            "bottom-sheet__card",
            { stripe: A(u), square: !o.rounded },
            o.effect
          ])
        }, [
          d("div", {
            ref_key: "pan",
            ref: h,
            class: "bottom-sheet__pan"
          }, O, 512),
          d("div", {
            ref_key: "bottomSheetCardContent",
            ref: i,
            class: "bottom-sheet__content"
          }, [
            D(e.$slots, "default")
          ], 512)
        ], 6)
      ], 16)
    ]));
  }
});
export {
  U as VueBottomSheet
};
