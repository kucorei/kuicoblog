import prism from "prismjs"
import {escapeHtml} from "../../src/utlis/escape-html"
import loadLanguages from "prismjs/components/index"
import component from "prismjs/components"

function wrap (code, lang) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}

function getLangCodeFromExtension (extension) {
  const extensionMap = {
    vue: 'markup',
    html: 'markup',
    md: 'markdown',
    rb: 'ruby',
    ts: 'typescript',
    py: 'python',
    sh: 'bash',
    yml: 'yaml',
    styl: 'stylus',
    kt: 'kotlin',
    rs: 'rust'
  }

  return extensionMap[extension] || extension
}

export const highlight = (str, lang) => {

  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang

  lang = getLangCodeFromExtension(lang)

  if (!prism.languages[lang]) {
    try {
      // 加载模块中的样式，不然报错
      require('../../node_modules/prismjs/components/prism-'+lang)

    } catch (e) {
      console.log(e)
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}

export default {
  highlight
}
