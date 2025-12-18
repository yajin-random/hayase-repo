import AbstractSource from 'https://raw.githubusercontent.com/yajin-random/hayase-repo/main/abstract.js'

export default new class AnimeToshoNZB extends AbstractSource {
  url = 'https://animetosho.org/api/search'

  async search({ titles }) {
    if (!titles?.length) throw new Error('No titles provided')
    
    const query = encodeURIComponent(titles[0])
    // mode=json ensures we get a machine-readable response
    const res = await fetch(`${this.url}?q=${query}&mode=json`)
    const data = await res.json()

    // Filter for entries that have an NZB link and map to Hayase format
    return data
      .filter(item => item.nzb_url) 
      .map(item => ({
        title: item.title,
        link: item.nzb_url, // Link points to the NZB file
        size: item.total_size,
        type: 'nzb', // Explicitly set as nzb for Hayase
        date: new Date(item.timestamp * 1000),
        accuracy: 'high'
      }))
  }

  batch = this.search
  movie = this.search

  async test() {
    const res = await fetch('https://animetosho.org/api/search?q=test&mode=json')
    return res.ok
  }
}()