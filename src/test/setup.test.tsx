import { describe, test, expect } from 'vitest'

describe('Project Setup Tests', () => {
  test('README contains project information', () => {
    // This test verifies our README improvements
    const fs = require('fs')
    const path = require('path')
    const readmePath = path.join(__dirname, '../../README.md')
    const readmeContent = fs.readFileSync(readmePath, 'utf8')
    
    expect(readmeContent).toContain('Bombay Taxi Company')
    expect(readmeContent).toContain('React 18 + TypeScript')
    expect(readmeContent).toContain('Vite')
    expect(readmeContent).toContain('Features')
  })

  test('CI configuration uses pnpm', () => {
    // This test verifies our CI/CD fix
    const fs = require('fs')
    const path = require('path')
    const ciPath = path.join(__dirname, '../../.github/workflows/ci.yml')
    const ciContent = fs.readFileSync(ciPath, 'utf8')
    
    expect(ciContent).toContain('pnpm install')
    expect(ciContent).toContain('pnpm/action-setup')
    expect(ciContent).toContain("cache: 'pnpm'")
  })
})
