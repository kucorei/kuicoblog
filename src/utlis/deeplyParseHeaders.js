import compose from './compose'
import {parseHeadersCompose} from './parseHeaders'
function removeNonCodeWrappedHTML (str) {
    return String(str).replace(/(^|[^><`\\])<.*>([^><`]|$)/g, '$1$2')
}
const deeplyParseHeaders = compose(
    removeNonCodeWrappedHTML,
    parseHeadersCompose
)
export default deeplyParseHeaders

