import './style.css'
import { solveQuadratic, formatNumber } from './solver'
import type { QuadraticResult } from './solver'

function renderResult(result: QuadraticResult): string {
  let html = `<div class="result-content">`
  html += `<p class="result-type">${result.message}</p>`

  if (result.x1 !== undefined) {
    html += `<p class="solution">x₁ = <strong>${formatNumber(result.x1)}</strong></p>`
  }
  if (result.x2 !== undefined) {
    html += `<p class="solution">x₂ = <strong>${formatNumber(result.x2)}</strong></p>`
  }

  html += `</div>`
  return html
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Quadratic Equation Solver</h1>
    <p class="equation">ax² + bx + c = 0</p>

    <form id="solver-form">
      <div class="inputs">
        <div class="input-group">
          <label for="a">a</label>
          <input type="number" id="a" step="any" required value="1" />
        </div>
        <div class="input-group">
          <label for="b">b</label>
          <input type="number" id="b" step="any" required value="0" />
        </div>
        <div class="input-group">
          <label for="c">c</label>
          <input type="number" id="c" step="any" required value="0" />
        </div>
      </div>
      <button type="submit">Solve</button>
    </form>

    <div id="result" class="result hidden"></div>
  </div>
`

const form = document.getElementById('solver-form') as HTMLFormElement
const resultDiv = document.getElementById('result') as HTMLDivElement
const inputA = document.getElementById('a') as HTMLInputElement
const inputB = document.getElementById('b') as HTMLInputElement
const inputC = document.getElementById('c') as HTMLInputElement

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const a = parseFloat(inputA.value)
  const b = parseFloat(inputB.value)
  const c = parseFloat(inputC.value)

  const result = solveQuadratic(a, b, c)

  resultDiv.innerHTML = renderResult(result)
  resultDiv.classList.remove('hidden')
  resultDiv.className = `result ${result.type}`
})
