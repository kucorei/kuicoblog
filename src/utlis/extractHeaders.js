import LRU from 'lru-cache'
import deeplyParseHeaders from './deeplyParseHeaders'

/**
 * Extract headers from markdown source content.
 *
 * @param {string} content
 * @param {array} include
 * @param {object} md
 * @returns {array}
 */

const cache = new LRU({ max: 1000 })

function functionextractHeaders (content, include= [], md) {
  const key = content + include.join(',')
  const hit = cache.get(key)
  if (hit) {
    return hit
  }

  const tokens = md.parse(content, {})
  const res = []
  tokens.forEach((t, i) => {
    if (t.type === 'heading_open' && include.includes(t.tag)) {
      const _title = tokens[i + 1].content
      const slug = t.attrs.find(([name]) => name === 'id')[1]
      const title = deeplyParseHeaders(_title)
      // 有一定的可能会把md上方的标题信息解析进去,要排除掉
      if(title.indexOf("\n")===-1){
        res.push({
          level: parseInt(t.tag.slice(1), 10),
          title: title,
          slug: slug || md.slugify(_title)
        })
      }

    }
  })

  cache.set(key, res)
  return res
}
export default functionextractHeaders
