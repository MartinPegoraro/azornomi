import React, { useState } from 'react'

const useStatesHome = () => {
    const [state, setState] = useState('')

    const handleClick = (estado) => {
        setState(estado)
    }
    console.log(state);

    return [state, handleClick]
}

export default useStatesHome