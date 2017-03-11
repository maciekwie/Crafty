/* 
 */

var Crafty = require('../core/core.js');

Crafty.Utilities = {
    /**
     * 
     * @param {number} number
     * @param {number} length
     * @returns {String}
     */
    zeroPad: function(number, length)
    {
        number = String(number);
        
        while(number.length < length)
           number = "0" + number;
        
        return number;
    },
    
    /**
     * 
     * @param {string} prefix
     * @param {number} start
     * @param {number} stop
     * @param {string} suffix
     * @param {number} zeroPad
     * @returns {Array|nm$_shim-array.exports}
     */
    generateFrameNames: function(prefix, start, stop, suffix, zeroPad) {
        if(suffix === undefined)
            suffix = "";
        
        if(zeroPad === undefined)
            zeroPad = 0;
        
        var names = [];
        
        for(var i = start; i < stop; i++) {
            
            var str = prefix + Crafty.Utilities.zeroPad(i+1, zeroPad) + suffix;
            
            names.push(str);
        }
        
        return names;
    }
};