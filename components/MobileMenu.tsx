import {FC} from 'react'

interface MobileMenuProps{
 visable?:boolean
}
const MobileMenu: FC<MobileMenuProps> = ({visable})=>{
  if (!visable) {
    return null
  }
 return (
        <div className=' bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex'>
            <div className=' flex flex-col gap-4'>
              <div className=' px-3 text-center text-white hover:undline'>Home</div>
              <div className=' px-3 text-center text-white hover:undline'>Series</div>
              <div className=' px-3 text-center text-white hover:undline'>Films</div>
              <div className=' px-3 text-center text-white hover:undline'>New & Popular</div>
              <div className=' px-3 text-center text-white hover:undline'>My List</div>
              <div className=' px-3 text-center text-white hover:undline'>Browse by Languages</div>
                
              
            </div>
        </div>
    )
}

export default MobileMenu