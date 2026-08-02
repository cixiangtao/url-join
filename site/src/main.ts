import { urlJoin, type QueryParams, type QueryValue, type UrlJoinOptions } from '../../src/index'
import './style.css'

const INSTALL_COMMAND = 'pnpm add @anys/url-join'
const getElement = <T extends Element>(selector: string): T => {
  const element = document.querySelector<T>(selector)
  if (!element) throw new Error(`Missing element: ${selector}`)
  return element
}

const segmentList = getElement<HTMLDivElement>('#segment-list')
const queryInput = getElement<HTMLTextAreaElement>('#query-input')
const queryMessage = getElement<HTMLParagraphElement>('#query-message')
const normalizeInput = getElement<HTMLInputElement>('#normalize-input')
const trailingInput = getElement<HTMLInputElement>('#trailing-input')
const resultOutput = getElement<HTMLOutputElement>('#result-output')
const codeOutput = getElement<HTMLElement>('#code-output')
const toast = getElement<HTMLDivElement>('#toast')
const segments = ['https://api.example.com/', '/v1/', 'users', '123']
let currentResult = ''
let toastTimer: number | undefined

const icons = {
  grip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01" /></svg>',
  remove: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /></svg>'
}

const showToast = (message: string): void => {
  window.clearTimeout(toastTimer)
  toast.textContent = message
  toast.classList.add('is-visible')
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400)
}

const copyText = async (text: string, confirmation: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    showToast(confirmation)
  } catch {
    showToast('Copy failed — select the text manually')
  }
}

const isQueryValue = (value: unknown): value is QueryValue | QueryValue[] => {
  if (value === null || ['string', 'number', 'boolean', 'undefined'].includes(typeof value)) return true
  return Array.isArray(value) && value.every(item => isQueryValue(item) && !Array.isArray(item))
}

const parseQuery = (): QueryParams | undefined => {
  const source = queryInput.value.trim()
  queryInput.removeAttribute('aria-invalid')
  queryMessage.classList.remove('is-error')
  if (!source) {
    queryMessage.textContent = 'No query parameters will be added.'
    return undefined
  }
  try {
    const value: unknown = JSON.parse(source)
    if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new TypeError('Enter a JSON object, for example {"page":1}.')
    if (!Object.values(value).every(isQueryValue)) throw new TypeError('Values must be scalars or arrays of scalar values.')
    queryMessage.textContent = 'Valid JSON · output updated instantly.'
    return value as QueryParams
  } catch (error) {
    queryInput.setAttribute('aria-invalid', 'true')
    queryMessage.classList.add('is-error')
    queryMessage.textContent = error instanceof TypeError ? error.message : 'Enter valid JSON, for example {"page":1}.'
    return undefined
  }
}

const buildCode = (query: QueryParams | undefined, options: UrlJoinOptions): string => {
  const formatted = segments.filter(Boolean).map(segment => JSON.stringify(segment))
  const optionLines = [`  normalize: ${String(options.normalize)}`, `  trailingSlash: ${String(options.trailingSlash)}`]
  if (query) optionLines.push(`  query: ${JSON.stringify(query)}`)
  return `import { urlJoin } from '@anys/url-join'\n\nconst url = urlJoin(\n  ${formatted.join(',\n  ')},\n  {\n${optionLines.join(',\n')}\n  }\n)\n\n// ${currentResult}`
}

const updateResult = (): void => {
  const query = parseQuery()
  const options: UrlJoinOptions = { normalize: normalizeInput.checked, trailingSlash: trailingInput.checked, ...(query ? { query } : {}) }
  currentResult = urlJoin(...segments, options)
  resultOutput.textContent = currentResult || '(empty string)'
  codeOutput.textContent = buildCode(query, options)
}

const renderSegments = (): void => {
  segmentList.replaceChildren()
  segments.forEach((segment, index) => {
    const row = document.createElement('div')
    row.className = 'segment-row'
    row.innerHTML = `${icons.grip}<label for="segment-${index}">Segment ${index + 1}</label><input id="segment-${index}" type="text" autocomplete="off" /><button type="button" aria-label="Remove segment ${index + 1}">${icons.remove}</button>`
    const input = row.querySelector<HTMLInputElement>('input')
    const removeButton = row.querySelector<HTMLButtonElement>('button')
    if (!input || !removeButton) return
    input.value = segment
    input.addEventListener('input', () => { segments[index] = input.value; updateResult() })
    removeButton.addEventListener('click', () => { segments.splice(index, 1); renderSegments(); updateResult() })
    segmentList.append(row)
  })
}

getElement<HTMLButtonElement>('#add-segment').addEventListener('click', () => {
  segments.push('')
  renderSegments()
  segmentList.querySelector<HTMLInputElement>('.segment-row:last-child input')?.focus()
})
getElement<HTMLFormElement>('#playground-form').addEventListener('submit', event => event.preventDefault())
queryInput.addEventListener('input', updateResult)
normalizeInput.addEventListener('change', updateResult)
trailingInput.addEventListener('change', updateResult)
getElement<HTMLButtonElement>('#copy-result').addEventListener('click', () => void copyText(currentResult, 'URL copied'))
for (const selector of ['#copy-install', '#copy-install-bottom']) {
  getElement<HTMLButtonElement>(selector).addEventListener('click', () => void copyText(INSTALL_COMMAND, 'Install command copied'))
}
renderSegments()
updateResult()
