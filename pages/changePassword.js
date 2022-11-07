import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import ChangePass from '../components/ChangePass'

export default function homeArtist() {
    var stateUser = "artista"
    return (
        <>
            <Header />
            <ChangePass />
        </>
    )
}