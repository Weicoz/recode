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














