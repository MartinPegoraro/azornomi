import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Canva from '../components/Canva'

export default function homeCanvas() {
    var stateUser = "lienzo"
    return (
        <>
            <Header />

            <Layout stateUser={stateUser}>
                <Canva />
            </Layout>
        </>
    )

}
