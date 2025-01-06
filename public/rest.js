"use strict";

// 一覧取得ボタンの処理 (GET /bbs)
document.querySelector('#get1').addEventListener('click', () => {
    const params = {  
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    window.history.pushState(null, '', '/bbs');
    const url = "/bbs";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error fetching the posts');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);  // サーバーから返されたメッセージ一覧を表示
    })
    .catch((error) => {
        console.error(error);
    });
});

// 新規投稿ボタンの処理 (POST /bbs)
document.querySelector('#post2').addEventListener('click', () => {
    const name = prompt("Enter your name:");
    const message = prompt("Enter your message:");

    if (!name || !message) {
        alert("Both name and message are required!");
        return;
    }

    const params = {  
        method: "POST",
        body: new URLSearchParams({
            name: name,
            message: message
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState(null, '', '/bbs/post');
    const url = "/bbs";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error posting the message');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);  // 投稿された内容を確認
    })
    .catch((error) => {
        console.error(error);
    });
});

// 詳細取得ボタンの処理 (GET /bbs/:id)
document.querySelector('#get2').addEventListener('click', () => {
    const postId = prompt("Enter the post ID to fetch:");

    if (!postId) {
        alert("Post ID is required!");
        return;
    }

    const params = {  
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    window.history.pushState(null, '', `/bbs/${postId}`);
    const url = `/bbs/${postId}`;
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error fetching the post');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);  // 特定の投稿の内容を表示
    })
    .catch((error) => {
        console.error(error);
    });
});

// 投稿更新ボタンの処理 (PUT /bbs/:id)
document.querySelector('#put').addEventListener('click', () => {
    const postId = prompt("Enter the post ID to update:");
    const newName = prompt("Enter new name:");
    const newMessage = prompt("Enter new message:");

    if (!postId || !newName || !newMessage) {
        alert("Post ID, new name, and new message are all required!");
        return;
    }

    const params = {  
        method: "PUT",
        body: new URLSearchParams({
            name: newName,
            message: newMessage
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState(null, '', `/bbs/put/${postId}`);
    const url = `/bbs/${postId}`;
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error updating the post');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);  // 更新後の投稿内容を確認
    })
    .catch((error) => {
        console.error(error);
    });
});

// 投稿削除ボタンの処理 (DELETE /bbs/:id)
document.querySelector('#delete').addEventListener('click', () => {
    const postId = prompt("Enter the post ID to delete:");

    if (!postId) {
        alert("Post ID is required!");
        return;
    }

    const params = {  
        method: "DELETE",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    window.history.pushState(null, '', `/bbs/delete/${postId}`);
    const url = `/bbs/${postId}`;
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error deleting the post');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);  // 削除後の結果を表示
    })
    .catch((error) => {
        console.error(error);
    });
});
