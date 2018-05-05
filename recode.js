var paytime = daytime();    //支付时间
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

// Prepare view
// $ui.render({
//     props: {
//         title: "recode"
//     },
//     views: [{
//         type: "list",
//         props: {
//             id: "main-list"
//         },
//         layout: $layout.fill,
//         events: {
//             didSelect: function(tableView, indexPath) {
//                 $ui.push(data[indexPath.row].page)
//             }
//         }
//     }]
// })

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
        views: {
            views: {
                type: "input",
                props: {
                    type: $kbType.number,
                    darkKeyboard: true,
                    title: "请输入金额",
                    placeholder: "请输入金额",
                },
                layout: function (make, view) {
                    make.top.equalTo(5)
                    make.centerX.equalTo()
                    make.size.equalTo($size(200, 40))
                },
                events: {
                    returned: function (sender) {
                        choose_paytype()
                    }
                }
            },
            views: {
                type: "button",
                props: {
                    title: "确定",
                    align:
                    $align.center
                },
                layout: function (make) {
                    make.centerX.equalTo()
                    make.top.equalTo(5)
                    make.size.equalTo($size(120, 40))
                }
                ,
                events: {
                    tapped: function (sender) {
                        choose_paytype()
                    }
                }
            },
        }
    })
}


function input_pro_name() {
    $input.text({
        type: $kbType.number,
        handler: function (text) {
            //获取价格
            money = text
            $ui.toast(money + "元")
            if (money.substr(0, 1) == "+") {

            } else if (!money) {

            } else {

            }
        }
    })
}

input_money()