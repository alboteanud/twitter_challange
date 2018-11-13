const USERS = ['makeschool', 'newsycombinator', 'ycombinator'];
const NUMBER_OF_REQUESTED_TWEETS = 6;
const KEY_COLUMN = 'column_';
const TARGET_ID = 'target_id';
const PROXY_URL = 'http://localhost:7890';
const USER_TIMELIN_URL = `${PROXY_URL}/1.1/statuses/user_timeline.json\?count\=${NUMBER_OF_REQUESTED_TWEETS}\&screen_name\=`;

document.addEventListener('DOMContentLoaded', (event) => {
    USERS.forEach(user => fetchTweets(user, (user, tweets) => setTweetsList(user, tweets)))
});

function fetchTweets(user, callback) {
    const url = USER_TIMELIN_URL+ user;
    // console.log('getting tweets from ' + url);
    fetch(url).then(response => {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem fetching the tweets. Response status Code: ${response.status}`);
            return;
        }
        response.json().then(tweetsJson => callback(user, tweetsJson));
    });
}

function setTweetsList(user, tweets) {
    const temp = document.getElementById('column_template');
    const clon = temp.content.cloneNode(true);
    const column = clon.querySelector('div');

    column.id = user;
    document.getElementById('container').appendChild(column);

    const orderClassName = localStorage.getItem(user) || 
        `column${USERS.indexOf(user) + 1}`; // default class to order columns: column1, column2, column3
    column.classList.add(orderClassName);

    column.querySelector('.profile-img').src = tweets[0].user.profile_image_url;
    column.querySelector('.profile-name').innerHTML = Utils.capitalizeFirstLetter(user);

    const list = column.querySelector('ul');
    tweets.forEach(tweet => {
        const tweetCard = createTweetHTML(tweet);
        list.append(tweetCard);
        // TODO add tweet to IDB for offline use
    });

}

function createTweetHTML(tweetJson) {

    const temp = document.getElementById('tweet_card_template');
    const clon = temp.content.cloneNode(true);
    const li = clon.querySelector('li');

    li.querySelector('.tweet_text').innerHTML = Utils.pimpText(tweetJson.text);
    li.querySelector('.tweet_date').innerHTML = Utils.getFormatedDate(tweetJson.created_at);
    li.querySelector('.tweet_link').href = `https://twitter.com/${tweetJson.user.id_str}/status/${tweetJson.id_str}`;
    li.querySelector('.tweet_retweet').href = `https://twitter.com/intent/retweet?tweet_id=${tweetJson.id_str}&related=${tweetJson.user.screen_name}`;

    return li;
}

function handleDragStart(ev) {
    ev.dataTransfer.setData(TARGET_ID, ev.target.id);
    // console.log(ev.target.id);
}

function handleDragOver(ev) {
    ev.preventDefault();
}

function handleDrop(ev) {
    ev.preventDefault();
    const dragged_id = ev.dataTransfer.getData(TARGET_ID);
    const dragged_column = document.getElementById(dragged_id);

    const dragged_class = dragged_column.classList[1];
    const target_class = ev.currentTarget.classList[1];

    dragged_column.classList.remove(dragged_class);
    dragged_column.classList.add(target_class);

    ev.currentTarget.classList.remove(target_class);
    ev.currentTarget.classList.add(dragged_class);

    localStorage.setItem(dragged_id, target_class);
    localStorage.setItem(ev.currentTarget.id, dragged_class);

}