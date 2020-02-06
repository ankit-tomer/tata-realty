var y = 0;
var z = 0;

var getPermission = new Promise(function (resolve, reject) {
    // do a thing, possibly async, then…
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', (e) => {
                        y = Math.round(e.beta);
                        z = Math.round(e.gamma);
                        //alert(Math.round(e.alpha) + ':' + Math.round(e.beta) +':'+ Math.round(e.gamma));
                        // document.getElementById("x").innerHTML = Math.round(e.alpha);
                        // document.getElementById("y").innerHTML = Math.round(e.beta);
                        // document.getElementById("z").innerHTML = Math.round(e.gamma);
                        resolve({y: y, z: z});
                    });
                }
                else {
                    reject(Error("Need permissions!"));
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', (e) => {
            y = Math.round(e.beta);
            z = Math.round(e.gamma);
            resolve({y: y, z: z});
            //alert(Math.round(e.alpha) + ':' + Math.round(e.beta) +':'+ Math.round(e.gamma));
            // document.getElementById("x").innerHTML = Math.round(e.alpha);
            // document.getElementById("y").innerHTML = Math.round(e.beta);
            // document.getElementById("z").innerHTML = Math.round(e.gamma);
        });
    }

    // if (/* everything turned out fine */) {
    //     resolve("Stuff worked!");
    // }
    // else {
    //     reject(Error("It broke"));
    // }
});

// function getPermission() {
//     if (typeof DeviceOrientationEvent.requestPermission === 'function') {
//         DeviceOrientationEvent.requestPermission()
//             .then(permissionState => {
//                 if (permissionState === 'granted') {
//                     window.addEventListener('deviceorientation', (e) => {
//                         y = Math.round(e.beta);
//                         z = Math.round(e.gamma);
//                         //alert(Math.round(e.alpha) + ':' + Math.round(e.beta) +':'+ Math.round(e.gamma));
//                         // document.getElementById("x").innerHTML = Math.round(e.alpha);
//                         // document.getElementById("y").innerHTML = Math.round(e.beta);
//                         // document.getElementById("z").innerHTML = Math.round(e.gamma);
//                     });
//                 }
//             })
//             .catch(console.error);
//     } else {
//         window.addEventListener('deviceorientation', (e) => {
//             y = Math.round(e.beta);
//             z = Math.round(e.gamma);
//             //alert(Math.round(e.alpha) + ':' + Math.round(e.beta) +':'+ Math.round(e.gamma));
//             // document.getElementById("x").innerHTML = Math.round(e.alpha);
//             // document.getElementById("y").innerHTML = Math.round(e.beta);
//             // document.getElementById("z").innerHTML = Math.round(e.gamma);
//         });
//     }
// }


(function hello() {
    //alert('Hello!!!');
})()