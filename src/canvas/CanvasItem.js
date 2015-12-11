/* jshint browserify: true */
/* globals DEBUG */
'use strict';

/**
 * @fileoverview Exports the {@link CanvasItem} class.
 * @author Jonathan Clare 
 * @copyright FlowingCharts 2015
 * @module canvas/CanvasItem 
 * @requires utils/util
 * @requires utils/color
 */

// Required modules.
var util      = require('../utils/util');
var colorUtil = require('../utils/color');

/** 
 * @classdesc Holds properties of canvas items.
 *
 * @class
 * @alias CanvasItem
 * @since 0.1.0
 * @constructor
 *
 * @param {string} type The shape type.
 */
function CanvasItem (type)
{
    // Public instance variables.

    /** 
     * The shape type.
     * 
     * @since 0.1.0
     * @type string
     */
    this.type = type; 

    /** 
     * The fill color.
     * 
     * @since 0.1.0
     * @type string
     * @default '#ffffff'
     */
    this.fillColor = '#ffffff'; 

    /** 
     * The fill color.
     * 
     * @since 0.1.0
     * @type number
     * @default 1
     */
    this.fillOpacity = 1;

    /** 
     * The fill color.
     * 
     * @since 0.1.0
     * @type string
     * @default '#000000'
     */
    this.lineColor = '#000000'; 

    /** 
     * The fill color.
     * 
     * @since 0.1.0
     * @type number
     * @default 1
     */ 
    this.lineWidth = 1; 

    /** 
     * The fill color.
     * 
     * @since 0.1.0
     * @type string
     * @default 'round'
     */
    this.lineJoin = 'round'; 

    /** 
     * The fill color.
     * 
     * @since 0.1.0
     * @type string
     * @default 'butt'
     */
    this.lineCap = 'butt'; 

    /** 
     * The fill color.
     * 
     * @since 0.1.0
     * @type number
     * @default 1
     */
    this.lineOpacity = 1;
}

/** 
 * Defines the style.
 *
 * @since 0.1.0
 * @param {Object} [options] The style properties.
 * @param {string} [options.fillColor] The fill color.
 * @param {number} [options.fillOpacity] The fill opacity. This is overriden by the fillColor if it contains an alpha value.
 * @param {string} [options.lineColor] The line color.
 * @param {number} [options.lineWidth] The line width.
 * @param {string} [options.lineJoin] The line join, one of "bevel", "round", "miter".
 * @param {string} [options.lineCap] The line cap, one of "butt", "round", "square".
 * @param {number} [options.lineOpacity] The line opacity. This is overriden by the lineColor if it contains an alpha value.
 * @return {CanvasItem} <code>this</code>.
 */
CanvasItem.prototype.style = function (options)
{
    if (options !== undefined) 
    {
        if (options.fillColor !== undefined)    this.fillColor   = options.fillColor;
        if (options.fillOpacity !== undefined)  this.fillOpacity = options.fillOpacity;
        if (options.lineColor !== undefined)    this.lineColor   = options.lineColor;
        if (options.lineWidth !== undefined)    this.lineWidth   = options.lineWidth;
        if (options.lineJoin !== undefined)     this.lineJoin    = options.lineJoin;
        if (options.lineCap !== undefined)      this.lineCap     = options.lineCap;
        if (options.lineOpacity !== undefined)  this.lineOpacity = options.lineOpacity;
    }
    return this;
};

module.exports = CanvasItem;