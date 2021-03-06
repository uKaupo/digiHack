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
    video.muted = true;
    video.volume = 0;
    video.src = URL.createObjectURL(recorder.getBlob());
    video.pause();

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
    setTimeout(() => {
        $('#salvestaModal').modal('hide');
    }, 1000);
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
                value: 'jah',
                cssClass: 'answer-bg-orange'
            }, {
                text: 'Ei, aitäh',
                value: 'ei',
                cssClass: 'answer-bg-orange'
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
                value: 'iseendale',
                cssClass: 'answer-bg-orange'
            }, {
                text: 'Kellelegi teisele',
                value: 'teisele',
                cssClass: 'answer-bg-orange'
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
                value: 'jah',
                cssClass: 'answer-bg-orange'
            }, {
                text: 'Ei',
                value: 'ei',
                cssClass: 'answer-bg-orange'
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
                value: 'jah',
                cssClass: 'answer-bg-orange'
            }, {
                text: 'Ei',
                value: 'ei',
                cssClass: 'answer-bg-orange'
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
                value: 'jah',
                cssClass: 'answer-bg-orange'
            }, {
                text: 'Ei',
                value: 'ei',
                cssClass: 'answer-bg-orange'
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
                "text": "Soovin helistada",
                "cssClass": 'answer-bg-orange'
            }, {
                "value": "kirjutada",
                "text": "Soovin kirjutada",
                "cssClass": 'answer-bg-orange'
            }, {
                "value": "ei",
                "text": "Soovin lugeda",
                "cssClass": 'answer-bg-orange'
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
        content: 'Tere! Mina olen Marianne, oled nüüd otse ühenduses ohvriabi tugiisikuga. Aitäh, et võtsid minuga ühendust. Lugesin läbi sinu vastused ja püüan nüüd sind edasi aidata.',
        cssClass: 'light-blue-bg'
    });

    await botUi.message.add({
        delay: 500,
        content: 'Mis nimega ma võin sind kutsuda?',
        cssClass: 'light-blue-bg'

    })

    await botUi.action.text({
        delay: 500,
        action: {
            value: 'Kristel'
        }
    });

    await botUi.message.add({
        delay: 500,
        content: 'Milles sinu mure seisneb?',
        cssClass: 'light-blue-bg'
    })

    await botUi.action.text({
        delay: 500,
        action: {
            value: 'Mees lõi mind eile õhtul'
        }
    });

    await botUi.message.add({
        delay: 500,
        content: 'Kristel, mul on väga kahju, et sinuga nii juhtus. Leiame kindlasti viisi kuidas sind aidata.',
        cssClass: 'light-blue-bg'
    })

    await botUi.message.add({
        delay: 500,
        content: 'Kas sellest jäi sinu kehale jälgi?',
        cssClass: 'light-blue-bg'
    })

    await botUi.action.text({
        delay: 500,
        action: {
            value: 'Jah, sinikad'
        }
    });

    await botUi.message.add({
        delay: 500,
        content: 'Sul on võimalus teha oma vigastusest pilt ja see turvaliselt meile saata. Seda saad teha vajutades "Salvesta juhtum" nupule.',
        cssClass: 'light-blue-bg'
    });

};

let soovitus = async() => {
    await botUi.message.add({
        delay: 500,
        content: 'Annan sulle nüüd mõned sinu lähedal asuvad kontaktid, kust saad vajadusel kohe edasist abi.',
        cssClass: 'light-blue-bg'
    });

    await botUi.message.add({
        delay: 500,
        cssClass: 'light-blue-bg',
        content: '<div class="info-heading2">Turvalise öömaja saad täna siit:</div>' +
            '<div class="info-heading3">Põltsamaa naiste turvakodu</div>' +
            '<div class="info-contact"><img src="./icons/phone.svg" width="12" height="12" class="margin-right-3" />123 456</div>' +
            '<div class="info-contact"><img src="./icons/mail.svg" width="12" height="12" class="margin-right-3" />poltsamaaturvakodu@gmail.com</div>' +
            '<div class="info-normal">Turvakodusse saad kaasa võtta ka oma lapsed.</div><br>' +
            '<div class="info-heading2">Hingeabi ja psüholoogilist nõustamist saad siit:</div>' +
            '<div class="info-heading3">Psühholoog Mart Maasikas</div>' +
            '<div class="info-contact"><img src="./icons/phone.svg" width="12" height="12" class="margin-right-3" />123 456 </div>' +
            '<div class="info-contact"><img src="./icons/mail.svg" width="12" height="12" class="margin-right-3" />poltsamaaturvakodu@gmail.com</div><br>' +
            '<div class="info-heading2">Juriidilist abi saad siit:</div>' +
            '<div class="info-heading3">Perevägivalla jurist Mari Vaarikas</div>' +
            '<div class="info-contact"><img src="./icons/phone.svg" width="12" height="12" class="margin-right-3" />123 456</div>' +
            '<div class="info-contact"><img src="./icons/mail.svg" width="12" height="12" class="margin-right-3" />poltsamaaturvakodu@gmail.com</div>'
    });
};

let koguSuhtlus = async() => {
    await botSuhtlus();

    // vaheta päist

    await inimSuhtlus();

    // tee pilt

    await soovitus();
}

koguSuhtlus();