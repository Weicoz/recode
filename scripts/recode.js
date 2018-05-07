var apikey = "keyQOnwsBBHWv2GrW"
var paytime = daytime(); //支付时间
var money = ""; //金额
var paytype = ""; //支付来源
var output = ""; //支出类型
var pro_name = ""; //商品名称
var scenes = ""; //使用场景
var location = ""; //位置
var money_type = ""; //收支情况
var remark = ""; //备注

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
    "餐饮": ["餐馆", "饮料", "小吃", "零食", "其他"],
    "数字": ["APP", "网站", "游戏", "电影", "会员", "其他"],
    "固定": ["交通", "通讯", "油费", "其他"],
    "购物": ["网购", "服装", "电子产品", "其他"],
    "临时": ["维修", "旅游", "流量", "医疗", "其他"],
}

var tags_detail = {
    "早餐": {
        "name": "早餐",
        "output": "餐饮",
        "scenes": "餐馆"
    },
    "午餐": {
        "name": "午餐",
        "output": "餐饮",
        "scenes": "餐馆"
    },
    "晚餐": {
        "name": "晚餐",
        "output": "餐饮",
        "scenes": "餐馆"
    },
    "电影": {
        "name": "电影",
        "output": "数字",
        "scenes": "电影"
    },
    "油费": {
        "name": "油费",
        "output": "固定",
        "scenes": "交通"
    },
    "喵": {
        "name": "喵",
        "output": "临时",
        "scenes": "其他"
    },
    "其他": {
        "name": "",
        "output": "临时",
        "scenes": "其他"
    }
}


function daytime(time) {
    var myDate = new Date()
    var settime = myDate.getFullYear() + "-" +
        (myDate.getMonth() + 1) + "-" +
        myDate.getDate() + " " +
        myDate.getHours() + ":" +
        myDate.getMinutes() + ":" +
        myDate.getSeconds();
    return settime
}

function choose_paytype() {
    $ui.push({
        props: {
            title: "请选择支付方式"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    //title: "请选择支付方式",
                    rows: paytype_data
                }]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (tableView, indexPath, title) {
                    console.log(title)
                    paytype = title
                    $ui.toast(paytype)
                    choose_output()
                }
            }
        }]
    })
}

function choose_output() {
    $ui.push({
        props: {
            title: "请选择消费类型"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    //title: "请选择消费类型",
                    rows: output_data
                },]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (tableView, indexPath, title) {
                    output = title
                    console.log("output:" + output);
                    $ui.toast(output)
                    if (title == "快捷标签") {
                        choose_tags()
                    } else {
                        choose_scenes()
                    }
                }
            }
        }]
    })
}

function choose_tags() {
    $ui.push({
        props: {
            title: "请选择标签"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    //title: "请选择标签",
                    rows: tags_data
                },]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (tableView, indexPath, title) {
                    console.log("tags:" + title)
                    pro_name = tags_detail[title].name
                    output = tags_detail[title].output
                    scenes = tags_detail[title].scenes
                    $ui.toast(pro_name + "/" + output + "/" + scenes)
                    postdata()
                }
            }
        }]
    })
}

function choose_scenes() {
    $ui.push({
        props: {
            title: "请选择场景"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    //title: "请选择场景",
                    rows: scenes_data[output]
                },]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (tableView, indexPath, title) {
                    scenes = title
                    console.log("scenes:" + scenes)
                    $ui.toast(scenes)
                    input_pro_name()
                }
            }
        }]
    })
}

function input_money() {
    $ui.render({
        props: {
            title: "请输入金额"
        },
        views: [{
            type: "input",
            props: {
                type: $kbType.number,
                darkKeyboard: true,
                title: "请输入金额",
                placeholder: "请输入金额",
            },
            layout: function (make, view) {
                make.top.equalTo(5)
                make.left.inset(20)
                make.height.equalTo(40)
                make.right.inset(130)
            },
            events: {
                returned: function (sender) {
                    console.log("data:" + sender)
                    money = sender.text
                    $ui.toast(money + " 元")
                    choose_paytype()
                },
                changed: function (sender) {
                    money = sender.text
                    console.log("money" + money)
                }
            }
        }, {
            type: "button",
            props: {
                title: "确定",
                align: $align.center
            },
            layout: function (make) {
                make.right.inset(20)
                make.top.equalTo(5)
                make.size.equalTo($size(90, 40))
            },
            events: {
                tapped: function (sender, view) {
                    $ui.toast(money + "元")
                    choose_paytype()
                }
            }
        }, {
            type: "date-picker",
            props: {
                interval: 5,
                //mode: "dateAndTime"
            },
            layout: function (make) {
                make.left.right.inset(30)
                make.top.equalTo(50)
                make.height.equalTo(180)
            },
            events: {
                changed: function (sender) {
                    paytime = daytime(sender.date)
                    console.log("paytime:" + paytime)
                }
            }
        }]
    })
}


function input_pro_name() {
    $input.text({
        type: $kbType.search,
        handler: function (text) {
            //获取商品
            pro_name = text
            $ui.toast(text)
            postdata()
        }
    })
}

function get_localtion() {
    $location.fetch({
        handler: function (resp) {
            var lat = resp.lat
            var lng = resp.lat
            var alt = resp.alt
            localtion = alt
            console.log(location)
        }
    })
}

function updataing() {
    $ui.push({
        props: {
            title: "提交中",
            id: "updata_page"
        },
        views: [{
            type: "label",
            props: {
                text: "正在提交中...",
                align: $align.center
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
            }

        }, /*{
            type: "spinner",
            props: {
                loading: true
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
            }*/
        ]
    })
}


function success() {
    $ui.push({
        props: {
            title: "完成",
            id: "success_page"
        },
        views: [{
            type: "label",
            props: {
                text: "提交成功",
                align: $align.center,
                id: "label_view"
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
            }

        }]
    })
    $delay(2, function () {
        $app.close();
    })
}


function postdata() {
    updataing()
    get_localtion()
    $http.request({
        showsProgress: true,

        method: "POST",
        url: "https://api.airtable.com/v0/appp4IH0Oi4b6QI3q/Table1",
        header: {
            Authorization: "Bearer keyQOnwsBBHWv2GrW",
        },
        body: {
            fields: {
                付款时间: paytime,
                来源: paytype,
                商品名称: pro_name,
                类型: output,
                情景: scenes,
                金额: parseInt("-" + money),
                位置: location,
                收支情况: "支出",
            }

        },
        handler: function (resp) {
            var data = resp.data
            console.log(data)
            success()
        }
    })
}

var app = require('app');
var apps = require('scripts/app');

function say(){
    alert("321")
    apps.sayHello();
    //app.sayHello();

    alert("123")
}

module.exports = {
    say: say,
}