
'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    // 占い結果表示エリアの作成
    resultDivision.innerText = '';

    // headerDivision の作成
// headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header');
    headerDivision.style.backgroundColor = '#b58bd9';
    headerDivision.style.color = '#ffffff';
    headerDivision.innerText = '✨占い結果✨';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://x.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('今日の運勢占い') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #今日の運勢占い';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
);

// 今日の運勢コメント
const answers = [
  '###userName###さんの今日は最高の一日になりそうです！新しいことに挑戦すると、思わぬ幸運が訪れるかもしれません。',
  '###userName###さんは今日は落ち着いて過ごすのがおすすめです。焦らず自分のペースを大切にしましょう。',
  '###userName###さんは今日は人との交流に幸運があります。身近な人との会話を楽しんでみましょう。',
  '###userName###さんは今日は努力が実を結ぶ日です。今まで頑張ってきたことに良い結果が期待できそうです。',
  '###userName###さんは今日は小さな幸せを見つけられる日です。何気ない日常にも目を向けてみましょう。',
  '###userName###さんは今日は少し慎重に行動すると良さそうです。大切な決断は焦らず考えてみましょう。',
  '###userName###さんは今日は新しい発見がありそうです。いつもとは違うことに目を向けてみましょう。',
  '###userName###さんは今日は自分の好きなことに時間を使うと運気が上がりそうです。',
  '###userName###さんは今日は周りの人への感謝を忘れずに。思いやりが幸運を呼び込みます。',
  '###userName###さんは今日は思い切った行動が吉。迷っていることがあれば、一歩踏み出してみましょう。',
  '###userName###さんは今日はゆっくり休むことが大切です。無理をせず、自分をいたわりましょう。',
  '###userName###さんは今日は新しいことを始めるのに良い日です。興味のあることに挑戦してみましょう。',
  '###userName###さんに今日は嬉しい知らせが届くかもしれません。周りの変化に注目してみましょう。',
  '###userName###さんは今日は自分の考えを大切にすると良いでしょう。自信を持って行動してみましょう。',
  '###userName###さんには今日は予想外の出来事があるかもしれません。柔軟な気持ちで対応しましょう。'
];

/**
 * 名前の文字列を渡すと占い結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 占い結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // 特定の部分を名前に置き換える
  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストを行う関数
function test() {
  console.log('占い結果の文章のテスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎さんの今日は努力が実を結ぶ日です。今まで頑張ってきたことに良い結果が期待できそうです。',
    '占い結果の文章が正しくありません。'
  );

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '同じ名前なら同じ占い結果を出力する処理が正しくありません。'
  );

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '同じ名前なら同じ占い結果を出力する処理が正しくありません。'
  );

  console.log('占い結果の文章のテスト終了');
}

test();
