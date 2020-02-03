#!/usr/bin/env node

const { prompt } = require('inquirer')
const { questions } = require('./questions')

function confirmed(answers) {
  return !answers.hasOwnProperty('confirm') || answers.confirm === true;
}

async function run() {
  try {
    const answers = await prompt(await questions());
    if (confirmed(answers)) {
      const result = await answers.action(answers)
      console.info(result)
    }
  } catch (e) {
    e.hasOwnProperty('stdout') ?
      console.error(e.stdout) :
      console.error(e.message)
    process.exit(1)
  }
}

run()
