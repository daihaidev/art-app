/* eslint-disable */
/**
 * CrayonBrush class
 * @class fabric.CirclePatternBrush
 * @extends fabric.BaseBrush
 */
(function (fabric) {

    fabric.CrayonBrush = fabric.util.createClass(fabric.BaseBrush, {

        color: "#000000",
        opacity: 0.6,
        width: 30,

        _baseWidth: 0,
        _inkAmount: 5,
        _latestStrokeLength: 0,
        _point: null,
        _sep: 4,
        _size: 0,

        initialize: function (canvas, opt) {
            opt = opt || {};

            this.canvas = canvas;
            this.width = opt.width || canvas.freeDrawingBrush.width;
            this.color = opt.color || canvas.freeDrawingBrush.color;
            this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
            this._point = new fabric.Point(0, 0);
            this.points = [];
            this.rects = [];
        },

        changeColor: function (color) {
            this.color = color;
        },

        changeOpacity: function (value) {
            this.opacity = value;
        },

        onMouseDown: function (pointer) {
            this.canvas.contextTop.globalAlpha = this.opacity;
            this._size = this.width / 2 + this._baseWidth;
            this.set(pointer);
        },

        onMouseMove: function (pointer) {
            this.points.push(pointer);
            this.update(pointer);
            this.draw(this.canvas.contextTop);
            var originalRenderOnAddRemove = this.canvas.renderOnAddRemove, i, len;
            this.canvas.renderOnAddRemove = false;

            rects = this._getOptimizedRects(this.rects);


            var group = new fabric.Group(rects);
            group.canvas = this.canvas;
            group.selectable = false;
            group.hoverCursor = 'context-menu';
            // evented: false,
            this.canvas.fire('before:path:created', { path: group });
            this.canvas.add(group);
            this.canvas.fire('path:created', { path: group });

            this.canvas.clearContext(this.canvas.contextTop);
            this._resetShadow();
            this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
            this.canvas.requestRenderAll();
            this.rects = [];
        },

        onMouseUp: function () {
            // var originalRenderOnAddRemove = this.canvas.renderOnAddRemove, i, len;
            // this.canvas.renderOnAddRemove = false;

            // rects = this._getOptimizedRects(this.rects);


            // var group = new fabric.Group(rects);
            // group.canvas = this.canvas;
            // group.selectable = false;
            // group.hoverCursor = 'context-menu';
            // // evented: false,
            // this.canvas.fire('before:path:created', { path: group });
            // this.canvas.add(group);
            // this.canvas.fire('path:created', { path: group });

            // this.canvas.clearContext(this.canvas.contextTop);
            // this._resetShadow();
            // this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
            // this.canvas.requestRenderAll();
            // this.rects = [];
        },
        /**
         * @private
         * @param {Array} rects
         */
        _getOptimizedRects: function (rects) {

            // avoid creating duplicate rects at the same coordinates
            var uniqueRects = {}, key, i, len;

            for (i = 0, len = rects.length; i < len; i++) {
                key = rects[i].left + '' + rects[i].top;
                if (!uniqueRects[key]) {
                    uniqueRects[key] = rects[i];
                }
            }
            var uniqueRectsArray = [];
            for (key in uniqueRects) {
                uniqueRectsArray.push(uniqueRects[key]);
            }

            return uniqueRectsArray;
        },

        set: function (p) {
            if (this._latest) {
                this._latest.setFromPoint(this._point);
            } else {
                this._latest = new fabric.Point(p.x, p.y);
            }
            fabric.Point.prototype.setFromPoint.call(this._point, p);
        },

        update: function (p) {
            this.set(p);
            this._latestStrokeLength = this._point.subtract(this._latest).distanceFrom({ x: 0, y: 0 });
        },

        draw: function (ctx) {
            var i, j, p, r, c, x, y, w, h, v, s, stepNum, dotSize, dotNum, range;

            v = this._point.subtract(this._latest);
            s = Math.ceil(this._size / 2);
            stepNum = Math.floor(v.distanceFrom({ x: 0, y: 0 }) / s) + 1;
            v.normalize(s);

            dotSize = this._sep * fabric.util.clamp(this._inkAmount / this._latestStrokeLength * 2, 1, 0.5);
            dotNum = Math.ceil(this._size * this._sep);

            range = this._size / 2;

            // ctx.save();
            // ctx.fillStyle = this.color;
            // ctx.beginPath();
            for (i = 0; i < dotNum; i++) {
                for (j = 0; j < stepNum; j++) {
                    p = this._latest.add(v.multiply(j));
                    r = fabric.util.getRandom(range);
                    c = fabric.util.getRandom(Math.PI * 2);
                    w = fabric.util.getRandom(dotSize, dotSize / 2);
                    h = fabric.util.getRandom(dotSize, dotSize / 2);
                    x = p.x + r * Math.sin(c) - w / 2;
                    y = p.y + r * Math.cos(c) - h / 2;
                    // ctx.rect(x, y, w, h);
                    var rect = new fabric.Rect({
                        width: w,
                        height: h,
                        left: x + 1,
                        top: y + 1,
                        originX: 'center',
                        originY: 'center',
                        fill: this.color,
                        opacity: 0.4,
                    });
                    this.rects.push(rect);
                }
            }
            // ctx.fill();
            // ctx.restore();
        }
    });

})(fabric);



(function (fabric) {

    fabric.Point.prototype.angleBetween = function (that) {
        return Math.atan2(this.x - that.x, this.y - that.y);
    };

    fabric.Point.prototype.normalize = function (thickness) {
        if (null === thickness || undefined === thickness) {
            thickness = 1;
        }

        var length = this.distanceFrom({ x: 0, y: 0 });

        if (length > 0) {
            this.x = this.x / length * thickness;
            this.y = this.y / length * thickness;
        }

        return this;
    };

})(fabric);



(function (fabric) {

    fabric.util.getRandom = function (max, min) {
        min = min ? min : 0;
        return Math.random() * ((max ? max : 1) - min) + min;
    };

    fabric.util.clamp = function (n, max, min) {
        if (typeof min !== 'number') min = 0;
        return n > max ? max : n < min ? min : n;
    };

})(fabric);
