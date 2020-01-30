const { listRepos, listCommits } = require('./titan')

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
            name: 'commit',
            message: 'Choose commit',
            choices: async (answers) => {
                return await listCommits(answers.repo)
            }
        },
    ]
}
