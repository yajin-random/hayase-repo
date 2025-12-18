export default class AbstractSource {
  async search(query) { throw new Error('Not implemented') }
  async latest() { return [] }
}