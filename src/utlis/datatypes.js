

export const isObject = (obj) => obj !== null && typeof obj === 'object'

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString

const getObjectType = (x) => _toString.call(x).slice(8, -1)
const isOfType = (type) => (x) => typeof x === type // eslint-disable-line valid-typeof
const isObjectOfType = (type) => (x) => getObjectType(x) === type

export const isFunction = isOfType('function')
export const isString = isOfType('string')
export const isBoolean = isOfType('boolean')
export const isPlainObject = isObjectOfType('Object')
export const isUndefined = isOfType('undefined')
export const isNull = (x) => x === null
export const isNullOrUndefined = (x) => isUndefined(x) || isNull(x)

export const toRawType = (value) => _toString.call(value).slice(8, -1)
export const getType = function (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

/**
 * Transform multi-types to natural language. e.g.
 *   ['Function']                     => 'Function'
 *   ['Function', 'Object']           => 'Function or Object'
 *   ['Function', 'Object', 'Number'] => 'Function, Object or Number'
 */

function toNaturalMultiTypesLanguage (types) {
  const len = types.length
  if (len === 1) {
    return types.join('')
  }
  const rest = types.slice(0, len - 1)
  const last = types[len - 1]
  return rest.join(', ') + ' or ' + last
}

export function assertTypes (value, types) {
  let valid
  let warnMsg
  let actualType = toRawType(value)
  const expectedTypes = []
  if (actualType === 'AsyncFunction') {
    actualType = 'Function'
  }

  for (const type of types) {
    const expectedType = getType(type)
    expectedTypes.push(expectedType)
    valid = actualType === expectedType
    if (valid) break
  }

  if (!valid) {
    warnMsg
      = `expected a ${toNaturalMultiTypesLanguage(expectedTypes)} `
      + `but got ${actualType}.`
  }

  return { valid, warnMsg }
}
