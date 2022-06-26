import modeOptions from './modeOptions'

function render (mode) {

  switch (mode){
    case 'dark':
    case 'light':
      var script1=document.createElement('script');//创建script标签节点
      script1.setAttribute('type','text/javascript');//设置script类型
      script1.setAttribute('src','https://limeng-blog.oss-cn-hangzhou.aliyuncs.com/sakura.js');//设置js地址
      document.body.appendChild(script1);//将js追加为body的子标签
  }

  const rootElement = document.querySelector(':root')
  const options = modeOptions[mode]
  let temp = 'dark'
  switch (mode){
    case 'dark':
    case 'simple':
    case 'light':
      temp = mode
  }
  // const opposite = mode === 'dark' ? 'light' : 'dark'
  const opposite = temp
  for (const k in options) {
    rootElement.style.setProperty(k, options[k])
  }

  rootElement.classList.remove(opposite)
  rootElement.classList.add(mode)
}

/**
 * Sets a color scheme for the website.
 * If browser supports "prefers-color-scheme", 'auto' mode will respect the setting for light or dark mode
 * otherwise it will set a dark theme during night time
 */
export default function applyMode (mode) {
  if (mode !== 'auto') {
    render(mode)
    return
  }

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  const isSimpleMode = window.matchMedia('(prefers-color-scheme: simple)').matches

  if (isDarkMode) render('dark')
  if (isLightMode) render('light')
  if (isSimpleMode) render('simple')

  if (!isDarkMode && !isLightMode && !isSimpleMode) {
    console.log('You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time.')
    const hour = new Date().getHours()
    if (hour < 6 || hour >= 18) render('dark')
    else render('light')
  }
}
