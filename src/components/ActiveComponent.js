import React, { useContext, useState, useEffect } from 'react'
import { useParameter } from '@storybook/api'
import moment from 'moment'
import styled from 'styled-components'

import FigmaApiContext from '../contexts/FigmaApiContext'

const Wrapper = styled.div`
  padding: 20px;
`

const ActiveComponent = () => {
  const { api } = useContext(FigmaApiContext)
  const figma = useParameter('figma')
  const [component, setComponent] = useState()

  useEffect(() => {
    setComponent(null)
    ;(async () => {
      if (!figma || !figma.key) return
      // Fetch component meta:
      let data = await api.fetchComponent({ key: figma.key })
      // Use component meta to fetch scaled image:
      let imageSrc = await api.fetchImage({
        file_key: data.file_key,
        node_id: data.node_id,
      })
      // Set component data to state:
      setComponent({ ...data, imageSrc })
    })()
  }, [figma && figma.key])

  //TODO: add instructions to add the key to story:
  if (!figma || !figma.key) {
    return <p>Not linked to a Figma Team Library Component.</p>
  }

  if (!component) {
    return <p>Loading Component...</p>
  }

  return (
    <Wrapper>
      <h2>
        {component.name} &gt; {component.description}
      </h2>
      <img src={component.imageSrc} />
      <p>
        {component.user.handle} last updated{' '}
        {moment(new Date(component.updated_at)).fromNow()}
      </p>
    </Wrapper>
  )
}

export default ActiveComponent
