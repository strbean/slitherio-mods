// Tested in Chrome.
// Left stick to steer, X to accelerate

(function () {
    if (!("getGamepads" in navigator)) {
        return;
    }
    var pollPad = function() {
        var ps4 = navigator.getGamepads()[0];
        if (ps4) {
            var x = ps4.axes[0], y = ps4.axes[1];
    
            if (Math.sqrt(x*x+y*y) < 0.1) x = y = 0; // deadzone radius
            xm = 100 * x;
            ym = 100 * y;
    
            setAcceleration(ps4.buttons[0].value);
    
            var b = mc.getContext("2d");
            b.save();
            b.beginPath();
            b.strokeStyle = ps4.buttons[0].value ? "white" : "lightGreen";
            b.arc(xm + mc.width/2, ym+mc.height/2, 8, 0, Math.PI * 2);
            b.stroke();
            b.restore();
        }
        window.requestAnimationFrame(pollPad);
    };
    pollPad();
})();