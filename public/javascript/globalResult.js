document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3001/javascript/response.txt')
    .then(response =>   response.json())
    .then(data => {
        console.log(data)
        buildData(data);
        resumenResult(data);
        searchObject(data, ['ip_str','port','org']);
    })
    .catch(error => console.error(error))
});

function resumenResult (response){
    // console.log(response);
    
    const section = document.querySelector('.resumeResult');
    const text = document.createElement('section');

    text.innerHTML = `
        <div>
            <h6>TOTAL RESULTS</h6>
            <h4>550</h4>
        </div>
        <div class="countries">
            <h6>
                TOP COUNTRIES
            </h6>
            <ul>
                <li class="slotResult">
                    <a href="#">Unite State</a>
                    <span class="num-Data">4</span>
                </li>
            </ul>
        </div>
        <div class="ports">
            <h6>PORTS</h6>
            <ul>
                <li class="slotResult">
                    <a href="#">161</a>
                    <span class="num-Data">313</span>
                </li>
            </ul>
        </div>
        <div class="organization">
            <h6>
                TOP ORGANIZATIONS
            </h6> 
            <ul>
                <li class="slotResult">
                    <a href="#">Corporacion Matrix TV, C.A. (Airtek)</a>
                    <span class="num-Data">128</span>
                </li>
            </ul>
        </div>
        <div class="products">
            <h6>TOP PRODUCTS</h6>
            <ul>
                <li class="slotResult">
                    <a href="#">MikroTik</a>
                    <span class="num-Data">309</span>
                </li>
            </ul>
        </div>`;

    section.appendChild(text);
};

function searchObject(obj, searchTerms) {
    for (let key in obj) {
      let value = obj[key];
      if (typeof value === 'object') {
        searchObject(value, searchTerms);
      } else {
        if (searchTerms.includes(key)) {
          console.log(`Se encontró la clave "${key}" con valor "${value}"`);
        }
      }
    }
  }
  
  

function buildData (response) {
    const arr = response.matches;
    const section = document.querySelector('.response-Data');
    const q = document.createElement('section');
    for(let i = 0; i < 2; i++){
        const {ip,isp,location : {country_name,city}, timestamp,data} = arr[i];
        const dataText = document.createElement('section');
        dataText.classList.add('data');
        dataText.innerHTML = `
                <article>
                    <div class="ip">
                        <a href="#">${ip}</a> <!--Hace una busqueda con la IP -->
                    </div>
                    <div class="timeStamp">${timestamp}</div>
                </article>
    
                <article>
                    <div>
                        <ul>
                            <li class="isp">
                                <a href="#">${isp}</a>
                            </li>
                            <li class="address">
                                <span class="flag">🇻🇪</span>
                                <a href="#"><span class="country">${country_name}</span></a>, 
                                <a href="#"><span class="city">${city}</span></a>
                            </li>
                        </ul>
                    </div><!-- Hace una busqueda con el Pais o la ciudad-->
                    <div class="dataObject">
                        <pre>${data}</pre>
                    </div>
                </article>`
        section.appendChild(dataText);
    };
};