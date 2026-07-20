export type GoalCommand =
  | { action: 'view' }
  | { action: 'set'; objective: string }
  | { action: 'edit'; objective: string }
  | { action: 'pause' }
  | { action: 'resume' }
  | { action: 'clear' }

export function parseGoalCommand(value: string): GoalCommand | null {
  const match = value.trim().match(/^\/goal(?:\s+([\s\S]*))?$/iu)
  if (!match) return null

  const argument = (match[1] ?? '').trim()
  if (!argument) return { action: 'view' }

  const subcommand = argument.match(/^(edit|pause|resume|clear)(?:\s+([\s\S]*))?$/iu)
  if (!subcommand) return { action: 'set', objective: argument }

  const action = subcommand[1].toLowerCase()
  const remainder = (subcommand[2] ?? '').trim()
  if (action === 'edit') return { action: 'edit', objective: remainder }
  if (remainder) return { action: 'set', objective: argument }
  if (action === 'pause') return { action: 'pause' }
  if (action === 'resume') return { action: 'resume' }
  return { action: 'clear' }
}
