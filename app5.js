const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand || 'グー';  
  let win = Number(req.query.win) || 0;  // 初期値を0に設定
  let total = Number(req.query.total) || 0;  // 初期値を0に設定
  console.log({ hand, win, total });

  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';

 if (hand === cpu) {
   judgement = '引き分け';
 } else if (
   (hand === 'グー' && cpu === 'チョキ') ||
   (hand === 'チョキ' && cpu === 'パー') ||
   (hand === 'パー' && cpu === 'グー')
 ) {
   judgement = '勝ち';
   win += 1;
 } else {
   judgement = '負け';
 }

 total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/Amekakushi", (req, res) => {
  // ユーザーの手を "左" または "右" から取得し、デフォルトを "左" に設定
  let hand = req.query.hand || '左';
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;
  console.log({ hand, win, total });

  // CPUの手をランダムで "左" または "右" に設定
  const num = Math.floor(Math.random() * 2 + 1);
  let cpu = '';

  if( num==1 ) cpu = '左';
  else  cpu = '右';

  // 勝敗判定
  let judgement = '';

  if (hand === cpu) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }

  total += 1;  // ゲームの総数を1つ増やす

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  console.log(display);
  res.render('Amekakushi', display);
});

app.get("/Gatyagatya2", (req, res) => {
  // ユーザーの手を "左" または "右" から取得し、デフォルトを "左" に設定
  let hand = req.query.hand || '0';
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;
  console.log({ hand, win, total });

  // CPUの手をランダムで "左" または "右" に設定
  const num = Math.floor(Math.random() * 4 + 1);
  let cpu = '';

  if( num==1 ) cpu = '1';
  else if (num==2) cpu = '2';
  else if (num==3) cpu = '3';
  else cpu = '4';

  // 勝敗判定
  let judgement = '';

  if (hand === cpu) {
    judgement = '★★★★★(大当たり)';
    win += 1;
  } else {
    judgement = '★★★(当たり)';
  }

  total += 1;  // ゲームの総数を1つ増やす

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  console.log(display);
  res.render('Gatyagatya2', display);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));