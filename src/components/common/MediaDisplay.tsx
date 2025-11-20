import React, { useState, useRef, useEffect } from 'react';
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
    const videoRef = useRef<HTMLVideoElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');

    useEffect(() => {
        if (mediaType === 'video' && videoRef.current) {
            const video = videoRef.current;
            const handleLoadedMetadata = () => {
                const isVertical = video.videoHeight > video.videoWidth;
                setObjectFit(isVertical ? 'contain' : 'cover');
            };
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        } else if (mediaType === 'image' && imgRef.current) {
            const img = imgRef.current;
            const handleLoad = () => {
                const isVertical = img.naturalHeight > img.naturalWidth;
                setObjectFit(isVertical ? 'contain' : 'cover');
            };
            img.addEventListener('load', handleLoad);
            // Se já carregou
            if (img.complete && img.naturalHeight > 0) {
                handleLoad();
            }
            return () => img.removeEventListener('load', handleLoad);
        }
    }, [src, mediaType]);

    if (mediaType === 'video') {
        return (
            <video
                ref={videoRef}
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
                    objectFit: objectFit,
                    backgroundColor: '#000'
                }}
            >
                Seu navegador não suporta a reprodução de vídeos.
            </video>
        );
    }

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={className}
            loading={loading}
            style={{
                width: '100%',
                height: '100%',
                objectFit: objectFit,
                backgroundColor: '#000'
            }}
        />
    );
};

export default MediaDisplay;
