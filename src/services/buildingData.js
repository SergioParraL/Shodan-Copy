// 147.135.27.93
// 64.190.63.111

export const resetComponentsDOM = () =>{
    const portsTemplate = document.querySelector('ports-template')
    const vulnerabilitiesTemplate = document.querySelector('vulnerabilities-template')
    const generalInformation = document.querySelector('general-Information')
    const headerTemplate = document.querySelector('header-template')
    const error = document.querySelector('.error')

    const arrComponents = [portsTemplate,vulnerabilitiesTemplate,generalInformation,headerTemplate,error]

    arrComponents.forEach(element => {
        if(element != null){
            element.parentNode.removeChild(element)
        }
        // console.log(element)
    });
}

export const processingData = (jsonData) =>{
    if(jsonData.error == 'Invalid IP' ){
        const div = document.querySelector('.headerMain')
        const child = document.createElement('div')
        child.classList.add('center')
        child.classList.add('error')
        child.innerHTML =`
                <h1 class="white-text">Invalid IP</h1>
        `
        div.appendChild(child)

        return console.log('tenemos un error')
    }else{
        const dataName = ['hostnames','domains','country_name','city','org','isp','asn']
        let generalInformation = {}
        let main = {generalInformation}
        let ports = []
        let vulns = []
        let ip = jsonData.ip_str

        console.log(jsonData)

        Object.entries(jsonData).forEach(([name,value])=>{
            dataName.forEach((keyValue)=>{
                if(keyValue == name){
                    generalInformation[name] = value
                }
            })
            if(name == 'ports'){
                value.forEach((e)=>{
                    ports.push(e)
                })
            }if(name == 'vulns'){
                value.forEach((e)=>{
                    vulns.push(e)
                })
            }
        })

        main.ip = ip
        if(vulns.length > 0){
            main.vulns = vulns
        }if(ports.length > 0){
            main.ports = ports
        }
        
        return webComponentsConstructor(main)
    }

}

const webComponentsConstructor = (data) =>{
    const componentGenInfo = document.createElement('general-information')
    const componentVulns = document.createElement('vulnerabilities-template')
    const componentPorts = document.createElement('ports-template')
    const componentHeader = document.createElement('header-template')
    const parent1 = document.querySelector('.rowN1')
    const parent2 = document.querySelector('.rowN2')
    const parent3 = document.querySelector('.headerMain')


    componentGenInfo.setAttribute('hostnames',data.generalInformation.hostnames)
    componentGenInfo.setAttribute('domains',data.generalInformation.domains)
    componentGenInfo.setAttribute('country_name',data.generalInformation.country_name)
    componentGenInfo.setAttribute('city',data.generalInformation.city)
    componentGenInfo.setAttribute('org',data.generalInformation.org)
    componentGenInfo.setAttribute('isp',data.generalInformation.isp)
    componentGenInfo.setAttribute('asn',data.generalInformation.asn)
    
    componentVulns.setAttribute('vulns', data.vulns)

    componentPorts.setAttribute('ports', data.ports)
    
    componentHeader.setAttribute('ip_str', data.ip)

    parent1.appendChild(componentGenInfo) 
    parent1.appendChild(componentVulns)
    parent2.appendChild(componentPorts)
    parent3.appendChild(componentHeader)
    // console.log(data)
}