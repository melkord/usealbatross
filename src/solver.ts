export interface QuadraticResult {
  type: 'two-real' | 'one-real' | 'no-real' | 'infinite' | 'no-solution'
  x1?: number
  x2?: number
  message: string
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  // Edge case: a = 0 (not a quadratic equation)
  if (a === 0) {
    if (b === 0) {
      if (c === 0) {
        return { type: 'infinite', message: 'Infinite solutions (0 = 0)' }
      }
      return { type: 'no-solution', message: 'No solution (equation is invalid)' }
    }
    // Linear equation: bx + c = 0
    const x = -c / b
    return { type: 'one-real', x1: x, message: `Linear equation. x = ${x}` }
  }

  const discriminant = b * b - 4 * a * c

  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
    return {
      type: 'two-real',
      x1,
      x2,
      message: 'Two real solutions'
    }
  } else if (discriminant === 0) {
    const x = -b / (2 * a)
    return {
      type: 'one-real',
      x1: x,
      message: 'One real solution (repeated root)'
    }
  } else {
    const realPart = -b / (2 * a)
    const imaginaryPart = Math.sqrt(-discriminant) / (2 * a)
    return {
      type: 'no-real',
      message: `No real solutions. Complex roots: ${realPart.toFixed(4)} ± ${imaginaryPart.toFixed(4)}i`
    }
  }
}

export function formatNumber(n: number): string {
  return Number.isInteger(n) ? n.toString() : n.toFixed(4)
}
