/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Crafty = require('../core/core.js');

Crafty.c("Spritemap", {
    _currentIndex: null,
    _frames: [],
    _frameIndices: [],
    
    init: function() {
        this.requires("Sprite");
    },
    
    prepareFrames: function(data) {
        var frames = [];
        var frameIndices = [];
        
        if(typeof data.frames === "object") {
            for(var i = 0; i < data.frames.length; i++) {
                var entry = data.frames[i];
                
                var frame = {
                    name: entry.filename,

                    pos: {
                        x: entry.frame.x,
                        y: entry.frame.y,
                        w: entry.frame.w,
                        h: entry.frame.h
                    },
                    
                    trimmed: entry.trimmed
                };
                
                if(entry.trimmed === true) {
                    frame.spriteSourceSize = {
                        x: entry.spriteSourceSize.x,
                        y: entry.spriteSourceSize.y,
                        w: entry.spriteSourceSize.w,
                        h: entry.spriteSourceSize.h
                    }
                    
                    frame.sourceSize = {
                        w: entry.sourceSize.w,
                        h: entry.sourceSize.h
                    }
                }
                
                frames.push(frame);
                frameIndices[frame.name] = frames.length - 1;
            }
        }
        else {
            var fromX = 0,
                fromY = 0,
                rowLength = Math.floor(this.img.width / data.width);
            
            for(var i = 0; i < data.frameNumber; i++) {
                var frame = {
                    name: String(i),
                    trimmed: false,

                    pos: {
                        x: fromX * data.width,
                        y: fromY * data.height,
                        w: data.width,
                        h: data.height
                    }
                };
                
                frames.push(frame);
                frameIndices[frame.name] = frames.length - 1;
                
                fromX++;
                if(fromX >= rowLength) {
                    fromX = 0;
                    fromY++;
                }
            }
        }
        
        this._frames = frames;
        this._frameIndices = frameIndices;
        this._currentIndex = 0;
        
        return this;
    },
    
    setFrame: function(frame) {
        if(this._frames.length == 0)
            return;
            
        if(typeof frame === "string") {
            this._currentIndex = this.getFrameIndex(frame);
        }
        else if(typeof frame === "number") {
            this._currentIndex = frame;
        }
        else {
            console.log("Wrong argument");
        }
        
        var frame = this._frames[this._currentIndex];
        this.crop_(frame.pos.x, frame.pos.y, frame.pos.w, frame.pos.h);
        
        return this;
    },
    
    getFrameIndex: function(frameName) {
        return this._frameIndices[frameName];
    },
    
    getFrame: function(frameIndex) {
        return this._frames[frameIndex];
    },
    
    getFrames: function() {
        return this._frames;
    }
});
