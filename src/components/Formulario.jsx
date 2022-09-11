
// useEffect es un buen lugar para llamar una API
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas' // Lo ponemos con {} porque trae un objeto
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #f57963;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color .3s ease;
    transition: color .3s ease;

    &:hover {
        background-color: #fff;
        color: #f57963  ;
    }
`

const Formulario = ({setMonedas}) => {

    const [ criptos, setCriptos ] = useState([])
    const [ error, setError ] = useState(false) // En caso que haya un error cambia a true

    // Lo extraemos del hook. Lo necesitamos tambien en el App para mostrar el resultado
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    // criptos -> es toda la info que trae la API desde setCriptos(arrayCriptos)
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    // Cuando este cargado el componente, como no tiene ninguna dependencia, el [] esta vacio, va a ejecutarse una vez, consultar la API y traernos los resultados.
    useEffect(() => {
      const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

        // Vamos a hacer un fetch hacia esa URL
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arrayCriptos = resultado.Data.map( cripto => {
            // Para no tener strings separados y tenerlos en un objeto cada uno
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            
            return objeto
        })
        
        setCriptos(arrayCriptos) // Voy a llenar el arreglo del State, que comienza vacio, con los datos de la api mapeados

      }

      consultarAPI()

    }, [])
    

    // SelectMonedas()
    const handleSubmit = e => {
        e.preventDefault()
        
        if([moneda, criptomoneda].includes('')) {
            setError(true)
            return // Esto se coloca para no poner un else y termine la ejecución ahi, en caso de Error
        }

        setError(false) // No olvidarme de poner esto!!! Para volverlo a False una vez que pase la validación
        setMonedas({
            moneda,
            criptomoneda
        })

    }



  return (
    <>
        {error && <Error>Todos los campos con obligatorios</Error>}

        <form
            onSubmit={handleSubmit}
        >

            <SelectMonedas />
            <SelectCriptomoneda />

            <InputSubmit 
                type="submit"
                value="Cotizar"
            />
        </form>
    </>
  )
}

export default Formulario