import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'

import FigmaComponent from './ui/FigmaComponent'

const Wrapper = styled.div`
  border: 1px solid #c9cad3;
  background-color: #f9fcff;
  margin: 20px 0;
  padding: 20px;
  cursor: pointer;

  img {
    max-width: 100%;
    display: block;
  }
`

const Key = styled.p`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 0 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
`

const ComponentListItem = ({
  component: {
    name,
    key,
    node_id,
    thumbnail_url,
    user,
    updated_at,
    containing_frame,
  },
}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Wrapper onClick={() => setShowDetails(!showDetails)}>
      <p>
        <strong>{name}</strong>
      </p>

      {showDetails && (
        <div>
          <Key onClick={e => e.stopPropagation()}>{key}</Key>
          <FigmaComponent
            background={containing_frame && containing_frame.backgroundColor}
            imgSrc={thumbnail_url}
          />
          <div>
            <p>
              {user.handle} last updated{' '}
              {moment(new Date(updated_at)).fromNow()}
            </p>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default ComponentListItem
