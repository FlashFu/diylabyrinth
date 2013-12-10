var canvas, stage, shape, circle;

var gravity = "none",
    vx,vy;



function init(){
    vx = 0;
    vy = 0;
    var cj = createjs;
    canvas = document.getElementById("game");                
    
    //Create a stage by getting a reference to the canvas
    stage = new cj.Stage(canvas);

    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    stage.addChild(circle);
    circle.x = 400;
    circle.y = 300;
    stage.update();
    
    //################### device orientation code
    if(window.DeviceOrientationEvent){
        var gravDirectionOutput = document.createElement('div');
        trace.appendChild(gravDirectionOutput);
        trace.innerHTML += "<p>Device Orientation</p>";
        
        window.addEventListener("deviceorientation", function(e){
            trace.innerHTML = "<h1>alpha: " + e.alpha + "<br>beta: " + e.beta + "<br>gamma: " + e.gamma + "</h1>";
            if(e.beta < 0){
                if(e.gamma < 0){
                    gravity = "upper left";
                } else {
                    gravity = "upper right";
                }
            } else {
                if (e.gamma < 0) {
                    gravity = "lower left";
                } else {
                    gravity = "lower right";
                }
            }
            
            vx = e.gamma;
            vy = e.beta;
            
            gravDirectionOutput.innerHTML = gravity;
        });
    }
    // ###################  end DeviceOrientationEvent check

    cj.Ticker.addEventListener("tick",tick);
    cj.Ticker.setFPS(60);
    
    
    var controller = document.getElementById("controller");
    var thumb = document.getElementById("thumb");
    thumb.addEventListener("move", onThumbMove, false);
    
    controller.addEventListener("dblclick", doubleClickHandler, false);
    function doubleClickHandler(e){
        var cEvent = new Event("change");
        alpha.value = 0;
        alpha.dispatchEvent(cEvent);
        beta.value = 0;
        beta.dispatchEvent(cEvent);
        gamma.value = 0;
        gamma.dispatchEvent(cEvent);
    }
    
    var alpha = document.getElementById("alpha");
    alpha.addEventListener("change", onChange, false);
    var beta = document.getElementById("beta");
    beta.addEventListener("change", onChange, false);
    var gamma = document.getElementById("gamma");
    gamma.addEventListener("change", onChange, false);
}

function onThumbMove(e){
    var offsetX = (parseFloat(e.left) - 100) * .1;
    var offsetY = (parseFloat(e.top) - 100) * .1;
    
    vx = offsetX;
    vy = offsetY;
    console.log("left : " + vx + " top : " + vy);

    var cEvent = new Event("change");
    beta.value = vx;
    beta.dispatchEvent(cEvent);
    gamma.value = vy;
    gamma.dispatchEvent(cEvent);

};

function onChange(e){
    switch(e.target.id){
        case "alpha":
            alphaOut.value = alpha.value;
            circle.graphics.beginFill = "blue";
        break;
            
        case "beta":
            betaOut.value = beta.value;
            vx = parseFloat(beta.value);
            console.log("vx: " + vx);
        break;
            
        case "gamma":
            gammaOut.value = gamma.value;
            vy = parseFloat(gamma.value);
            console.log("vy: " + vy);
        break;
    }
}

function tick(){
    if(circle.x > canvas.width){
        circle.x = canvas.width;
        vx = -vx;
    }
    circle.x += vx;
    circle.y += vy;
    stage.update();
}

window.addEventListener('load',init);