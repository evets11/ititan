#!/usr/bin/env node

const { prompt } = require('inquirer')
const { questions } = require('./questions')

async function run() {
  try {
    const answers = await prompt(await questions());
    const result = await answers.action(answers)
    console.info(result)
  } catch (e) {
    e.hasOwnProperty('stdout') ?
      console.error(e.stdout) :
      console.error(e)
  }
}

run()
