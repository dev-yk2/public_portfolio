import Image from 'next/image'
import React from 'react'

type ImageBasicProps = {
  src: string
  alt: string
  priority?: boolean
  // styles?: {
  //   [key: string]: string
  // }
  className?: string
}

export const ImageBasic: React.FC<ImageBasicProps> = ({ src, alt, priority, className }) => {
  return (
    <div className="relative text-center w-full shadow">
      <Image
        className={`object-contain !relative ${className}`}
        src={src}
        alt={alt}
        fill
        priority={priority ?? false}
        // sizes="100vw"
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
      />
    </div>
  )
}
