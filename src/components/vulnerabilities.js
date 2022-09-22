class Vulnerabilities extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
    }

    static get observedAttributes(){
        return ['vulns']
    }

    attributeChangedCallback(att,oldVal,newVal){
        if(att === 'vulns'){
            this.vulns = newVal
            
        }
    }
    lol(){
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
        const vulnsData = this.vulns.split(',')
        const vulnerabilities = document.createElement('template')
        
        vulnerabilities.innerHTML = `
        ${this.getStyles()}
            <div class="row background">
                <div class="boxContent vulnerabilities">
                    <h5><ion-icon name="warning-outline"></ion-icon>Vulnerabilities</h5>
                    
                </div>
            </div>
            ${this.getResourses()}
        `
        
        let div = vulnerabilities.content.querySelector('.vulnerabilities')
        vulnsData.forEach(element => {
            const tag = document.createElement('div')
            tag.classList.add('vulnsPartRepeat')
            tag.innerHTML =`
                <div class="col s3 titleVulnerabilities">
                    <h6>${element}</h6>
                </div>
                <div class="col s9 vulnerabilitiesText">
                The BN_mod_sqrt() function, which computes a modular square root, contains a bug that can cause it to loop forever for non-prime moduli. Internally this function is
                </div>
                `
            div.appendChild(tag)        
        });
        
        return vulnerabilities
    }
    getStyles(){
        return `
            <style>
                h5,.vulnerabilitiesText{
                    font-weight: 200;
                }
                .vulnerabilitiesText{
                    color: #5B5B5B;
                }
                .vulnerabilities{
                    border-top: 3px solid red;
                }
                .background{
                    background-color : #1E1E1E;
                    margin-bottom: 0;
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

customElements.define('vulnerabilities-template', Vulnerabilities)