//初始化chat  START
var chat = {
    messageToSend: '',
    messageResponses: [
        '感谢您的提问'
    ],
    init: function () {
        this.cacheDOM();
        this.bindEvents();
        this.render();
    },
    cacheDOM: function () {
        this.$chatHistory = $('.chat-history');
        this.$button = $('button');
        this.$textarea = $('#message-to-send');
        this.$chatHistoryList = this.$chatHistory.find('ul');
    },
    bindEvents: function () {
        this.$button.on('click', this.addMessage.bind(this));
        this.$textarea.on('keyup', this.addMessageEnter.bind(this));

    },
    render: function () {
        this.scrollToBottom();
        this.messageToSend = this.$textarea.val()
        if (this.messageToSend.trim() !== '') {
            var template = Handlebars.compile($("#message-template").html());
            var context = {
                messageOutput: this.messageToSend,
                time: this.getCurrentTime()
            };

            this.$chatHistoryList.append(template(context));
            this.scrollToBottom();
            this.$textarea.val('');
        }
    },

    renderRep: function (res_msg, imgurl, state) {
        let botName = $(".chat-with")[0].textContent
        console.log(botName)
        var templateResponse = Handlebars.compile($("#message-response-template").html());
        var contextResponse = {
            bot_name: botName,
            response: res_msg,
            imgurl: imgurl,
            state: state,
            time: this.getCurrentTime()
        };
        setTimeout(function () {
            this.$chatHistoryList.append(templateResponse(contextResponse));
            this.scrollToBottom();
        }.bind(this), 10);
    },
    //发送
    addMessage: function () {
        let msg = this.$textarea.val()
        msg = msg.replace(/[\r\n]/g, "") //去掉回车换行
        let that = this
        $.ajax({
            url: 'api/chat/',
            type: "get",
            data: {question: msg},
            beforeSend: function () {
                console.log('before')
                that.render();
            },
            success: function (res) {
                console.log(res)
                that.messageToSend = that.$textarea.val()
                that.renderRep(res.msg, res.imgurl, res.state);
            }
        });
    },
    addMessageEnter: function (event) {
        // enter was pressed
        if (event.keyCode === 13) {
            this.addMessage();
        }
    },
    scrollToBottom: function () {
        this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function () {
        return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

};
//初始化chat  END
chat.init();

var searchFilter = {
    options: {valueNames: ['name']},
    init: function () {
        var userList = new List('people-list', this.options);
        var noItems = $('<li id="no-items-found">No items found</li>');

        userList.on('updated', function (list) {
            if (list.matchingItems.length === 0) {
                $(list.list).append(noItems);
            } else {
                noItems.detach();
            }
        });
    }
};

searchFilter.init();

function changeBot(bot) {
    switch (bot) {
        case "anan":
            changeActive("anan")
            changeBotInfo('霸道总裁阿南', '呵，我还从来没有尝试过被拒绝的滋味呢。', '/static/img/bdzc.jpeg');
            changeHistory("你成功地引起了我的注意！");

            break;
        case "agen":
            changeActive("agen")
            changeBotInfo("绝世渣男阿根", "最爱你的人是我，怎么舍得你难过！", '/static/img/jszn.jpeg');
            changeHistory("最爱你的人是我，怎么舍得你难过！");
            break;
        case "ayin":
            changeActive("ayin")
            changeBotInfo("举世无双阿银", "陌上颜如玉，公子世无双。", '/static/img/jsws.jpeg');
            changeHistory("立如芝兰玉树，笑如朗月入怀。 郎艳独绝，世无其二。");
            break;
    }
}

function changeActive(itemId) {
    let divId = "#" + itemId
    let oldActiveItem = $(".on-check").removeClass("on-check")
    let newActiveItem = $(divId).addClass("on-check")
}

function changeBotInfo(bot_name, bot_desc, bot_img) {
    $(".chat-about .chat-with").html(bot_name);
    $(".chat-about .bot-desc").html(bot_desc);
    let img = document.getElementById('chat-about-img')
    img.src = bot_img
}

function changeHistory(bot_notes) {
    let chatHistory = $(".chat-history")
    let chatHistoryUl = chatHistory.find('ul')
    let chatHistoryLi = chatHistoryUl.find('li')
    chatHistoryLi.remove()
    chat.renderRep(bot_notes)
}