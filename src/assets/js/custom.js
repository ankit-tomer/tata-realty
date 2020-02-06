function getPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', (e) => {
                        // document.getElementById("x").innerHTML = Math.round(e.alpha);
                        // document.getElementById("y").innerHTML = Math.round(e.beta);
                        // document.getElementById("z").innerHTML = Math.round(e.gamma);
                    });
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', (e) => {
            // document.getElementById("x").innerHTML = Math.round(e.alpha);
            // document.getElementById("y").innerHTML = Math.round(e.beta);
            // document.getElementById("z").innerHTML = Math.round(e.gamma);
        });
    }
}

$(function() {
    alert('Hello, custom js');
});