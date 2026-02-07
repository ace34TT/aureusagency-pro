import * as migration_20260207_200127_fix_layout from './20260207_200127_fix_layout';

export const migrations = [
  {
    up: migration_20260207_200127_fix_layout.up,
    down: migration_20260207_200127_fix_layout.down,
    name: '20260207_200127_fix_layout'
  },
];
