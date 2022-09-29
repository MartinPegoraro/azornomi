import React from 'react'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Profile from '../../components/Profile'

export default function index() {
    var stateUser = "lienzo"
    return (
        <>
            <Header />
            <Layout stateUser={stateUser} >
                <Profile />
            </Layout>
        </>
    )
}
