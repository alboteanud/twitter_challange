
const url = 'http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool';

fetch(url).then(response => {
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +  response.status);
        return;
    }
    response.json().then(json => {
        console.log(json[0]);
        
        const ul = document.getElementById('list');
        ul.innerHTML = '';
        
        json.forEach(tweet => {
            ul.append(createTweetCardHTML(tweet)) ;
        });
    })
    
    
});

createTweetCardHTML = (tweet) => {
    const li = document.createElement('li');
    
    const text = document.createElement('p');
    text.innerHTML = tweet.text;
    li.append(text);
    
    const date = document.createElement('p');
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var lang = window.navigator.userLanguage || window.navigator.language;
    date.innerHTML = new Date(tweet.created_at).toLocaleDateString(lang, options);
    li.append(date);
    
    const linkToTweet = document.createElement('a');
    linkToTweet.text = 'link to tweet';
    linkToTweet.href = `https://twitter.com/${tweet.user.id_str}/status/${tweet.id_str}`;  
    li.append(linkToTweet);
    
// retweet https://twitter.com/intent/retweet?tweet_id=463440424141459456&related=twitterapi,twittermedia,twitter,support
    const linkRetweet = document.createElement('a');
    linkRetweet.text = 'retweet';
    linkRetweet.href = `https://twitter.com/intent/retweet?tweet_id=${tweet.id_str}&related=${tweet.user.screen_name}`;  
    li.append(linkRetweet);

    return li;
}