const USERS = ['makeschool', 'newsycombinator', 'ycombinator'];
const KEY_COLUMN = 'column_';
const TARGET_ID = 'target_id';
const PROXY_URL = 'http://localhost:7890';
const NUMBER_OF_REQUESTED_TWEETS = 6;


document.addEventListener('DOMContentLoaded', (event) => {
    for (let i = 0; i < USERS.length; i++) {
        // const user = localStorage.getItem(KEY_COLUMN + i) || USERS[i];
        const user =  USERS[i];
        const list = initTweetsListHTML(user, null);
        fetchTweets(user, list, (json) => {
            // console.log(json);
            initTweetsListHTML(user, json,i);
        });
    }
    
    // fetchTweets(USERS, (userTweets) => {
    //     initTweetsListHTML(userTweets);
    // });
    
});

function fetchTweets(user_scr_name, list, callback) {
    
    
    const url = `${PROXY_URL}/1.1/statuses/user_timeline.json\?count\=${NUMBER_OF_REQUESTED_TWEETS}\&screen_name\=${user_scr_name}`;
    fetch(url).then(response => {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem fetching the tweets. Response status Code: ${response.status}`);
            return;
        }
        response.json().then(tweetsJson => {
            callback(tweetsJson);
            tweetsJson.forEach(tweetJson => {
                const tweetCard = createTweetHTML(tweetJson);
                list.append(tweetCard);
                // TODO add tweet to IDB for offline use
            });
        })
        
    });
}

function initTweetsListHTML(user_scr_name,  json, i) {
    if(json!=null){
        console.log(json[0].user);
        document.getElementById(user_scr_name).querySelector('.profile-img').src = json[0].user.profile_image_url
       
        const loc = localStorage.getItem(KEY_COLUMN + i) ;
        //  document.getElementById(user_scr_name).setAttribute('grid-item:nth-child', loc)
        document.getElementById(user_scr_name).setAttribute('grid-column', loc)
        document.getElementById(user_scr_name).setAttribute('grid-row', loc)
        return;
    }
//grid-item:nth-child
    const temp = document.getElementById('column_template');
    const clon = temp.content.cloneNode(true);
    
    const div = clon.querySelector('div');
    div.id = user_scr_name;
    div.querySelector('.profile-name').innerHTML = Utils.capitalizeFirstLetter(user_scr_name);
    
    document.getElementById('container').appendChild(div);
    return div.querySelector('ul');
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
    const column_0_id = document.getElementsByClassName('column')[0].id;
    const column_1_id = document.getElementsByClassName('column')[1].id;
    const column_2_id = document.getElementsByClassName('column')[2].id;
    
    localStorage.setItem(KEY_COLUMN + 0, column_0_id);
    localStorage.setItem(KEY_COLUMN + 1, column_1_id);
    localStorage.setItem(KEY_COLUMN + 2, column_2_id);
}