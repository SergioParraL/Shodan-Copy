// 147.135.27.93
// 64.190.63.111
//[
//     [
//          {generalInformation : 
//              {
//                   hostnames : value,
//                   hostnames : value
//              }
//          }
//     ],
//     [
//          [80,12,32,42]
//     ],
//     [
//          ['CVE-2019-0196', 'CVE-2020-1934', 'CVE-2021-34798']
//     ]
//]


export const processingData = (jsonData,shadow) =>{
    const dataName = ['hostnames','domains','country_name','city','org','isp']
    let generalInformation = {}
    let main = [generalInformation]
    let ports = []
    let vulns = []
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
    if(vulns.length > 0){
        main.push(vulns)
    }if(ports.length > 0){
        main.push(ports)
    }
    webComponentsConstructor(main)
}

const webComponentsConstructor = (data) =>{
    const componentGenInfo = document.createElement('general-information')
    componentGenInfo.setAttribute('hostnames',data[0].hostnames[0])
    componentGenInfo.setAttribute('domains',data[0].domains[0])
    componentGenInfo.setAttribute('country_name',data[0].country_name)
    componentGenInfo.setAttribute('city',data[0].city)
    componentGenInfo.setAttribute('org',data[0].org)
    componentGenInfo.setAttribute('isp',data[0].isp)
    
    const parent = document.querySelector('.rowN1')
    parent.appendChild(componentGenInfo)
    const element = document.querySelector('general-information')
}