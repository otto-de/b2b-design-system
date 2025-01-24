const { exec } = require('child_process');

const stencilTestCommand = 'npm run test --workspace=@otto-de/b2b-core-components';

exec(stencilTestCommand, (error, stdout, stderr) => {
  console.log('abcd');
  console.log(stdout);
  console.error(stderr);


  const hasFailures = /FAILED|FAILURE|FAILURES|Error/i.test(stdout) || /FAILED|FAILURE|FAILURES|Error/i.test(stderr);

  if (hasFailures) {
    console.error('Test failures detected!');
    process.exit(1);
  } else if (error) {
    console.error('Test command execution failed!');
    console.error(error.message);
    process.exit(1);
  } else {
    console.log('All tests passed successfully!');
    process.exit(0);
  }
});
