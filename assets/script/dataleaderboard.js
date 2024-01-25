// dataleaderboard.js

var leaderboardData = [
    {
        imgSrc: '//source.unsplash.com/random/100x100/?tech',
        userName: 'Example Name',
        socialLink: 'social link 1',
        points: 400,
        userDesc: 'Completed Phase 3',
        taskCounter: '2 / 3'
    },
    {
        imgSrc: '//source.unsplash.com/random/100x100/?nature',
        userName: 'Example Long Name',
        socialLink: 'social link 2',
        points: 220,
        userDesc: 'Phase 1',
        taskCounter: '2 / 3'
    },
    // Add more data as needed
];

// Export the data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { leaderboardData };
}
