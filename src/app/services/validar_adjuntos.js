const path = require('path');
const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];
const isPDF = ['.pdf'];

function isValidFile(file) {
    const fileExtension = path.extname(file.name).toLowerCase();

    if (isImage.includes(fileExtension) || isPDF.includes(fileExtension)) {
        return true;
    }

    return false;
}

export default async function (adjuntos) {
    
    for (const file of adjuntos) {
        if (!isValidFile(file)) {
            return false;
        }
    }
    return true;

}

