import React from 'react'

const SideButton = ({click,task}) => {
  return (
    <div onClick={()=>click()} className='hover:bg-gradient-to-r hover:cursor-default hover:from-white hover:to-stone-50  flex justify-between font-normal group  rounded-2xl  p-2 '>{task}
    <div className='text-transparent font-bold group-hover:text-stone-500'>→</div></div>
  )
}

export default SideButton