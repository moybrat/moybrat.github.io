!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=4)}([function(t,e,r){"use strict";function n(t,e=!1){return e?Array.from(document.querySelectorAll(t)):document.querySelector(t)}function o(){HTMLElement.prototype.$=function(t,e=!1){return e?Array.from(this.querySelectorAll(t)):this.querySelector(t)},HTMLElement.prototype.createElement=function(t,e=!1){return t=this.appendChild(document.createElement(t)),Array.isArray(e)?e.forEach(e=>{t.classList.add(e)}):"string"==typeof e&&t.classList.add(e),t}}r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return c}));class c{constructor(t,e,r=!0){this._state=t,this._render=e,r&&this._render(this._state)}setState(t){for(const e in t)this._state.hasOwnProperty(e)&&(this._state[e]=t[e]);this._render(this._state)}getState(){return this._state}}},,,,function(t,e,r){"use strict";r.r(e);var n=r(0);Object(n.b)();const o=Object(n.a)(".authentication"),c=o.$(".nav-link",!0),i=o.$("main");console.log(o),console.log(c);const a=new n.c({active:0,last:void 0},t=>{c[t.active].classList.add("active"),void 0!==t.last&&c[t.last].classList.remove("active"),i.style.transform=`translateX(${100*-t.active}%)`});c.forEach((t,e)=>{t.onclick=()=>{const t=a.getState();t.active!==e&&a.setState({active:e,last:t.active})}})}]);