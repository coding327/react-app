


import { Ajax } from '@/api/api'
import MyHead from '@/components/MyHead'
import React, { FC, useEffect , useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'umi'

const Detail:FC = () => {
    const location = useLocation()
    const [query] = useSearchParams()
    const params = useParams()
    const [obj,setObj ] = useState<any>(null)
    const getDetailData = async ()=>{
        let res:any = await Ajax.gettravelbyid({
            _id:params.id 
        })
        if(res.code==200){
            setObj(res.result)
        }
    }
    useEffect(()=>{
        getDetailData()
    },[])
    return (
        <div>
            <MyHead title={query.get('title')} ></MyHead>

            
        </div>
    )
}

export default Detail