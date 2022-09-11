import styled from "@emotion/styled"

const Contenedor = styled.div`
    background-color: #fff;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: flex-start;
    gap: 1rem;

`
const Imagen = styled.img`
    display: block;
    width: 40px;
    
` 

const Texto = styled.p`
    font-size: 20px;
    span {
        color: #f57963;
        font-weight: 700;    
    }
`
const Precio = styled.div`
    font-size: 24px;
    span {
        color: #f57963;
        font-weight: 700;    
    }
    
`

const Resultados = ({resultado}) => {
    
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

  return (
    <Contenedor>
        <Imagen 
            src={`https://cryptocompare.com/${IMAGEURL}`}
            alt="imagen critp"
        />
        <div>
            <Precio>El precio es de: <span>{PRICE}</span></Precio>
            <Texto>El precio más alto del día: <span>{HIGHDAY}</span></Texto>
            <Texto>El precio más bajo del: <span>{LOWDAY}</span></Texto>
            <Texto>Variación pultimas 24hs: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Contenedor>
  )
}

export default Resultados