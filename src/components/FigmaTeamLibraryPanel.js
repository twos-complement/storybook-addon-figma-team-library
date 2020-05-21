import React from 'react'

import ComponentList from './ComponentList'
import ActiveComponent from './ActiveComponent'

const FigmaTeamLibraryPanel = ({ components }) => (
  <div>
    <ActiveComponent />
    <ComponentList components={components} />
  </div>
)

export default FigmaTeamLibraryPanel
