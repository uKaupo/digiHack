var video = document.querySelector('video');


function captureCamera(callback) {
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
}
var recorder; // globally accessible
document.getElementById('btn-start-recording').onclick = function() {
    this.disabled = true;
    captureCamera(function(camera) {
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        recorder = RecordRTC(camera, {
            type: 'video'
        });
        recorder.startRecording();
        // release camera on stopRecording
        recorder.camera = camera;
    });
};

document.getElementById('salvestaNupp').onclick = function() {
    this.disabled = true;
    if (recorder) {
        recorder.stopRecording(stopRecordingCallback);
    }
    $('#salvestaModal').modal('hide');
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
        content: 'Tere! Sa ei ole üksi. Kas sa oled nõus, et võtame sinuga ühendust, et saaksime pakkuda igakülgset abi?'
    }).then(() => {
        return botUi.action.button({
            delay: 500,
            action: [{
                text: 'Jah, olen',
                value: 'jah'
            }, {
                text: 'Ei, aitäh',
                value: 'ei'
            }]
        })
    });

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
        content: "Olukorra hindamiseks küsime mõned küsimused, pärast mida suuname sind vajadusel edasi vestlema otse tugiisikuga. Vastates ära muretse - siin ei ole õigeid ja valesid vastuseid."
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
        content: "Kas vägivalda on juhtunud vähemalt 2 korda viimase aasta jooksul?"
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
        content: "Sul läheb väga hästi, ainult üks küsimus veel."
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
        content: 'Aitäh, et vastasid küsimustele! Sinu olukord tundub piisavalt tõsine - soovitame sul kindlasti rääkida otse tugiisikuga.'
    });


    await botUi.message.add({
        delay: 500,
        content: 'Saame sind nüüd otse ühendada. Kas soovid teha telefonikõne või jätkata siin kirjutades?'
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
        content: 'Tere! Mina olen Marianne, oled nüüd otse ühenduses ohvriabi tugiisikuga. Aitäh, et võtsid minuga ühendust. Lugesin läbi sinu vastused ja püüan nüüd sind edasi aidata.'
    });

    await botUi.message.add({
        delay: 500,
        content: 'Mis nimega ma võin sind kutsuda?'
    })

    await botUi.action.text({
        delay: 500,
        action: {
            value: 'Kristel'
        }
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
        content: 'Kristel, mul on väga kahju, et sinuga nii juhtus. Leiame kindlasti viisi kuidas sind aidata.'
    })

    await botUi.message.add({
        delay: 500,
        content: 'Kas sellest jäi sinu kehale jälgi?'
    })

    await botUi.action.text({
        delay: 500,
        action: {
            value: 'Jah, sinikad'
        }
    });

    await botUi.message.add({
        delay: 500,
        content: 'Sul on võimalus teha oma vigastusest pilt ja see turvaliselt meile saata. Seda saad teha vajutades "Salvesta juhtum" nupule.'
    });

};

let soovitus = async() => {
    await botUi.message.add({
        delay: 500,
        content: 'Annan sulle nüüd mõned sinu lähedal asuvad kontaktid, kust saad vajadusel kohe edasist abi.'
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