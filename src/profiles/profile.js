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

            <Hands columns={columns} data={data} number={0} />


        </div>
    )
}