import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultados from './components/Resultados'
import ImagenCripto from './img/imagen-criptos.png'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #f57963;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [ monedas, setMonedas ] = useState({}) // El objeto se va a llenar con los datos del formulario
  const [ resultado, setResultado ] = useState({}) // Creamos un state más para mostrarlo en pantalla los resultados
  const [ cargando, setCargando ] = useState(false) // Cuando cargue el request, el spinner pasa a true y uego lo reiniciamos a false nuevamente

  // Creo este useEffect para que detecte cuando tiene algo ese objeto y poder hacer el llamado a nuestra API
  useEffect(() => {
    // Object.keys() se pone porque es un objeto 
    if(Object.keys(monedas).length > 0) {
      
      const cotizarCripto = async () => {

        setCargando(true) // Cuando comienza la búsqueda aparece el spinner
        setResultado({})

        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false) // Termina la consulta, trae el resultado y pasa a false nuevamente

      }

      cotizarCripto()

    }
  }, [monedas]) // El arreglo de dependencia va a estar escuchando por los cambio que sucedan en monedas [monedas]
  

  return (
    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt='Imagenes cripto monedas'
      />
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />

        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultados resultado={resultado} />}
      </div>
    </Contenedor>
    
  )
}

export default App
