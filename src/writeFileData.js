const fs = require('fs');


const deleteFileData = (path) => {
    fs.truncate(path, 0, (error) => {
        if (error) {
            console.error(error)
        }
    })
}

const writeFileData = (path, data) =>{
    fs.writeFile(path, data, (err) => {
        if(err) throw('hubo un error');
        console.log('archivo escrito')
    })
}


module.exports = {
    deleteFileData : deleteFileData,
    writeFileData : writeFileData,
}