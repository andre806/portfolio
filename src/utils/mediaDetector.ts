/**
 * Detecta automaticamente o tipo de mídia baseado na extensão do arquivo
 * @param url - URL ou caminho do arquivo
 * @returns 'image' ou 'video'
 */
export const detectMediaType = (url: string): 'image' | 'video' => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
    
    const urlLower = url.toLowerCase();
    
    if (videoExtensions.some(ext => urlLower.endsWith(ext))) {
        return 'video';
    }
    
    if (imageExtensions.some(ext => urlLower.endsWith(ext))) {
        return 'image';
    }
    
    // Padrão: imagem
    return 'image';
};

/**
 * Verifica se a URL é um vídeo
 * @param url - URL ou caminho do arquivo
 * @returns true se for vídeo
 */
export const isVideo = (url: string): boolean => {
    return detectMediaType(url) === 'video';
};

/**
 * Verifica se a URL é uma imagem
 * @param url - URL ou caminho do arquivo
 * @returns true se for imagem
 */
export const isImage = (url: string): boolean => {
    return detectMediaType(url) === 'image';
};
