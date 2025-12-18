import AbstractSource from './abstract.js'

export default new class AnimeTosho extends AbstractSource {
  url = 'https://animetosho.org/api/search'

  async search({ titles }) {
    const query = encodeURIComponent(titles[0])
    const res = await fetch(`${this.url}?q=${query}&mode=json`)
    const data = await res.json()

    return data.map(item => ({
      title: item.title,
      link: item.link,
      hash: item.info_hash,
      size: item.total_size,
      type: 'torrent',
      date: new Date(item.timestamp * 1000),
      seeders: item.seeders,
      leechers: item.leechers
    }))
  }

  batch = this.search
}()