'user strict';
const userNameInput = document.getElementById('user-name');
const regionButton = document.getElementById('region');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

regionButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
    }

    // TODO 診断結果表示エリアの作成
    resultDivision.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivision.appendChild(header);

    const paragraph = document.createElement('p');
    const result = region(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    // TODO ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたの住むところ') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたの住むところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
        regionButton.onclick();
    }
};

const answers = [
    '###userName###の将来住むところは、北海道・東北地方です。',
    '###userName###の将来住むところは、関東地方です。',
    '###userName###の将来住むところは、北陸地方です。',
    '###userName###の将来住むところは、東海地方です。',
    '###userName###の将来住むところは、近畿地方です。',
    '###userName###の将来住むところは、中国地方です。',
    '###userName###の将来住むところは、四国地方です。',
    '###userName###の将来住むところは、九州地方です。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザの名前
 * @return{string} 診断結果
 */
function region(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    // TODO ###userName### をユーザの名前に置き換える
    result = result.replaceAll('###userName###', userName);
    return result;
}
