define(function(require, exports, module) {
    var Engine     = require('famous/core/Engine');
    var Surface    = require('famous/core/Surface');
    var Modifier   = require('famous/core/Modifier');
    var Transform  = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var RenderNode = require('famous/core/RenderNode');

    var mainContext = Engine.createContext();

    var modifier = new Modifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        size: [window.innerWidth, window.innerHeight]
    });

    var slide = new Surface({
        size: [undefined, undefined],
        content: "Make a Presentation Using Famo.us",
        classes: ['double-sided'],
        properties: {
            fontSize: window.innerWidth/15 + 'px',
            lineHeight: window.innerWidth/10 + 'px',
            textAlign: 'center'
        },
    });
    var logo = new ImageSurface({
        size: [200, 200],
        content: 'http://code.famo.us/assets/famous_logo.svg',
        classes: ['double-sided']
    });

    var text = [
        "Each slide is a surface",
        "Set new content on <br/> Engine click event",
        "And it's not just text!",
        "",
    ];

    var next = 0;

    Engine.on('click', function() {
        slide.setContent(slide.getContent() + '<br/>' + text[next]);
        next++;
    })

    mainContext.add(modifier).add(slide);
});
