import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Artist from '../components/Artist'

export default function homeArtist() {
    var name = "Sucursal AA"
    return (
        <>
            <Header />

            <Layout pageName={name}>
                <Artist />
            </Layout>
        </>
    )
}

