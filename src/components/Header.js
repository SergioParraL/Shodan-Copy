class Header extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
    }

    static get observedAttributes(){
        return ['ip_str']
    }

    attributeChangedCallback(att,oldVal,newVal){
        if (att === 'ip_str'){
            this.ip_str = newVal
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
            </style>
        `
    }
    getHeaderTemplate(){ 
        const header = document.createElement('template')
        header.innerHTML = `
            <section class="header">
                <iframe class="mapLocation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4095.9335247722556!2d-115.17499456784228!3d36.117135174372244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c43c44cae095%3A0x77c9c8f2a2af3ff7!2sCaesars%20Palace!5e1!3m2!1ses!2sus!4v1661286936775!5m2!1ses!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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