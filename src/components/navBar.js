class NavBar extends HTMLElement{ //Delivered
    constructor(){
        super()
        this.attachShadow({mode : 'open'})
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
                nav{
                    background-color: transparent;
                    box-shadow: none;
                }
                .row .col{
                    padding: 0;
                }
                img.icon{
                    width: 3em;
                    margin: .5rem;
                }
                .navOptions{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    height: 4.2em;
                    color: white;
                    border-right: 1px solid #fffffd24;
                    width: 8em;
                }
                .navOptions a{
                    color: white;
                    display:flex;
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
                li{
                    margin: 0;
                    background-color: #2F2F2F;
                }
                li:last-child{
                    background-color: #5f9838;
                }
                .navBarr{
                    margin-left: .7rem;
                    position: relative;
                    bottom: 105%;
                    z-index: 10;
                    background-color: #212121;
                   
                }
                .FormSearhBar{
                    width: 30%;
                    height: 4.2rem;
                }
                .navOptions.hover:hover{
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
            ${this.getResourses()}
            ${this.getStylesNavBar()}

            <nav>
                <div class="nav-wrapper row">
                    <ul id="nav-mobile" class="left col s12">
                        <li class="navOptions hover">
                            <a href="index.html">
                                <img class='icon' src="./src/icon/SL-logo-white.svg" alt="">
                            </a>
                        </li>
                        <li class="navOptions hover"><a href='index.html'>ShodanCopy</a></li>
                        <li class="navOptions hover"><a href="https://github.com/SergioParraL">GitHub</a></li>
                        <li class="navOptions hover"><a href="https://sergioparral.github.io/PortFolio/">See more</a></li>
                        <li class="FormSearhBar ">
                            <form class='search'>
                                <div class="input-field">
                                    <input id="search" type="search" required placeholder="Search...">
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
                        </li>
                        <li class="right"><a href="#">LinkedIn</a></li>
                      </ul>
                    
                </div>
            </nav>
            
            <script src="../services/services.js"></script>
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