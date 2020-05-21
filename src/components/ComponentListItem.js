import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid gray;
  margin: 20px 0;
  padding: 20px;
  cursor: pointer;
`

const ComponentListItem = ({
  component: { name, key, node_id, thumbnail_url, user, updated_at },
}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Wrapper onClick={() => setShowDetails(!showDetails)}>
      <p>
        <strong>{name}</strong>
      </p>

      {showDetails && (
        <div>
          <p>
            (Key: {key} / Node Id: {node_id})
          </p>
          <img src={thumbnail_url} />
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
