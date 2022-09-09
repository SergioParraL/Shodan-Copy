class GeneralInformation extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
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
        const contentNode = document.createElement('template')
        contentNode.innerHTML = `
            <div class="boxContent generalInformation">
                <h5><ion-icon name="globe"></ion-icon>
                    <strong>General</strong> Information</h5>
                <table>
                    <tr>
                        <th class="resultTitleResearch">Hostnames</th>
                        <td class="resultResearch">ip93.ip-147-135-27.us</td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">Domains</th>
                        <td><a class="waves-effect green btn resultResearch">IP-147-135-27.us</a></td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">Country</th>
                        <td class="resultResearch">United States</td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">City</th>
                        <td class="resultResearch">McDonough</td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">Organization</th>
                        <td class="resultResearch">OVH US LLC</td>
                    </tr>
                    <tr>
                        <th class="resultTitleResearch">OVH SAS</th>
                        <td class="resultResearch">AS16276</td>
                    </tr>
                </table>
            </div>
            ${this.getStylesTemplate()}
            ${this.getResourses()}
            `
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