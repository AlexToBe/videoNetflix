import {FC, useCallback, useEffect, useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import PlayButton from './PlayButton'
import FavoriteButton from './FavoriteButton'
import useInfoModal from '@/hooks/useInfoModal'
import useMovie from '@/hooks/useMovie'
import { GiDuration } from 'react-icons/gi'


interface InfoModalProps{
    visable?: boolean
    onClose?:any
}
const InfoModal: FC<InfoModalProps> = ({visable,onClose})=>{
    const [isVisable,setIsVisable] = useState(!!visable)
    const {movieId} = useInfoModal()
    const {data={}} = useMovie(movieId)
    useEffect(()=>{
        setIsVisable(!!visable)
    },[visable])
    
    const handleClose = useCallback(()=>{
        setIsVisable(false)
        setTimeout(()=>{
            onClose()
        },300)
    },[onClose] )
    if(!visable){
        return null
    }
    
        
    return (
            <div className=' z-50 transition duration-300 bg-black bg-opacity-80 flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0'>
            <div className=' relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
                <div className={`${isVisable}?'scale-100':'scale-0' transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md `}>
                    <div className=' relative h-96'>
                        <video
                            className=' w-full brightness-[60%] object-cover h-full'
                            autoPlay muted loop poster={data?.thumbnailurl} src={data?.videoUrl}>
                            
                            </video>
                        <div
                            className=' cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'
                            onClick={handleClose}>
                            <AiOutlineClose className=' text-white' size={20}/>
                        </div>
                        <div className=' absolute bottom-[10%] left-10]'>
                            <p className=' text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-80'>
                                {data?.title}
                            </p>
                            <div className=' flex flex-row gap-4 items-center'>
                                <PlayButton movieId={data?.id} otherFunc={ handleClose} />
                                <FavoriteButton movieId={data?.id}/>
                            </div>
                        </div>
                    </div>
                    <div className=' px-12 py-8'>
                        <p className=' text-green-400 font-semibold text-lg'>new</p>
                        <p className=' text-white text-lg'>{ data?.duration}</p>
                        <p className=' text-white text-lg'>{ data?.genre}</p>
                    </div>
                </div>
                </div>
            </div>
        )
}

export default InfoModal