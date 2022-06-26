import matter from 'gray-matter'
import toml from 'toml'

export default function parseFrontmatter (content) {
  return matter(content, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml)
    }
  })
}
