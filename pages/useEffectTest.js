import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
// import Triangle from 'public/assets/svgs.svg'

import  triangle from '../public/assets/angle-up.svg'
import Image from 'next/image';

function UseEffectTest() {
    // const display = document.querySelector('#count')
    // display.
        const[count, setcount] = useState(0)

    useEffect(() => {
        gsap.fromTo('#count', {
            duration: 0,
            opacity: 0,
            translateY: '100%'
        }, {
            duration: .2,
            opacity: 1,
            translateY: 0
        })

        return () => {
            gsap.fromTo('#count', {
                duration: 0,
                opacity: 0,
                translateY: 0
            }, {
                duration: .2,
                opacity: 1,
                translateY: '-100%'
            })
        }
    }, [count])

    return (
        <div style={{ fontSize: '5rem', textAlign: 'center', overflow: 'hidden', height: '10ch' }}>
            <button onClick={() => setcount(count + 1)}>+</button>
            <h1 id='count' style={{ overflow: 'hidden' }}>{count}</h1>
            <div id='count' style={{ overflow: 'hidden' }}>{count}</div>
            <img  alt="" />
        </div>
    )
}

export default UseEffectTest