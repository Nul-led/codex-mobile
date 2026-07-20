import { describe, expect, it } from 'vitest'
import { parseGoalCommand } from './goalCommand'

describe('parseGoalCommand', () => {
  it('ignores ordinary messages and similarly named commands', () => {
    expect(parseGoalCommand('please use /goal later')).toBeNull()
    expect(parseGoalCommand('/goals ship it')).toBeNull()
  })

  it('parses goal lifecycle commands case-insensitively', () => {
    expect(parseGoalCommand('/goal')).toEqual({ action: 'view' })
    expect(parseGoalCommand('/GOAL pause')).toEqual({ action: 'pause' })
    expect(parseGoalCommand('/goal resume')).toEqual({ action: 'resume' })
    expect(parseGoalCommand('/goal clear')).toEqual({ action: 'clear' })
  })

  it('preserves multiline objectives and separates edits from new goals', () => {
    expect(parseGoalCommand('/goal Ship the feature\nwith tests')).toEqual({
      action: 'set',
      objective: 'Ship the feature\nwith tests',
    })
    expect(parseGoalCommand('/goal edit Narrow the scope')).toEqual({
      action: 'edit',
      objective: 'Narrow the scope',
    })
    expect(parseGoalCommand('/goal pause after this turn')).toEqual({
      action: 'set',
      objective: 'pause after this turn',
    })
  })
})
