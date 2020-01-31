const { getRepos, getCommits, checkoutCommit, createCommit, deleteCommit } = require('./actions')

module.exports.questions = async () => {
    return [
        {
            type: 'list',
            name: 'repo',
            message: 'Choose repository',
            choices: async () => {
                return (await getRepos()).map(x => {
                    return { 
                        name: `${x.name} ${x.status}`, 
                        value: x.name 
                    }
                })
            }
        },
        {
            type: 'list',
            name: 'action',
            message: 'Choose repository',
            choices: [
                {name: 'Checkout commit', value: checkoutCommit},
                {name: 'Create commit', value: createCommit},
                {name: 'Delete commit', value: deleteCommit},
            ]
        },
        {
            type: 'list',
            name: 'commit',
            message: 'Choose commit',
            pageSize: 20,
            choices: async (answers) => {
                return (await getCommits(answers)).map(x => {
                    return { 
                        name: `${x.message} \n  ${x.date}\n`, 
                        value: x.hash 
                    }
                })
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
