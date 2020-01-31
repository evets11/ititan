#!/usr/bin/env node

const { prompt } = require('inquirer')
const { questions } = require('./questions')

async function run() {
  const answers = await prompt(await questions());
  const result = await answers.action(answers)
  console.info(result)
}

run()
