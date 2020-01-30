#!/usr/bin/env node

const { prompt } = require('inquirer')
const { checkout } = require('./titan')
const { questions } = require('./questions')

async function run() {
  const answers = await prompt(await questions());
  const result = await checkout(answers.repo, answers.commit)
  console.info(result)
}

run()
