import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${({ background }) => background};
`
Wrapper.propTypes = {
  background: PropTypes.string,
}
const FigmaComponent = ({ background, imgSrc }) => (
  <Wrapper background={background}>
    <img src={imgSrc} />
  </Wrapper>
)

FigmaComponent.propTypes = {
  background: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
}

FigmaComponent.defaultProps = {
  background: '#fff',
}

export default FigmaComponent
