import styled from '@emotion/styled'
import { useState } from 'react'

const Label = styled.label`
    color: #fff;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;

`

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 12px;
    border-radius: 5px;
    
`

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('') // Este estado se lo estoy pasando al Formulario desde el return más abajo
  
    /* Al tener los () quiere decir que es lo que se muestra en pantalla */
    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>
            
            <Select
                value={state}
                onChange={ e => setState(e.target.value) }
            >
                <option value=""> -- Seleccione -- </option>

                {opciones.map(opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.nombre}</option>
                ))}

            </Select>
        </>
    )

    return [ state, SelectMonedas ]
}

export default useSelectMonedas