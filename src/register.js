import React from 'react'
import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { AddonPanel } from '@storybook/components'
import FigmaTeamLibraryPanel from './components/FigmaTeamLibraryPanel'
import FigmaApiContext from './contexts/FigmaApiContext'
import { STORY_RENDERED } from '@storybook/core-events'

import Api from './util/api'

const ADDON_ID = 'twos-complement/figma-team-library'
const PARAM_KEY = 'figma'
const PANEL_ID = `${ADDON_ID}/panel`

addons.register(ADDON_ID, api => {
  const render = ({ active, key }) => {
    let figmaApi

    // Get figma key from global Storybook config:
    const figmaKey = useParameter('figmaKey')

    // Create Figma API instance:
    if (figmaKey) {
      figmaApi = new Api({ figmaKey })
    }

    api.on(STORY_RENDERED, e => console.log('STORY RENDERED', e))

    return (
      <AddonPanel active={active} key={key}>
        <FigmaApiContext.Provider value={{ api: figmaApi }}>
          {!figmaApi && <p>Connecting to Figma...</p>}
          {figmaApi && <FigmaTeamLibraryPanel />}
        </FigmaApiContext.Provider>
      </AddonPanel>
    )
  }

  const title = 'Figma Team Library'

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
    paramKey: PARAM_KEY,
  })
})
