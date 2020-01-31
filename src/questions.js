const { listRepos, listCommits, checkoutCommit, createCommit, deleteCommit } = require('./actions')

module.exports.questions = async () => {
    return [
        {
            type: 'list',
            name: 'repo',
            message: 'Choose repository',
            choices: async () => {
                return await listRepos()
            }
        },
        {
            type: 'list',
            name: 'action',
            message: 'Choose repository',
            choices: [
                {name: 'List commits', value: listCommits},
                {name: 'Checkout commit', value: checkoutCommit},
                {name: 'Create commit', value: createCommit},
                {name: 'Delete commit', value: deleteCommit},
            ]
        },
        {
            type: 'list',
            name: 'commit',
            message: 'Choose commit',
            choices: async (answers) => {
                return await listCommits(answers)
            },
            when: (answers) => answers.action === checkoutCommit || answers.action === deleteCommit
        },
        {
            type: 'input',
            name: 'commit_message',
            message: 'Enter commit message',
            when: (answers) => answers.action === createCommit
        },
    ]
}
