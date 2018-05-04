var myDate = new Date()
//支付时间
var paytime = myDate.getFullYear() + "-" +
    (myDate.getMonth() + 1) + "-" +
    myDate.getDate() + " " +
    myDate.getHours() + ":" +
    myDate.getMinutes() + ":" +
    myDate.getSeconds();

var money = "";     //金额
var paytype = "";   //支付来源
var output = "";    //支出类型
var pro_name = "";  //商品名称
var scenes = "";    //使用场景
var location = "";  //位置
var money_type = "";//收支情况
var remark = "";    //备注


var paytype_data = [
    "微信",
    "支付宝",
    "银行卡",
    "现金",
]

var output_data = [
    "快捷标签",
    "餐饮",
    "数字",
    "固定",
    "购物",
    "临时",
]

//快捷标签内容
var tags_data = [
    "早餐",
    "午餐",
    "晚餐",
    "电影",
    "油费",
    "喵",
    "其他",
]


var scenes_data = {
    "餐饮":["餐馆","饮料","小吃","零食","其他"],
    "数字":["APP","网站","游戏","电影","会员","其他"],
    "固定":["交通","通讯","油费","其他"],
    "购物":["网购","服装","电子产品","其他"],
    "临时":["维修","旅游","流量","医疗","其他"],
}

function choose_main(data, func) {
    $ui.menu({
        items: data,
        handler: function (data, idx) {
            console.log(data,idx);
            if (func) {
                func(data);
            }
        }
    })
}


data.forEach(function(item) {
    item.page.props = {
        title: item.name
    }
})

// Prepare view
$ui.render({
    props: {
        title: "recode"
    },
    views: [{
        type: "list",
        props: {
            id: "main-list"
        },
        layout: $layout.fill,
        events: {
            didSelect: function(tableView, indexPath) {
                $ui.push(data[indexPath.row].page)
            }
        }
    }]
})

// Render
$("main-list").data = data.map(function(item) {
    return item.name
})


$input.text({
    type: $kbType.number,
    handler: function (text) {
        //获取价格
        money = text
        $ui.toast(money + "元")
        if (money.substr(0, 1) == "+") {

        } else if (!money) {

        } else {
            choose_paytype();
        }

    }
})

var data = {
    name: "List View",
    page: {
        views: [{
            type: "list",
            props: {
                grouped: true,
                rowHeight: 64.0,
                footer: {
                    type: "label",
                    props: {
                        height: 20,
                        text: "Write the Code. Change the world.",
                        textColor: $color("#AAAAAA"),
                        align: $align.center,
                        font: $font(12)
                    }
                },
                template: [{
                    type: "label",
                    props: {
                        id: "title",
                        font: $font(20)
                    },
                    layout: function(make) {
                        make.left.equalTo(15)
                        make.top.right.inset(8)
                        make.height.equalTo(24)
                    }
                },
                    {
                        type: "label",
                        props: {
                            id: "content",
                            textColor: $color("#888888"),
                            font: $font(15)
                        },
                        layout: function(make) {
                            make.left.right.equalTo($("title"))
                            make.top.equalTo($("title").bottom)
                            make.bottom.equalTo(0)
                        }
                    }
                ],
                data: [{
                    title: "Languages",
                    rows: [{
                        title: {
                            text: "JavaScript"
                        },
                        content: {
                            text: "a high-level, dynamic, untyped, object-based, multi-paradigm, and interpreted programming language."
                        },
                        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    },
                        {
                            title: {
                                text: "Swift"
                            },
                            content: {
                                text: "a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc."
                            },
                            url: "https://swift.org"
                        },
                        {
                            title: {
                                text: "Objective-C"
                            },
                            content: {
                                text: "a general-purpose, object-oriented programming language that adds Smalltalk-style messaging to the C programming language."
                            },
                            url: "https://developer.apple.com/documentation/objectivec"
                        }
                    ]
                },
                    {
                        title: "Frameworks",
                        rows: [{
                            title: {
                                text: "Vue"
                            },
                            content: {
                                text: "a progressive framework for building user interfaces."
                            },
                            url: "https://vuejs.org/"
                        },
                            {
                                title: {
                                    text: "React"
                                },
                                content: {
                                    text: "a JavaScript library for building user interfaces."
                                },
                                url: "https://facebook.github.io/react/"
                            },
                            {
                                title: {
                                    text: "Angular"
                                },
                                content: {
                                    text: "a development platform for building mobile and desktop web applications using Typescript/JavaScript (JS) and other languages."
                                },
                                url: "https://angularjs.org"
                            }
                        ]
                    }
                ]
            },
            layout: $layout.fill,
            events: {
                didSelect: function(tableView, indexPath) {
                    $ui.push({
                        views: [{
                            type: "web",
                            props: {
                                url: tableView.object(indexPath).url
                            },
                            layout: $layout.fill
                        }]
                    })
                }
            }
        }]
    }
}



//选择支付类型
function choose_paytype(){
    $ui.menu({
        items: paytype_data,
        handler: function (data, idx) {
            console.log(data,idx);
            paytype = data;
            choose_output();
        }
    })
}


//选择支出类型
function choose_output(){
    $ui.menu({
        items: output_data,
        handler: function (data, idx) {
            console.log(data,idx);
            output = data;
            if (output == "快捷标签"){
                choose_tag(output);
            }else{

            }
        }
    })
}

function choose_tag(output){
    $ui.menu({
        items: tags_data,
        handler: function (data, idx) {
            console.log(data,idx);

        }
    })
}

function choose_scenes(data){
    choose_main(data,function (data) {
        $ui.alert(data);
        choose_main(scenes_data[data],function () {
            $ui.alert(data);
        });
    });
}

function choose_tags(data) {
    switch (data){
        case "早餐":
            break;
        case "午餐":
            break;
        case "晚餐":
            break;
        case "电影":
            break;
        case "油费":
            break;
        case "喵":
            break;
        case "其他":
            break;
    }
}














