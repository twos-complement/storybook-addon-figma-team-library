import React, { useState, useContext, useEffect } from 'react'
import { useParameter } from '@storybook/api'
import styled from 'styled-components'

import FigmaApiContext from '../contexts/FigmaApiContext'
import ComponentListItem from './ComponentListItem'

const Wrapper = styled.div`
  padding: 20px;
  background-color: #e4ecf5;
  min-height: 100vh;
  border-top: 1px solid #e5e5e5;
`

const Input = styled.input`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
`

const ComponentList = () => {
  const { api } = useContext(FigmaApiContext)
  const figmaFileId = useParameter('figmaFileId')
  const [query, setQuery] = useState('')
  const [components, setComponents] = useState(null)

  useEffect(() => {
    ;(async () => {
      let data = await api.fetchComponents({ figmaFileId })
      setComponents(data)
    })()
  }, [])

  if (components === null) {
    return (
      <Wrapper>
        <p>Loading components...</p>
      </Wrapper>
    )
  }

  if (components.length === 0) {
    return (
      <Wrapper>
        <p>You don't have any components!</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Input
        type="search"
        placeholder="Search"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <div>
        {components &&
          components
            .filter(c => c.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
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
