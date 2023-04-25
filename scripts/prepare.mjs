import { exec } from 'child_process';
import {env, stdout} from 'process';

// github actions runner sets CI to true
if (!env.CI) {
  // run only locally
  const prepare = exec("husky install && npm run build");
  prepare.stdout.pipe(stdout);
  prepare.stderr.pipe(stdout);
}
