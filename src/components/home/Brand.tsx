import React from 'react'
import img1 from '../../../public/imges/brand/brand1.png'
import img2 from '../../../public/imges/brand/brand2.png'
import img3 from '../../../public/imges/brand/brand3.png'
import img4 from '../../../public/imges/brand/brand4.png'
import img5 from '../../../public/imges/brand/brand5.png'
import img6 from '../../../public/imges/brand/brand6.png'
import Image from 'next/image'

const images= [img1, img2, img3, img4, img5, img6]

const Brand = () => {
  return (
    <div className='px-4'>
        <h1 className="font-bold text-2xl text-[#e94560] mb-6 border-b-4 w-fit pb-2">
        Popular Brands
      </h1>
      <div className='flex flex-col md:flex-row gap-2'>
{
            images.map((image,idx)=>(
                <div key={idx} className="relative w-full h-full md:h-24 border border-gray-500 hover:bg-[#e94560] p-4 rounded">
                    <Image src={image} alt='brand-img' width={300} height={300}className='object-cover' />
                </div>
            ))
        }
      </div>
        
        <div>
           
        </div>
    </div>
  )
}

export default Brand