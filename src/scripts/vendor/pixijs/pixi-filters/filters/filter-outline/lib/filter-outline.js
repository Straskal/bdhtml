/*!
 * @pixi/filter-outline - v2.6.0
 * Compiled Wed, 28 Feb 2018 22:04:57 UTC
 *
 * @pixi/filter-outline is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("pixi.js")):"function"==typeof define&&define.amd?define(["exports","pixi.js"],o):o(e.__filters={},e.PIXI)}(this,function(e,o){"use strict";var t="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",r="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n",n=function(e){function n(o,i,l){void 0===o&&(o=1),void 0===i&&(i=0),void 0===l&&(l=.1);var a=Math.max(l*n.MAX_SAMPLES,n.MIN_SAMPLES),s=(2*Math.PI/a).toFixed(7);e.call(this,t,r.replace(/\$\{angleStep\}/,s)),this.uniforms.thickness=new Float32Array([0,0]),this.thickness=o,this.uniforms.outlineColor=new Float32Array([0,0,0,1]),this.color=i,this.quality=l}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var i={color:{configurable:!0}};return n.prototype.apply=function(e,o,t,r){this.uniforms.thickness[0]=this.thickness/o.size.width,this.uniforms.thickness[1]=this.thickness/o.size.height,e.applyFilter(this,o,t,r)},i.color.get=function(){return o.utils.rgb2hex(this.uniforms.outlineColor)},i.color.set=function(e){o.utils.hex2rgb(e,this.uniforms.outlineColor)},Object.defineProperties(n.prototype,i),n}(o.Filter);n.MIN_SAMPLES=1,n.MAX_SAMPLES=100,e.OutlineFilter=n,Object.defineProperty(e,"__esModule",{value:!0})}),Object.assign(PIXI.filters,this.__filters);
//# sourceMappingURL=filter-outline.js.map
