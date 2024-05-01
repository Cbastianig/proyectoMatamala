'use server'
const path = require('path');
const fs = require('fs-extra')
const { v4: uuidv4 } = require('uuid');

const sharp = require('sharp');


export default async function guardar_adjunto(archivo, ruta, sistema) {
    try {
        let directorioDestino = `src/app/api/adjuntos/${ruta}`;
        let extension = path.extname(archivo.name);
        let nuevoNombre = `Adjunto_${sistema}_${uuidv4()}`;

        let rutabd = '';
        let buffer = await archivo.arrayBuffer();
        const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'].includes(extension.toLowerCase());
        const isPDF = ['.pdf'].includes(extension.toLowerCase());
        if (isImage) {
            nuevoNombre += '.webp';
            let rutaCompleta = path.join(directorioDestino, nuevoNombre);
            rutabd = path.join(`/api/adjuntos/${ruta}`, nuevoNombre);
            const data = await sharp(buffer).rotate()
                .webp({ quality: 90 }).withMetadata()
                .toBuffer();

            await fs.outputFile(rutaCompleta, data);
            return rutabd;
        } else if (isPDF) {
            
            nuevoNombre += '.pdf';
            let rutaCompleta = path.join(directorioDestino, nuevoNombre);
            rutabd = path.join(`/api/adjuntos/${ruta}`, nuevoNombre);
            await fs.outputFile(rutaCompleta, Buffer.from(buffer));
        } else {
            throw new Error('No es una imagen o PDF compatible');
        }
    } catch (err) {
        console.error(err);
        if (err.message === 'No es una imagen o PDF compatible') {
            throw { message: 'El archivo no es una imagen o PDF compatible.', mostrable: true };
        } else {
            throw { message: 'Ocurrió un error al intentar guardar el archivo. Por favor, inténtelo de nuevo.', mostrable: true };
        }
    }

}