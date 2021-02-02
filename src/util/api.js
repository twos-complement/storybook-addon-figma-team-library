export default class Api {
  constructor({ figmaKey }) {
    this.figmaKey = figmaKey
  }

  async fetchComponents({ figmaFileId }) {
    // TODO: paginate like a normal person
    const resp = await fetch(
      `https://api.figma.com/v1/files/${figmaFileId}/components?page_size=1000`,
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

  async fetchComponentDetails({ keys }) {
    const components = []

    for (var i = 0; i < keys.length; i++) {
      // Fetch component meta by key:
      const resp = await fetch(
        `https://api.figma.com/v1/components/${keys[i]}`,
        {
          method: 'GET',
          headers: {
            'X-FIGMA-TOKEN': this.figmaKey,
          },
        },
      )
      const data = await resp.json()

      // Use component meta to fetch scaled image:
      const imageSrc = await this.fetchImage({
        file_key: data.meta.file_key,
        node_id: data.meta.node_id,
      })

      components.push({
        ...data.meta,
        imageSrc,
      })
    }

    return components
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
