export default class Api {
  constructor({ figmaKey }) {
    this.figmaKey = figmaKey
  }

  async fetchComponents({ figmaTeamId }) {
    const resp = await fetch(
      `https://api.figma.com/v1/teams/${figmaTeamId}/components?page_size=1000`,
      {
        method: 'GET',
        headers: {
          'X-FIGMA-TOKEN': this.figmaKey,
        },
      },
    )
    const data = await resp.json()
    return data.meta.components
  }

  async fetchComponent({ key }) {
    const resp = await fetch(`https://api.figma.com/v1/components/${key}`, {
      method: 'GET',
      headers: {
        'X-FIGMA-TOKEN': this.figmaKey,
      },
    })
    const data = await resp.json()
    return data.meta
  }

  async fetchImage({ file_key, node_id }) {
    const resp = await fetch(
      `https://api.figma.com/v1/images/${file_key}?ids=${node_id}`,
      {
        method: 'GET',
        headers: {
          'X-FIGMA-TOKEN': this.figmaKey,
        },
      },
    )
    const data = await resp.json()
    return data.images[node_id]
  }
}
