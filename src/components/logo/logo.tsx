import './logo.css'
import Image from 'next/image'
import React from "react"
import Logo from '../../assets/images/logo.png'

export default props =>
    <div className="logo">
        <Image src={Logo} alt="Logo" className="img" />
    </div>