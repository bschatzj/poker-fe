import React, { useState, useEffect } from 'react'
import './profile.css'
import { axiosWithAuth } from '../axiosWithAuth'
import { BounceRight } from 'animate-components'
import Hands from './hands'
import makeData from './makeData'
import { columns } from './TableHead'


export default function Profile() {
    const [profileInfo, setProfileInfo] = useState({})
    const [hands, setHands] = useState([])
    const [displayed, setDisplayed] = useState(0)

    useEffect(() => {
        axiosWithAuth().get(`./users/user/1`)
            .then(res => {
                console.log(res)
                setProfileInfo(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axiosWithAuth().get(`./hands/1`)
            .then(res => {
                setHands(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const data = makeData(hands)
    console.log(data.length)
    return (
        <div className='profile'>
            <BounceRight as='div' iterations='1'>
                <h1 className="greeting">
                    Welcome back, {profileInfo.username}
                </h1>
            </BounceRight>
            <div className='handInfo' >
            <button className="pageChange" onClick={() => setDisplayed(displayed - 15)}>Display Previous</button>
            <h1>{data.length} total hands. Displaying {displayed} - {displayed + 15} </h1>
            
            <button className="pageChange"onClick={() => setDisplayed(displayed + 15)}>Display Next</button>
            </div>
            <Hands columns={columns} data={data} number={displayed} />


        </div>
    )
}