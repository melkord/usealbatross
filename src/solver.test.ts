import { describe, it, expect } from 'vitest'
import { solveQuadratic, formatNumber } from './solver'

describe('solveQuadratic', () => {
  describe('two real solutions (discriminant > 0)', () => {
    it('solves x² - 5x + 6 = 0 → x = 3, x = 2', () => {
      const result = solveQuadratic(1, -5, 6)
      expect(result.type).toBe('two-real')
      expect(result.x1).toBe(3)
      expect(result.x2).toBe(2)
    })

    it('solves x² - 1 = 0 → x = 1, x = -1', () => {
      const result = solveQuadratic(1, 0, -1)
      expect(result.type).toBe('two-real')
      expect(result.x1).toBe(1)
      expect(result.x2).toBe(-1)
    })

    it('solves 2x² - 7x + 3 = 0 → x = 3, x = 0.5', () => {
      const result = solveQuadratic(2, -7, 3)
      expect(result.type).toBe('two-real')
      expect(result.x1).toBe(3)
      expect(result.x2).toBe(0.5)
    })
  })

  describe('one real solution (discriminant = 0)', () => {
    it('solves x² - 2x + 1 = 0 → x = 1', () => {
      const result = solveQuadratic(1, -2, 1)
      expect(result.type).toBe('one-real')
      expect(result.x1).toBe(1)
      expect(result.x2).toBeUndefined()
    })

    it('solves x² = 0 → x = 0', () => {
      const result = solveQuadratic(1, 0, 0)
      expect(result.type).toBe('one-real')
      expect(result.x1).toBeCloseTo(0)
    })
  })

  describe('no real solutions (discriminant < 0)', () => {
    it('solves x² + 1 = 0 → no real roots', () => {
      const result = solveQuadratic(1, 0, 1)
      expect(result.type).toBe('no-real')
      expect(result.x1).toBeUndefined()
      expect(result.x2).toBeUndefined()
      expect(result.message).toContain('Complex roots')
    })

    it('solves x² + x + 1 = 0 → no real roots', () => {
      const result = solveQuadratic(1, 1, 1)
      expect(result.type).toBe('no-real')
    })
  })

  describe('edge cases (a = 0)', () => {
    it('handles linear equation: 2x + 4 = 0 → x = -2', () => {
      const result = solveQuadratic(0, 2, 4)
      expect(result.type).toBe('one-real')
      expect(result.x1).toBe(-2)
      expect(result.message).toContain('Linear')
    })

    it('handles 0 = 0 → infinite solutions', () => {
      const result = solveQuadratic(0, 0, 0)
      expect(result.type).toBe('infinite')
    })

    it('handles 0 = 5 → no solution', () => {
      const result = solveQuadratic(0, 0, 5)
      expect(result.type).toBe('no-solution')
    })
  })

  describe('negative a coefficient', () => {
    it('solves -x² + 4 = 0 → x = 2, x = -2', () => {
      const result = solveQuadratic(-1, 0, 4)
      expect(result.type).toBe('two-real')
      expect(result.x1).toBe(-2)
      expect(result.x2).toBe(2)
    })
  })
})

describe('formatNumber', () => {
  it('formats integers without decimals', () => {
    expect(formatNumber(5)).toBe('5')
    expect(formatNumber(-3)).toBe('-3')
    expect(formatNumber(0)).toBe('0')
  })

  it('formats decimals to 4 places', () => {
    expect(formatNumber(1.23456789)).toBe('1.2346')
    expect(formatNumber(0.1)).toBe('0.1000')
  })
})
