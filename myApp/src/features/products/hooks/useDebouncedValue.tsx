import { useState } from "react"
import { useEffect } from "react"
const useDebouncedValue=(searchValue:string,delay:number)=>{
    const [debouncedValue,setDebouncedValue]=useState<string >('')

useEffect(()=>{

    const timer=setTimeout(()=>{
        setDebouncedValue(searchValue)
    },delay)

    return()=>{
    clearTimeout(timer)
}
},[searchValue,delay])




return debouncedValue
}

export default useDebouncedValue