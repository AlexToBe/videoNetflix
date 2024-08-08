import { FC, } from 'react'
import { useRouter } from 'next/router'
import useMovie from '@/hooks/useMovie'
import{BsFillPlayFill} from 'react-icons/bs'


interface PlayButtonProps{
    movieId: string
    otherFunc?:()=>void
}
const PlayButton: FC<PlayButtonProps> = ({movieId,otherFunc})=>{
    const router= useRouter()
    const handlePlay = () => {
        if (otherFunc) {
            otherFunc()
        }
        router.push(`/watch/${movieId}`)
    }
  
 return (
     <button
         onClick={handlePlay}
         className=' bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition'>
         <BsFillPlayFill size={20} className='text-black mr-1' />
    play
        </button>
    )
}

export default PlayButton