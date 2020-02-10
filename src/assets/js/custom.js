var objData = {y:0, z:0, status:''}

function getPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', (e) => {
                        objData.y = Math.round(e.beta);
                        objData.z = Math.round(e.gamma);
                        objData.status = 'success';
                    });
                }
                else {
                    objData.status = 'error';
                }
            })
            .catch(error => {
                objData.status = 'error';
            });
    } else {
        window.addEventListener('deviceorientation', (e) => {
            objData.y = Math.round(e.beta);
            objData.z = Math.round(e.gamma);
            objData.status = 'success';
        });
    }
    return objData;    
}

function getData() {
    return objData;
}