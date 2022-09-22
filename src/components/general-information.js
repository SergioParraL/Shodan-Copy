class GeneralInformation extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
    }
    static get observedAttributes(){
        return ['hostnames','domains','country_name','city','org','isp','asn']
    }
    attributeChangedCallback(att,oldVal,newVal){
        if(att === 'hostnames'){
            this.hostnames = newVal
        }
        if(att === 'domains'){
            this.domains = newVal
        }
        if(att === 'country_name'){
            this.country_name = newVal
        }   
        if(att === 'city'){
            this.city = newVal
        }
        if(att === 'org'){
            this.org = newVal
        }
        if(att === 'isp'){
            this.isp = newVal
        }
        if( att == 'asn'){
            this.asn = newVal
        }
    }

    getResourses = () =>{
        return`
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="../styles/components.css">
        `
    }
    getTemplate(){
        const hNames = this.hostnames.split(',')
        const Domains = this.domains.split(',')
        const contentNode = document.createElement('template')
        contentNode.innerHTML = `
            <div class="boxContent generalInformation">
                <h5><ion-icon name="globe"></ion-icon>
                    <strong>General</strong> Information</h5>
                <table>
                    <tr class='hostnames'>
                        <th class="resultTitleResearch">Hostnames</th>
                    </tr>
                    <tr class='domains'>
                        <th class="resultTitleResearch">Domains</th>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">Country</th>
                        <td class="resultResearch">${this.country_name}</td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">City</th>
                        <td class="resultResearch">${this.city}</td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">Organization</th>
                        <td class="resultResearch">${this.org}</td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">OVH SAS</th>
                        <td class="resultResearch">${this.isp}</td>
                    </tr>
                    <tr class='asn'>
                        <th class='resultTitleResearch'>ASN</th>
                        <td class="resultResearch">${this.asn}</td>
                    </tr>
                </table>
            </div>
            ${this.getStylesTemplate()}
            ${this.getResourses()}
        `

        const divDomains  = contentNode.content.querySelector('.domains')
        const divHostnames = contentNode.content.querySelector('.hostnames')
        const divHola = contentNode.content.querySelector('.hola')

        if(this.domains != ''){
                hNames.forEach(element =>{
                const hostnamesTag = document.createElement('td')
                
                hostnamesTag.textContent = element
                hostnamesTag.classList.add('resultResearch')
    
                divHostnames.appendChild(hostnamesTag)
    
            })
        }else{
            divHostnames.parentNode.removeChild(divHostnames)
        }
        
        if(this.domains != ''){
            Domains.forEach(element => {
                const domainsTag = document.createElement('td')
    
                domainsTag.classList.add('resultResearch')
                domainsTag.innerHTML = `<a class="waves-effect green btn resultResearch">${element}</a>`
    
                divDomains.appendChild(domainsTag)
                
            });
        }else{
            divDomains.parentNode.removeChild(divDomains)
        }

        if (this.asn != '') {
            
        }


        return contentNode
    }
    getStylesTemplate(){
        return` 
            <style>
                .generalInformation{
                    border-top: 3px solid #F2A20E;
                }
                .resultTitleResearch{
                    color: #5B5B5B;
                }
                
            </style>
        `
    }

    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode('true'))
    }
    connectedCallback(){
        this.render()
    }
}

customElements.define('general-information', GeneralInformation)