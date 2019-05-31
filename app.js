var video = document.querySelector('video');
// toggleHideElementById("video");
toggleHideElementById("btn-stop-recording");

function captureCamera(callback) {
    // toggleHideElementById("video");
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());

    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
    toggleHideElementById("btn-stop-recording");
}
var recorder; // globally accessible
document.getElementById('btn-start-recording').onclick = function() {
    this.disabled = true;
    captureCamera(function(camera) {
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        recorder = RecordRTC(camera, {
            type: 'video',
            canvas: {
                width: 400,
                height: 240
            }
        });
        recorder.startRecording();
        // release camera on stopRecording
        recorder.camera = camera;
    });
    toggleHideElementById("btn-stop-recording");
};

document.getElementById('btn-stop-recording').onclick = function() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
};

function toggleHideElementById(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

var botUi = new BotUI('qa-app');


let botSuhtlus = async() => {

    await botUi.message.add({
        content: 'Tere! mina olen ohvriabi robot ja olen siin selleks, et aidata sul sinu probleemist aru saada ja sind õigete sammudeni suunata!'
    })

    // wait till its shown
    await botUi.message.add({ // show next message
        delay: 500,
        content: 'Kas otsid nõu iseendale või kellelelgi teisele?'
    }).then(() => {
        return botUi.action.button({
            delay: 500,
            action: [{
                text: 'Iseendale',
                value: 'iseendale'
            }, {
                text: 'Kellelegi teisele',
                value: 'teisele'
            }]
        })
    });


    await botUi.message.add({
        delay: 500,
        content: "Olukorra selgitamiseks küsime sinult mõned küsimused."
    });

    await botUi.message.add({
        delay: 500,
        content: "Kas Sinu partner on teinud kunagi sulle, sinu lastele või koduloomadele haiget?"
    }).then(() => {
        return botUi.action.button({
            delay: 100,
            action: [{
                text: 'Jah',
                value: 'jah'
            }, {
                text: 'Ei',
                value: 'ei'
            }]
        })
    });



    await botUi.message.add({
        delay: 500,
        content: "Kas vägivalda on juhtunud üle 2 korra viimase aasta jooksul?"
    }).then(function() {
        return botUi.action.button({
            delay: 100,
            action: [{
                text: 'Jah',
                value: 'jah'
            }, {
                text: 'Ei',
                value: 'ei'
            }]
        })
    });


    await botUi.message.add({
        delay: 500,
        content: "Kas sinu partner kuritarvitab alkoholi või narkootikume?"
    }).then(function() {
        return botUi.action.button({
            delay: 100,
            action: [{
                text: 'Jah',
                value: 'jah'
            }, {
                text: 'Ei',
                value: 'ei'
            }]
        })
    })

    await botUi.message.add({
        delay: 500,
        content: 'Sinu vastuste põhjal soovitame sul rääkida kriisiabitöötajaga.'
    });


    await botUi.message.add({
        delay: 500,
        content: 'Kas soovid teha telefonikõne või jätkata siin sõnumitega?'
    }).then(function() {
        return botUi.action.button({
            delay: 100,
            action: [{
                "value": "helistada",
                "text": "Soovin helistada"
            }, {
                "value": "kirjutada",
                "text": "Soovin kirjutada"
            }, {
                "value": "ei",
                "text": "Soovin lugeda"
            }]
        })
    });

    // nupp tuleb nähtavale
    var elem = document.getElementById("salvesta");
    elem.classList.remove("display-none");
};

let inimSuhtlus = async() => {
    await botUi.message.add({
        delay: 500,
        content: 'Tere! Mina olen Marianne, oled nüüd otse ühenduses ohvriabi tugiisikuga. Lugesin läbi sinu vastused ja püüan nüüd sind edasi aidata.'
    });

    await botUi.message.add({
        delay: 500,
        content: 'Milles sinu mure seisneb?'
    })

    await botUi.action.text({
        delay: 500,
        action: {
            value: 'Mees lõi mind eile õhtul'
        }
    });

    await botUi.message.add({
        delay: 500,
        content: 'Kas sellest on jälgi näha?'
    })

    await botUi.action.text({
        delay: 500,
        action: {
            value: 'Jah, sinikad'
        }
    });

    await botUi.message.add({
        delay: 500,
        content: 'Palun saada oma vigastusest pilt. Seda saad teha vajutades Salvesta juhtum nupule.'
    });

};

let soovitus = async() => {
    await botUi.message.add({
        delay: 500,
        content: 'Siit saad vaadata su lähedal asuvaid võimalusi, kust sa saad abi.'
    });

    var elem = document.getElementById("kriisi-info");
    elem.classList.remove("display-none");
};

let koguSuhtlus = async() => {
    await botSuhtlus();

    // vaheta päist

    await inimSuhtlus();

    // tee pilt

    await soovitus();
}

koguSuhtlus();