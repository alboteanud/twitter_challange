class Utils {
    
    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static getFormatedDate(dateString) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        const lang = window.navigator.userLanguage || window.navigator.language;
        return new Date(dateString).toLocaleDateString(lang, options)
    }
    
    static urlify(text) {
        const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return text.replace(urlRegex, '<a href="$1">$1</a>');
    }

    static removeUrlToTweet(text) {
        const urlToTweet = /(((https?:\/\/t\.co\/))[^\s]+)/g;
        return text.replace(urlToTweet, '');
    }

    static pimpText(text) {
        const prunedText = Utils.removeUrlToTweet(text);
        const result = Utils.urlify(prunedText);
        return result;
    }
}