//初始化chat  START
var chat = {
    messageToSend: '',
    messageResponses: [
        '感谢您的提问'
    ],
    init: function () {
        this.cacheDOM();
        this.bindEvents();
        this.getChatHistory()
        // this.render();
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
    render: function (msg, time) {
        this.scrollToBottom();
        this.messageToSend = msg ? msg : this.$textarea.val()
        if (this.messageToSend.trim() !== '') {
            var template = Handlebars.compile($("#message-template").html());
            var context = {
                messageOutput: this.messageToSend,
                time: time ? time : this.getCurrentTime()
            };

            this.$chatHistoryList.append(template(context));
            this.scrollToBottom();
            this.$textarea.val('');
        }
    },

    renderRep: function (res_msg, imgurl, state, time) {
        let botName = $(".chat-with")[0].textContent
        var templateResponse = Handlebars.compile($("#message-response-template").html());
        var contextResponse = {
            bot_name: botName,
            response: res_msg,
            imgurl: imgurl,
            state: state,
            time: time ? time : this.getCurrentTime()
        };
        this.$chatHistoryList.append(templateResponse(contextResponse));
        this.scrollToBottom();

    },
    //发送
    addMessage: function () {
        let msg = this.$textarea.val();
        let botName = $(".chat-with-name")[0].textContent
        msg = msg.replace(/[\r\n]/g, "") //去掉回车换行
        let that = this
        $.ajax({
            url: 'api/chat/',
            type: "get",
            async: true,
            data: {question: msg, bot_name: botName},
            beforeSend: function () {
                that.render();
            },
            success: function (res) {
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
    timeFormat: function (date) {
        let newData = new Date(date.replace(/-/, '/'))
        return newData.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    getChatHistory: function () {
        let botName = $(".chat-with-name")[0].textContent
        let that = this
        $.ajax({
            url: 'api/chat-history/',
            type: 'GET',
            data: {
                bot_name: botName
            },
            success: function (res) {
                if (res['result'] && res['data'].length > 0) {
                    for (let item of res['data']) {
                        console.log(item['content'])
                        if (item['type'] === 'S') {
                            that.render(item['content'], chat.timeFormat(item['create_time']))
                        } else {
                            that.renderRep(item['content'], '', '', chat.timeFormat(item['create_time']))
                        }
                    }
                }
                getPrologue(botName)
            }
        })
    }

};
//初始化chat  END
chat.init();

var searchFilter = {
    options: {valueNames: ['name']},
    init: function () {
        let userList = new List('people-list', this.options);
        let noItems = $('<li id="no-items-found">No items found</li>');

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
    let chatHistory = $(".chat-history")
    let chatHistoryUl = chatHistory.find('ul')
    let chatHistoryLi = chatHistoryUl.find('li')
    chatHistoryLi.remove()
    switch (bot) {
        case "anan":
            changeActive("anan")
            changeBotInfo('霸道总裁阿南', '呵，我还从来没有尝试过被拒绝的滋味呢。', '/static/img/bdzc.jpeg', "anan");
            chat.getChatHistory()
            break;
        case "agen":
            changeActive("agen")
            changeBotInfo("绝世渣男阿根", "最爱你的人是我，怎么舍得你难过！", '/static/img/jszn.jpeg', "agen");
            chat.getChatHistory()
            break;
        case "ayin":
            changeActive("ayin")
            changeBotInfo("偏偏公子阿银", "陌上颜如玉，公子世无双。", '/static/img/jsws.jpeg', "ayin");
            chat.getChatHistory()
            break;
    }
}

function changeActive(itemId) {
    let divId = "#" + itemId
    let oldActiveItem = $(".on-check").removeClass("on-check")
    let newActiveItem = $(divId).addClass("on-check")
}

function changeBotInfo(bot_name, bot_desc, bot_img, bot_key) {
    $(".chat-about .chat-with").html(bot_name);
    $(".chat-about .chat-with-name").html(bot_key)
    $(".chat-about .bot-desc").html(bot_desc);
    let img = document.getElementById('chat-about-img')
    img.src = bot_img
}

function changeHistory(bot_notes) {
    chat.renderRep(bot_notes)
}

function getPrologue(bot_name) {
    $.ajaxSettings.async = false;
    $.getJSON("/static/json_data/prologue.json", function (data) {
        let prologue_list = data[bot_name]
        let num = Math.floor(Math.random() * prologue_list.length);
        changeHistory(prologue_list[num]);
    })
}

function logout() {
    $.ajax({
        url: 'api/logout/',
        type: 'POST',
        success: function (res) {
            if (res.result) {
                document.location.reload()
            }
        }
    })
}