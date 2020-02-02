const { getRepos, getCommits, checkoutCommit, createCommit, deleteCommit } = require('./actions')

module.exports.questions = async () => {
    return [
        {
            type: 'list',
            name: 'repo',
            message: 'Choose repository',
            choices: async () => {
                const repos = (await getRepos()).map(x => {
                    return {
                        name: `${x.name} (${x.status})`,
                        value: x.name
                    }
                })

                if (repos.length === 0) {
                    throw new Error('No repositories found')
                }

                return repos
            }
        },
        {
            type: 'list',
            name: 'action',
            message: 'Choose actions',
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
                const commits = (await getCommits(answers)).map(x => {
                    return {
                        name: `${x.message} \n  ${x.date}\n`,
                        value: x.hash
                    }
                })

                if (commits.length === 0) {
                    throw new Error('No commits found')
                }

                return commits
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
