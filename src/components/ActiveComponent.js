import React, { useContext, useState, useEffect } from 'react'
import { useParameter } from '@storybook/api'
import moment from 'moment'
import styled from 'styled-components'

import FigmaApiContext from '../contexts/FigmaApiContext'
import FigmaComponent from './ui/FigmaComponent'

const Wrapper = styled.div`
  padding: 20px;

  img {
    padding-bottom: 40px;
  }
`

const ActiveComponent = () => {
  const { api } = useContext(FigmaApiContext)
  const figma = useParameter('figma')
  const [components, setComponents] = useState()

  useEffect(() => {
    setComponents(null)
    ;(async () => {
      if (!figma || !figma.keys) return
      // Fetch components meta:
      let componentsData = await api.fetchComponentDetails({ keys: figma.keys })
      // Set components data to state:
      setComponents(componentsData)
    })()
  }, [figma && figma.keys])

  //TODO: add instructions to add the key to story:
  if (!figma || !figma.keys) {
    return (
      <Wrapper>
        <p>Not linked to any Figma Team Library Components.</p>
      </Wrapper>
    )
  }

  if (!components) {
    return (
      <Wrapper>
        <p>Loading Components...</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {components.map(component => (
        <div key={component.key}>
          <h2>
            {component.name} &gt; {component.description}
          </h2>
          <p>
            {component.user.handle} last updated{' '}
            {moment(new Date(component.updated_at)).fromNow()}
          </p>
          <FigmaComponent
            background={
              component.containing_frame &&
              component.containing_frame.backgroundColor
            }
            imgSrc={component.imageSrc}
          />
        </div>
      ))}
    </Wrapper>
  )
}

export default ActiveComponent
