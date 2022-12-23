import Image from 'next/image'

const ImageWraper = (prop) => {
  return (
    <Image
      src={prop.src}
      alt={prop.alt}
      fill={true}
      className="cursor-pointer"
      priority={true}
    />
  )
}
  
export default ImageWraper