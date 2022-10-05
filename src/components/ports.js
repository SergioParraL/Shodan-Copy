class Ports extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
    }

    static get observedAttributes(){
        return['ports']
    }

    attributeChangedCallback(att,oldVal,newVal){
        if(att === 'ports'){
            this.ports = newVal
        }
    }

    getResourses(){
        return`
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="../styles/components.css">
        `
    }
    getTemplate(){
        const portsData = this.ports.split(',')
        const ports = document.createElement("template")
        let arrNumber = []
        
        ports.innerHTML = `
        <div class="boxContent ports">
            <h5 class="">Open <strong>Ports</strong></h5>
        </div>
        <div class="col s12">
            <div class="label">
                <span class="col s6">//&nbsp;<span><span>80</span>&nbsp;/&nbsp;TCP</span></span>
                <span class="col s6"><span class="number">-1263655224 </span>&nbsp;&nbsp;|&nbsp;&nbsp;2022-09-03T14:33:17.210663</span> 
            </div>
            <div class="boxContent">
                <div class="vulnerabilitiesText">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut natus laborum porro? Omnis deserunt quas saepe doloribus est? Odio possimus quae harum ducimus sit sint a eum nihil soluta est!
                </div>
            </div>
        </div>
        ${this.getResourses()}
        ${this.getStyles()}
        `
        
        portsData.forEach(string =>{
            let parseNumber = parseInt(string, 10)
            arrNumber.push(parseNumber)
        })

        arrNumber.sort((a,b)=>{
            return a - b
        })
        console.log(arrNumber)
        arrNumber.forEach(element => {
            const portParent = ports.content.querySelector('.ports')
            const portTag = document.createElement('a')
            portTag.classList.add('waves-effect', 'blue', 'btn', 'resultResearch',  'portBox')
            portTag.text = element
            portParent.appendChild(portTag)
        });

        
        return ports
    }
    getStyles(){
        return `
            <style>
                .resultResearch,h5{
                    color: white;
                }
                .portBox{
                    width: 4rem;
                    height: 3rem;
                    padding: 5px;
                    margin: .4rem 0.4rem;
                }
                .ports{
                    border-top: 3px solid #41A4DB;
                }
                .label{
                    color: white;
                    margin-block-start: 1rem;
                }
                .label span:nth-child(2){
                    text-align: right;
                    font-size: 12px;
                    float: right;
                }
                .label span:nth-child(1) span{
                    background-color: #212121;
                }
                .label span:nth-child(1) span span{
                    font-weight: 600;

                }
                .label span span.number{
                    color: #2096F3;
                    
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

customElements.define('ports-template',Ports)

