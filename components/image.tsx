import Image, { ImageProps } from 'next/image'
import { useState, useCallback, useEffect } from 'react'

interface ImageWrapperProps extends Omit<ImageProps, 'fill' | 'priority'> {
  src: string
  alt: string
}

const ImageWrapper: React.FC<ImageWrapperProps> = (props) => {
  const { src, alt, ...rest } = props
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className="cursor-pointer"
        priority={false}
        onClick={() => setOpen(true)}
        {...rest}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/80 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-dark-800/60 text-dark-100 hover:bg-dark-700 transition-colors cursor-pointer border-none z-10"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] object-contain cursor-pointer rounded-lg"
            onClick={close}
          />
        </div>
      )}
    </>
  )
}

export default ImageWrapper
