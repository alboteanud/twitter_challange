const USERS = ['makeschool', 'newsycombinator', 'ycombinator'];
const KEY_COLUMN = 'column_';
const TARGET_ID = 'target_id';

document.addEventListener('DOMContentLoaded', (event) => {
    for (let i = 0; i < USERS.length; i++) {
        const user = localStorage.getItem(KEY_COLUMN + i) || USERS[i];
        fetchTweets(user);
    }

});

function fetchTweets(user) {
    const list = createNewListHTML(user);
    const url = `http://localhost:7890/1.1/statuses/user_timeline.json\?count\=4\&screen_name\=${user}`;
    fetch(url).then(response => {
        if (response.status !== 200) {
            console.log('Looks like there was a problem fetching the tweets. Response status Code: ' + response.status);
            return;
        }
        response.json().then(tweetsJson => {

            tweetsJson.forEach(tweetJson => {
                const tweetCard = createTweetCardHTML(tweetJson);
                list.append(tweetCard);
            });
        })

    });
}

function createNewListHTML(user) {
    const container = document.getElementsByClassName('flex-container')[0];
    const temp = container.querySelector('template');
    const clon = temp.content.cloneNode(true);

    const column = clon.querySelector('div');
    column.id = user;

    const list = document.createElement('ul');
   
    list.textContent = user;
    column.appendChild(list);
    container.appendChild(column);
    return list;
}

function createTweetCardHTML(tweetJson) {
    const li = document.createElement('li');

    const text = document.createElement('p');
    text.innerHTML = tweetJson.text;
    li.append(text);

    const date = document.createElement('p');
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const lang = window.navigator.userLanguage || window.navigator.language;
    date.innerHTML = new Date(tweetJson.created_at).toLocaleDateString(lang, options);
    li.append(date);

    const linkToTweet = document.createElement('a');
    linkToTweet.text = 'Go to tweet';
    linkToTweet.href = `https://twitter.com/${tweetJson.user.id_str}/status/${tweetJson.id_str}`;
    li.append(linkToTweet);

    li.append(document.createElement('br'));

    const linkRetweet = document.createElement('a');
    linkRetweet.text = 'Retweet';
    linkRetweet.href = `https://twitter.com/intent/retweet?tweet_id=${tweetJson.id_str}&related=${tweetJson.user.screen_name}`;
    li.append(linkRetweet);

    return li;
}

function handleDragStart(ev) {
    ev.dataTransfer.setData(TARGET_ID, ev.target.id);
}

function handleDragOver(ev) {
    ev.preventDefault();
}

function handleDrop(ev) {
    ev.preventDefault();
    const drag_list_id = ev.dataTransfer.getData(TARGET_ID);
    const drag_list = document.getElementById(drag_list_id);

    const tmp = document.createElement('span');
    tmp.className = 'hide';

    ev.currentTarget.before(tmp);
    drag_list.before(ev.currentTarget);
    tmp.replaceWith(drag_list);

    saveColumnsOrder();
}

function saveColumnsOrder() {
    const column_0 = document.getElementsByClassName('column')[0];
    const column_1 = document.getElementsByClassName('column')[1];
    const column_2 = document.getElementsByClassName('column')[2];

    localStorage.setItem(KEY_COLUMN + 0, column_0.id);
    localStorage.setItem(KEY_COLUMN + 1, column_1.id);
    localStorage.setItem(KEY_COLUMN + 2, column_2.id);
}