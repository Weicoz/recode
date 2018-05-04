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

var tags_data = [
    "早餐",
    "午餐",
    "晚餐",
    "电影",
    "油费",
    "喵",
    "其他"
]

var scenes_data = {
    "餐饮":["1111","2222"],
    "数字":[],
    "固定":[],
    "购物":[],
    "临时":[],
}

function choose_main(data, func) {
    $ui.menu({
        items: data,
        handler: function (data, idx) {
            console.log(data);
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
            $ui.menu({
                items: paytype_data,
                handler: function (data, idx) {
                    console.log(data);
                    $ui.menu({
                        items: tags_data,
                        handler: function (data, idx) {
                            console.log(data);
                            
                        }
                    })
                }
            })
            
            
            
            //
            // //选择支付方式
            // choose_main(paytype_data, function (data) {
            //     //选择支出类型
            //     choose_main(output_data, function (data) {
            //         if (data == "快捷标签"){
            //             choose_main(tags_data,function (data) {
            //                 choose_tags(data);
            //             });
            //         }else{
            //             output = data;
            //             choose_scenes(scenes_data[data]);
            //         }
            //     });
            // });
        }

    }
})

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














