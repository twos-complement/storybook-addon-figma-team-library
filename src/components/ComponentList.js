import React, { useState, useContext, useEffect } from 'react'
import { useParameter } from '@storybook/api'
import styled from 'styled-components'

import FigmaApiContext from '../contexts/FigmaApiContext'
import ComponentListItem from './ComponentListItem'

const Wrapper = styled.div`
  padding: 20px;
`

const Input = styled.input`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const ComponentList = () => {
  const { api } = useContext(FigmaApiContext)
  const figmaTeamId = useParameter('figmaTeamId')
  const [query, setQuery] = useState('')
  const [components, setComponents] = useState(null)

  useEffect(() => {
    ;(async () => {
      let data = await api.fetchComponents({ figmaTeamId })
      setComponents(data)
    })()
  }, [])

  if (components === null) {
    return <p>Loading components...</p>
  }

  if (components.length === 0) {
    return <p>You don't have any components!</p>
  }

  return (
    <Wrapper>
      <Input
        type="search"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <div>
        {components &&
          components
            .filter(c => c.name.toLowerCase().indexOf(query) >= 0)
            .map(component => (
              <ComponentListItem
                key={component.node_id}
                component={component}
              />
            ))}
      </div>
    </Wrapper>
  )
}

export default ComponentList
