import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Search from '../components/Search'

export default function search() {
    var stateUser = "lienzo"
    return (
        <>
            <Header />
            <Layout stateUser={stateUser}>
                <Search />
            </Layout>
        </>
    )

}