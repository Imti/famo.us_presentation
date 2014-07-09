define(function(require, exports, module) {
    var Engine     = require('famous/core/Engine');
    var Surface    = require('famous/core/Surface');
    var Modifier   = require('famous/core/Modifier');
    var Transform  = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var RenderController = require('famous/views/RenderController');

    var mainContext = Engine.createContext();
    var renderController = new RenderController();
    var slides = [];
    var counter = 0;

    var text = [
        "<br/><br/> Make a Presentation Using Famo.us",
        "<br/><br/> So I met Dave Fetterman today...",
        "<br/><br/> He thought it'd be a cool idea to <br/> create a powerpoint-esque presentation...",
        "<br/><br/> ...entirely in Famo.us",
        "<br/><br/> Each slide is a surface",
        "<br/><br/> And click events switch to a new surface",
        "<br/><br/> Animations can also be added",
        "<br/><br/> Like this",
        "<br/><br/> And this",
        "<br/><br/> And also this"
    ];

    var slideModifier = new Modifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    for(var i = 0; i < text.length; i++) {
        slides.push(new Surface({
            size: [undefined, undefined],
            content: text[i],
            classes: ['double-sided'],
            properties: {
                fontSize: '80px',
                lineHeight: '100px',
                textAlign: 'center'
            }
        }));
    }

    renderController.show(slides[0]);

    Engine.on('click', function() {
        var next = (counter++ +1) % slides.length;
        this.show(slides[next]);
    }.bind(renderController));

   
    mainContext.add(slideModifier).add(renderController);
});
