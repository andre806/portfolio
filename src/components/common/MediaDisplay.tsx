import React from 'react';
import { detectMediaType } from '@/utils/mediaDetector';

interface MediaDisplayProps {
    src: string;
    alt?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    loading?: 'lazy' | 'eager';
}

/**
 * Componente que renderiza automaticamente uma imagem ou vídeo
 * baseado na extensão do arquivo
 */
export const MediaDisplay: React.FC<MediaDisplayProps> = ({
    src,
    alt = '',
    className = '',
    autoPlay = false,
    loop = false,
    muted = true,
    controls = true,
    loading = 'lazy'
}) => {
    const mediaType = detectMediaType(src);

    if (mediaType === 'video') {
        return (
            <video
                src={src}
                className={className}
                controls={controls}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            >
                Seu navegador não suporta a reprodução de vídeos.
            </video>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={loading}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }}
        />
    );
};

export default MediaDisplay;
