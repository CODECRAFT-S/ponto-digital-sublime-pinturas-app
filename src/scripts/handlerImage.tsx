import * as FileSystem from "expo-file-system";

export const saveImageLocally = async (imageUri: string, name: string) => {
    const directory = FileSystem.documentDirectory + 'imagesPoints/';
    const filename = name + '.jpeg';

    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

    await FileSystem.copyAsync({
        from: imageUri,
        to: directory + filename,
    });

    return directory + filename;
}

export const deleteImageLocally = async (imageUri: string) => {
    try {
        await FileSystem.deleteAsync(imageUri);
        return true;
    } catch (error) {
        // console.error('Erro ao excluir a imagem:', error);
        return false;
    }
}

export const deleteOfflineImagesFolder = async () => {
    try {
        const imagesFolder = FileSystem.documentDirectory + 'imagesPoints/';
        await FileSystem.deleteAsync(imagesFolder, { idempotent: true });
        return true;
    } catch (error) {
        // console.error('Erro ao excluir a pasta de imagens offline:', error);
        return false;
    }
}
