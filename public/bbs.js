"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for (let mes of response.messages) {
                    console.log(mes);  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                
                    let like_button = document.createElement('button'); // いいねボタン
                    like_button.className = 'like-button';
                    
                    let heart = document.createElement('span');
                    heart.className = 'heart';
                    heart.innerHTML = '❤️'; // ハートの絵文字
                
                    let like_count = document.createElement('span');
                    like_count.innerText = `(${mes.likes || 0})`; // いいね数の表示
                
                    like_button.appendChild(heart);
                    like_button.appendChild(like_count);
                
                    like_button.addEventListener('click', () => {
                        // クリックしたらハートを赤くして、いいね数を増加させる
                        like_button.classList.add('liked');
                        like_count.innerText = `(${++mes.likes || 1})`; // いいね数を増やす
                    });
                
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);
                    cover.appendChild(like_button);
                
                    bbs.appendChild(cover);
                }
            })
        }
    });
});