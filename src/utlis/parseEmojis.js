import emojiData from 'markdown-it-emoji/lib/data/full.json'

export default (str) => {
  return String(str).replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
}
