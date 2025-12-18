import AbstractSource from './abstract.js'

export default new class Seadex extends AbstractSource {
  url = 'https://releases.moe/api/v1/entries'

  async search({ titles }) {
    const res = await fetch(this.url)
    const data = await res.json()
    const searchTitle = titles[0].toLowerCase()

    // Filtering SeaDex entries for matching titles
    return data.filter(entry => entry.title.toLowerCase().includes(searchTitle))
      .map(entry => ({
        title: entry.title,
        link: entry.comparison || '',
        type: 'torrent',
        accuracy: 'high'
      }))
  }
}()