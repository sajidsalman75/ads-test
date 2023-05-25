let content = `
<div id="popup" class="modal-content" style="display: block;">
   <div class="model-hdr flex flex-col aic jc">
      <div class="close-icon"> <span class="close">×</span> </div>
      <div class="alert-icon flex aic jc">
         <!-- <svg fill="#d52f23" height="130px" width="130px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310.806 310.806" xml:space="preserve" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#d52f23">
         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
         <g id="SVGRepo_iconCarrier">
            <path d="M305.095,229.104L186.055,42.579c-6.713-10.52-18.172-16.801-30.652-16.801c-12.481,0-23.94,6.281-30.651,16.801 L5.711,229.103c-7.145,11.197-7.619,25.39-1.233,37.042c6.386,11.647,18.604,18.883,31.886,18.883h238.079 c13.282,0,25.5-7.235,31.888-18.886C312.714,254.493,312.24,240.301,305.095,229.104z M155.403,253.631 c-10.947,0-19.82-8.874-19.82-19.82c0-10.947,8.874-19.821,19.82-19.821c10.947,0,19.82,8.874,19.82,19.821 C175.223,244.757,166.349,253.631,155.403,253.631z M182.875,115.9l-9.762,65.727c-1.437,9.675-10.445,16.353-20.119,14.916 c-7.816-1.161-13.676-7.289-14.881-14.692l-10.601-65.597c-2.468-15.273,7.912-29.655,23.185-32.123 c15.273-2.468,29.655,7.912,32.123,23.185C183.284,110.192,183.268,113.161,182.875,115.9z"></path>
         </g>
      </svg> -->
         <h3>WARNING!</h3>
         <img src="1000_F_140443125_g86gmd3tdCjDm5zNtEDNOyB4KyzqXe23.png" width="120" height="120">
      </div>
   </div>
   <div class="model-body flex flex-col">
      <h1 class="model-title">YOUR IP AND LOCATION ARE EXPOSED!</h1>
      <div class="flex flex-col aic jc">
         <div class="ip-box hide" id="ip-address">163.53.179.97</div>
         <div class="ip-box address"><img src="ip-address.png" width="20" height="20"> Your IP: <span
               id="ipAddress"></span></div>
         <div class="ip-box address"><img src="germany.png" width="20" height="20"> Your Location: <span
               id="userLocation"></span></div>
         <div class="ip-box address"><img src="isp.png" width="20" height="20"> Your ISP: <span id="isp"></span>
         </div>
         <div class="ip-box address"><img src="earth-globe.png" width="20" height="20"> COUNTRY: <span
               id="country">
            </span></div>
         <div class="ip-box address"><img src="germany.png" width="20" height="20"> ZIP CODE: <span
               id="postal-code">
            </span></div>
      </div>
      <h1 class="model-desc">PROTECT YOURSELF WHILE STREAMING, ALWAYS.</h1>
      <div class="action flex aic jc">
         <button class="hide-button flex aic jc" onclick="hideNow()">
            <div class="btn-icon">
               <svg width="20" height="20" fill="none" stroke="#ffffff" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94">
                  </path>
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"></path>
                  <path d="m1 1 22 22"></path>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
               </svg>
            </div>
            <div class="button">
               HIDE NOW
            </div>
         </button>
         <!-- <a href="https://vpnguider.com/go/surfshark"> </a> -->
      </div>
   </div>
</div>`

let timeSinceEpoch = Date.now();
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './ads.css';
    link.media = 'all';
    link.onload = function () {
        if (localStorage.getItem('lastTime') === null) {
            localStorage.setItem('lastTime', timeSinceEpoch);
            document.getElementById('myModal').insertAdjacentHTML('afterbegin', content);
            getIpInformation();
        }
        else {
            const previousTime = localStorage.getItem('lastTime');
            console.log(timeSinceEpoch, previousTime)
            if (timeSinceEpoch - parseInt(previousTime) > 43200000) {
                document.getElementById('myModal').insertAdjacentHTML('afterbegin', content);
                getIpInformation();
                localStorage.setItem('lastTime', timeSinceEpoch);
            }
        }
    }
    head.appendChild(link);
}

function getIpInformation() {
    fetch('https://api.seeip.org/jsonip')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipAddress').textContent = data.ip
            fetch(`https://api.seeip.org/geoip/${data.ip}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('isp').textContent = data.organization
                    document.getElementById('country').textContent = data.country
                    document.getElementById('postal-code').textContent = data.postal_code
                    document.getElementById('userLocation').textContent = `${data.city}, ${data.region}, ${data.country} `
                })
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
}





let count = 0;
if (localStorage.getItem('count') === null) {
    localStorage.setItem('count', 0);
}
else {
    count = localStorage.getItem('count')
}

function hideNow() {
    if (count % 2 == 0) {
        count++;
        localStorage.setItem('count', count);
        window.open("https://vpnguider.com/go/expressvpn");
    }
    else {
        count--;
        localStorage.setItem('count', count);
        window.open("https://vpnguider.com/go/surfshark");
    }
}