import styled from '@emotion/styled'

const TextError = styled.div `
    background-color: #fff;
    color: #B7322C;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
    border-radius: 5px;
`

const Error = ({children}) => {
  return (
    <TextError>
        {children}
    </TextError>
  )
}

export default Error