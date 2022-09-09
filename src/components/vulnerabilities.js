class Vulnerabilities extends HTMLElement{
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
        const vulnerabilities = document.createElement('template')
        vulnerabilities.innerHTML = `
            <div class="boxContent vulnerabilities">
                <h5><ion-icon name="warning-outline"></ion-icon>Vulnerabilities</h5>
                <div class="row">
                    <div class="col s3 titleVulnerabilities"><h6>CVE-2019-0196</h6></div>
                    <div class="col s9 vulnerabilitiesText">A vulnerability was found in Apache HTTP Server 2.4.17 to 2.4.38. Using fuzzed network input, the http/2 request handling could be made to access freed memory in string comparison when determining the method of a request and thus process the request incorrectly.</div>
                </div>
                <div class="row">
                    <div class="col s3 titleVulnerabilities"><h6>CVE-2020-1934</h6></div>
                    <div class="col s9 vulnerabilitiesText"><p>In Apache HTTP Server 2.4.0 to 2.4.41, mod_proxy_ftp may use uninitialized memory when proxying to a malicious FTP server.</p></div>
                </div>
            </div>
            ${this.getStyles()}
            ${this.getResourses()}
        `
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