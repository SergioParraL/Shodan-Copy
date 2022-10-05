class Header extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
    }

    static get observedAttributes(){
        return ['ip_str','longitude','latitude']
    }

    attributeChangedCallback(att,oldVal,newVal){
        if (att === 'ip_str'){
            this.ip_str = newVal
        }
        if(att == 'latitude'){
            this.latitude = newVal
        }
        if (att == 'longitude') {
            this.longitude = newVal
        }
    }

    getResourses(){
        return`
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        `
    }
    getStylesHeader() {
        return`
            <style>
                .header{
                    padding-top: 1rem;
                    height: 15rem;
                }
                .mapLocation{
                    width: 100%;
                    height: 15rem;
                    position: relative;
                    z-index: 1;
                }
                .ip{
                    width: 13%;
                    position: relative;
                    bottom: 69%;
                    background-color: white;
                    height: 4rem;
                    z-index: 10;
                }
                .ip{
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                }
                iframe{
                    border: none;
                }
            </style>
        `
    }
    getHeaderTemplate(){ 
        const header = document.createElement('template')
        header.innerHTML = `
            <section class="header">
            <iframe width="100%" height="250" src="https://api.maptiler.com/maps/hybrid/?key=Yzumo1aUQzbA1gTZxvgC#9.9/${this.latitude}/${this.longitude}"></iframe>
                <article class=" ip">
                    <div>
                        <h4>${this.ip_str}</h4>
                    </div>
                </article>
            </section>
            ${this.getStylesHeader()}
            ${this.getResourses()}
            `
        return header
    }
    render(){
        this.shadowRoot.appendChild(this.getHeaderTemplate().content.cloneNode('true'))
    }

    connectedCallback() {
        this.render()
    }
}

customElements.define('header-template', Header)