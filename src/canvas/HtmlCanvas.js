/* jshint browserify: true */
/* globals DEBUG */
'use strict';

/**
 * @fileoverview Exports the {@link HtmlCanvas} class.
 * @author Jonathan Clare 
 * @copyright FlowingCharts 2015
 * @module canvas/HtmlCanvas 
 * @requires canvas/Canvas
 * @requires utils/util
 * @requires utils/dom
 * @requires utils/color
 */

// Required modules.
var Canvas          = require('./Canvas');
var util            = require('../utils/util');
var extendClass     = util.extendClass;
var dom             = require('../utils/dom');
var createElement   = dom.createElement;
var color           = require('../utils/color');
var toRGBA          = color.toRGBA;
var isRGBA          = color.isRGBA;

/** 
 * @classdesc A wrapper class for rendering to a HTML5 canvas.
 *
 * @class
 * @alias HtmlCanvas
 * @augments Canvas
 * @since 0.1.0
 * @author J Clare
 *
 * @param {CartesianCoords|PolarCoords} coords The coordinate system to use when drawing. 
 */
function HtmlCanvas (coords)
{
    HtmlCanvas.baseConstructor.call(this, coords);
}
extendClass(Canvas, HtmlCanvas);

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.init = function()
{
    // Public instance members.  
    this.graphicsElement = createElement('canvas',     // The drawing canvas.
    {
        style :
        {
            position    : 'absolute',
            left        : 0,
            right       : 0 
        }
    });
    this.ctx = this.graphicsElement.getContext('2d');  // The drawing context.
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.isSupported = function ()
{
    return !!document.createElement('canvas').getContext;
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.clear = function ()
{
    this.items = [];
    this.ctx.clearRect(0, 0, this.graphicsElement.width, this.graphicsElement.height);
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawFill = function (item)
{
    var rgbaColor = item.fillColor();
    if (isRGBA(rgbaColor) === false) rgbaColor = toRGBA(item.fillColor(), item.fillOpacity());

    this.ctx.fillStyle = rgbaColor;     
    this.ctx.fill();
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawStroke = function (item)
{
    if (item.lineWidth() > 0)
    {
        var rgbaColor = item.lineColor();
        if (isRGBA(rgbaColor) === false) rgbaColor = toRGBA(item.lineColor(), item.lineOpacity());

        this.ctx.strokeStyle = rgbaColor;
        this.ctx.lineWidth   = item.lineWidth();
        this.ctx.lineJoin    = item.lineJoin();
        this.ctx.lineCap     = item.lineCap();
        this.ctx.stroke();
    }
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawCircle = function (item, cx, cy, r)
{
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawEllipse = function (item, cx, cy, rx, ry)
{
    var kappa = 0.5522848,
    x = cx - rx, 
    y = cy - ry, 
    w = rx * 2, 
    h = ry * 2,
    ox = (w / 2) * kappa, // Control point offset horizontal.
    oy = (h / 2) * kappa, // Control point offset vertical.
    xe = x + w,           // x-end.
    ye = y + h,           // y-end.
    xm = x + w / 2,       // x-middle.
    ym = y + h / 2;       // y-middle.

    this.ctx.beginPath();
    this.ctx.moveTo(x, ym);
    this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawRect = function (item, x, y, w, h)
{
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawLine = function (item, x1, y1, x2, y2)
{
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawPolyline = function (item, arrCoords)
{
    this.ctx.beginPath();
    var n = arrCoords.length;
    for (var i = 0; i < n; i+=2)
    {
        var x = arrCoords[i];
        var y = arrCoords[i+1];
        if (i === 0) this.ctx.moveTo(x, y);
        else         this.ctx.lineTo(x, y);
    }
};

/** 
 * @inheritdoc
 */
HtmlCanvas.prototype.drawPolygon = function (item, arrCoords)
{
    this.drawPolyline(arrCoords);
    this.ctx.closePath();
};

module.exports = HtmlCanvas;