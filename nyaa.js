import AbstractSource from 'https://raw.githubusercontent.com/yajin-random/hayase-repo/main/abstract.js'

export default new class Nyaa extends AbstractSource {
  url = 'https://nyaa.si'

  async search({ titles }) {
    if (!titles?.length) throw new Error('No titles provided')
    const query = encodeURIComponent(titles[0])
    const res = await fetch(`${this.url}/?f=0&c=1_2&q=${query}`)
    const html = await res.text()

    const results = []
    const regex = /<a href="\/view\/(\d+)" title="([^"]+)"/g
    let match

    while ((match = regex.exec(html)) !== null) {
      results.push({
        title: match[2],
        link: `${this.url}/view/${match[1]}`,
        hash: match[1],
        size: 0,
        type: 'torrent',
        date: new Date(),
        accuracy: 'high'
      })
    }
    return results
  }

  batch = this.search
  movie = this.search
}()