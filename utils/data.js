const usernames = [
    'lernantino',
    'user2',
    'user3',
    'user4',
    'user5',
    'user6',
    'user7',
    'user8',
    'user9',
    'user10',
    'user11',
    'user12',
];

// const emails = [
//     'lernantino@outlook.com',
//     'user2@gmail.com',
//     'user3@hotmail.com',
//     'user4@yahoo.com',
//     'user5@aol.com',
//     'user6@txstate.edu',
//     'user7@ut.edu',
//     'user8@gmail.com',  
//     'user9@outlook.com',
//     'user10@yahoo.com',
//     'user11@aol.com',
//     'user12@hotmail.com',
// ];

const possibleReactions = [
    'heart',
    'like',
    'laughing',
    'surprised',
    'sad',
    'angry',
];

// const users = [];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = () => 
    '${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}';

const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: `Thought number ${i + 1}`,
            username: getRandomUsername(),
            createdAt,
            reactions: [
                {
                    reaction: getRandomArrItem(possibleReactions),
                },
            ],
        });
    }
    return results;
}

module.exports = { getRandomUsername, getRandomThoughts };