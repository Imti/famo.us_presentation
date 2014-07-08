define(function(require, exports, module) {
    var Engine     = require('famous/core/Engine');
    var Surface    = require('famous/core/Surface');
    var Modifier   = require('famous/core/Modifier');
    var Transform  = require('famous/core/Transform');
    var Quaternion = require('famous/math/Quaternion');
    var Draggable  = require("famous/modifiers/Draggable");
    // var MouseSync = require('famous/inputs/MouseSync');
    var ScrollSync = require('famous/inputs/ScrollSync');

    var mainContext = Engine.createContext();

    var quaternion = new Quaternion(1, 0, 0, 0);
    var smallQuaternion = new Quaternion(100, 0, 1, 0);
    var sync = new ScrollSync();
    console.log(smallQuaternion);

    // var draggable = new Draggable({
    //     xRange: [-1000, 1000],
    //     yRange: [-1000, 1000]
    // });

    // Modifier != StateModifier
    // Modifiers can move, StateModifiers can not
    var rotationModifier = new Modifier({
        origin: [0.5, 0.5]

    });

    var position = [0, 0];
    var quaternionToggle

    rotationModifier.setTransform(function() {
        return quaternion.getTransform();
    });

    Engine.on('prerender', function() {
        // console.log(smallQuaternion.w);
        smallQuaternion.w = smallQuaternion.w < 50 ? smallQuaternion.w+.05 : 100;
        quaternion = quaternion.multiply(smallQuaternion);
    });


    var square = new Surface({
        size: [300, 300],
        content: 'Hello Famo.us',
        classes: ['double-sided'],
        properties: {
            fontSize: '30px',
            lineHeight: '300px',
            textAlign: 'center',
        },
        transform: Transform.translate(position[0], position[1], 300/2)

    });
    square.pipe(sync);

    sync.on('update', function(data) {
        // console.log(data);
        position[0] += data.delta[0];
        position[1] += data.delta[1];
        smallQuaternion.w = position[0]/(position[0] + position[1]); 
        console.log(smallQuaternion.w);
        quaternion = quaternion.multiply(smallQuaternion);
    });

    // square.pipe(draggable);

    // square.on('mouseover', function() {
    //     console.log("test");
    //     var x = (Math.random() * 2) - 1;
    //     var y = (Math.random() * 2) - 1;
    //     var z = (Math.random() * 2) - 1;
    //     smallQuaternion = new Quaternion(100, x, y, z);
    // });

    mainContext.add(rotationModifier).add(sync).add(square);
});
