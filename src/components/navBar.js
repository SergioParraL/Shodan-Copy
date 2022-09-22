
class NavBar extends HTMLElement{ //Delivered
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
    }
    
    static get observedAttributes(){
        return ['width','icon']
    }
    
    attributeChangedCallback(attr,oldVal,newVal){
        if(attr === 'width'){
            this.width = newVal
        }
        if(attr === 'icon'){
            this.icon = newVal
        }
    }

    getResourses = () =>{
        return`
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        `
    }

    getStylesNavBar = () => {
        return`
            <style>
                img.icon{
                    width: 4em;
                }
                .navOptions{
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                }
                .buttonBarrSearch{
                    list-style: none;
                    width: 5.2rem;
                    position: relative;
                    right: 20px;
                }
                .btnSearchBarr{
                    background-color: transparent;
                    height: 4rem;
                    border: none;
                }
                .buttonBarrSearch a i{
                    line-height: 60px;
                }
                .buttonBarrSearch a{
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    height: 4.4rem;
                    position: relative;
                    bottom: 3px;
                }
                .navBarr{
                    margin-left: .7rem;
                    position: relative;
                    bottom: 105%;
                    z-index: 10;
                }
                nav{
                    background-color: #212121;
                }
                .nav-wrapper{
                    background-color: #2F2F2F;
                }
                .navOptions:hover{
                    background-color: black;
                }
                .search-icon:hover{
                    cursor:pointer
                }
            </style>
        `
    } 

    getNavBarTemplate(){
        const navBar = document.createElement('template')
        navBar.innerHTML = `
            <div class="row navBarr">
                <span class='col s1'>
                    <img class='icon' src="${this.icon}" alt="">
                </span>
                <nav id="nav" class="col ${this.width}">
                    <div class="navOptions col s2 opt"><a href='#'>Sergio</a></div>
                    <div class="navOptions col s2"><a href='#'>Explore</a></div>
                    <div class="navOptions col s2"><a href='#'>GitHub</a></div>
                    <div class="col s6">
                        <nav>
                            <div class="nav-wrapper">
                            <form class='search'>
                                <div class="input-field">
                                    <input id="search" type="search" required>
                                    <label class="label-icon" for="search">
                                        <i class="material-icons search-icon">
                                            <ion-icon name="search-outline"></ion-icon>
                                        </i>
                                    </label>
                                    <i class="material-icons close-outline">
                                        <ion-icon name="close-outline"></ion-icon>
                                    </i>
                                </div>
                            </form>
                            </div>
                        </nav>
                    </div>
                </nav>
            </div>
            <script src="../services/services.js"></script>
            <button onClick="sendMessage()">👀 Press me!</button>
            
            ${this.getResourses()}
            ${this.getStylesNavBar()}
            `
            return navBar
        }
        
        render(){
            this.shadowRoot.appendChild(this.getNavBarTemplate().content.cloneNode('true'))
    }

    connectedCallback() {
        this.render()
    }

}

customElements.define('nav-bar', NavBar)