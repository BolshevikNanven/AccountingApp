import {
    Utensils, Drumstick, Dribbble, Bike, Footprints, Waves, Dumbbell, Coffee, Car, Caravan, CableCar, Bus, Bike,
    Grape, Banana, Apple, Citrus, Plane, Ship, TrainFront, Truck, Cherry, Bean, Carrot, Nut, Wheat, Cat, Dog, Rabbit, Snail, Squirrel,
    Turtle, Bird, Fish, Rat, Bath, Power, Fuel, Newspaper, Phone, Headphones, Voicemail, CassetteTape, CircuitBoard, Computer,
    Keyboard, MemoryStick, Monitor, Mouse, Smartphone, Watch, Camera, Film, ShoppingCart, FlameKindling, Mountain, Tent, Cake,
    Dessert, Sandwich, Candy, Cookie, CupSoda, Croissant, Donut, IceCream, Lollipop, Pizza, Popcorn, Beef, Bone, Egg, FishSymbol, PiggyBank,
    Beer, Cigarette, Sofa, Armchair, Bed, Lamp, AirVent, Shirt, Glasses, Wallet, GraduationCap, Axe, Filter, Flashlight, Hammer, Key,
    Map, Megaphone, Microscope, Plug, PocketKnife, Speaker, Thermometer, Trash, Umbrella, Book, Brush, Calculator, Calendar, Compass, Eraser,
    Paintbrush, Palette, Pen, Pencil, Search, Scissors, Tags, Ruler, Triangle, Gamepad2, Stethoscope, Tablets, Pill, Cross, Bluetooth//首字母需要大写
} from "lucide-react"

import { cn, findFatherType } from "../../lib/utils";

export const accountingType = {
    '餐饮': ["正餐", "小吃", "下午茶"],
    '运动': ["篮球", "骑行", "跑步", "游泳", "健身"],
    '出行': ["轿车", "大篷车", "缆车", "公交车", "自行车", "飞机", "轮船", "火车", "卡车"],
    '水果': ["葡萄", "香蕉", "苹果", "柑橘", "樱桃"],
    '蔬菜': ["豆荚", "萝卜", "坚果", "小麦"],
    '宠物': ["小猫", "小狗", "兔子", "蜗牛", "松鼠", "乌龟", "小鸟", "鱼儿", "老鼠"],
    '日用': ["沐浴", "电费", "燃油", "报纸", "话费"],
    '数码': ["耳机", "语音信箱", "盒式录音带", "电路板", "电脑", "键盘", "记忆棒", "监控器", "鼠标", "智能手机", "手表", "相机", "游戏机", "蓝牙"],
    '娱乐': ["看电影", "购物", "烧烤", "爬山", "露营"],
    '零食': ["蛋糕", "点心", "三明治", "糖果", "饼干", "饮料", "三角面包", "甜甜圈", "冰淇淋", "棒棒糖", "披萨", "爆米花"],
    '肉类': ["牛肉", "排骨", "鸡蛋", "鱼肉", "猪肉"],
    '烟酒': ["酒", "烟"],
    '家具': ["沙发", "座椅", "床", "台灯", "空调"],
    '服饰': ["衣服", "眼镜", "钱包", "礼帽"],
    '工具': ["斧头", "漏斗", "手电筒", "锤子", "钥匙", "地图", "喇叭", "显微镜", "插头", "小刀", "扬声器", "温度计", "垃圾桶", "雨伞", "日历", "指南针"],
    '学习': ["书本", "画笔", "计算器", "橡皮擦", "画刷", "颜料", "钢笔", "铅笔", "放大镜", "剪刀", "标签", "直尺", "三角板"],
    '医疗': ["就诊", "药剂", "药丸", "急救"]



}


export default function Icons({ name, className }) {

    switch (name) {
        case '正餐': return <IconBox name={findFatherType(name)}><Utensils /></IconBox >;
        case '小吃': return <IconBox name={findFatherType(name)}><Drumstick /></IconBox >;
        case '篮球': return <IconBox name={findFatherType(name)}><Dribbble /></IconBox >;
        case '骑行': return <IconBox name={findFatherType(name)}><Bike /></IconBox >;
        case '跑步': return <IconBox name={findFatherType(name)}><Footprints /></IconBox >;
        case '游泳': return <IconBox name={findFatherType(name)}><Waves /></IconBox >;
        case '健身': return <IconBox name={findFatherType(name)}><Dumbbell /></IconBox >;
        case '下午茶': return <IconBox name={findFatherType(name)}><Coffee /></IconBox >;
        case '轿车': return <IconBox name={findFatherType(name)}><Car /></IconBox >;
        case '大篷车': return <IconBox name={findFatherType(name)}><Caravan /></IconBox >;
        case '缆车': return <IconBox name={findFatherType(name)}><CableCar /></IconBox >;
        case '公交车': return <IconBox name={findFatherType(name)}><Bus /></IconBox >;
        case '自行车': return <IconBox name={findFatherType(name)}><Bike /></IconBox >;
        case '飞机': return <IconBox name={findFatherType(name)}><Plane /></IconBox >;
        case '轮船': return <IconBox name={findFatherType(name)}><Ship /></IconBox >;
        case '火车': return <IconBox name={findFatherType(name)}><TrainFront /></IconBox >;
        case '卡车': return <IconBox name={findFatherType(name)}><Truck /></IconBox >;
        case '葡萄': return <IconBox name={findFatherType(name)}><Grape /></IconBox >;
        case '香蕉': return <IconBox name={findFatherType(name)}><Banana /></IconBox >;
        case '苹果': return <IconBox name={findFatherType(name)}><Apple /></IconBox >;
        case '柑橘': return <IconBox name={findFatherType(name)}><Citrus /></IconBox >;
        case '樱桃': return <IconBox name={findFatherType(name)}><Cherry /></IconBox >;
        case '豆荚': return <IconBox name={findFatherType(name)}><Bean /></IconBox >;
        case '萝卜': return <IconBox name={findFatherType(name)}><Carrot /></IconBox >;
        case '坚果': return <IconBox name={findFatherType(name)}><Nut /></IconBox >;
        case '小麦': return <IconBox name={findFatherType(name)}><Wheat /></IconBox >;
        case '小猫': return <IconBox name={findFatherType(name)}><Cat /></IconBox >;
        case '小狗': return <IconBox name={findFatherType(name)}><Dog /></IconBox >;
        case '兔子': return <IconBox name={findFatherType(name)}><Rabbit /></IconBox >;
        case '蜗牛': return <IconBox name={findFatherType(name)}><Snail /></IconBox >;
        case '松鼠': return <IconBox name={findFatherType(name)}><Squirrel /></IconBox >;
        case '乌龟': return <IconBox name={findFatherType(name)}><Turtle /></IconBox >;
        case '小鸟': return <IconBox name={findFatherType(name)}><Bird /></IconBox >;
        case '鱼儿': return <IconBox name={findFatherType(name)}><Fish /></IconBox >;
        case '老鼠': return <IconBox name={findFatherType(name)}><Rat /></IconBox >;
        case '沐浴': return <IconBox name={findFatherType(name)}><Bath /></IconBox >;
        case '电费': return <IconBox name={findFatherType(name)}><Power /></IconBox >;
        case '燃油': return <IconBox name={findFatherType(name)}><Fuel /></IconBox >;
        case '报纸': return <IconBox name={findFatherType(name)}><Newspaper /></IconBox >;
        case '话费': return <IconBox name={findFatherType(name)}><Phone /></IconBox >;
        case '耳机': return <IconBox name={findFatherType(name)}><Headphones /></IconBox >;
        case '语音信箱': return <IconBox name={findFatherType(name)}><Voicemail /></IconBox >;
        case '盒式录音带': return <IconBox name={findFatherType(name)}><CassetteTape /></IconBox >;
        case '电路板': return <IconBox name={findFatherType(name)}><CircuitBoard /></IconBox >;
        case '电脑': return <IconBox name={findFatherType(name)}><Computer /></IconBox >;
        case '键盘': return <IconBox name={findFatherType(name)}><Keyboard /></IconBox >;
        case '记忆棒': return <IconBox name={findFatherType(name)}><MemoryStick /></IconBox >;
        case '监控器': return <IconBox name={findFatherType(name)}><Monitor /></IconBox >;
        case '鼠标': return <IconBox name={findFatherType(name)}><Mouse /></IconBox >;
        case '智能手机': return <IconBox name={findFatherType(name)}><Smartphone /></IconBox >;
        case '手表': return <IconBox name={findFatherType(name)}><Watch /></IconBox >;
        case '相机': return <IconBox name={findFatherType(name)}><Camera /></IconBox >;
        case '游戏机': return <IconBox name={findFatherType(name)}><Gamepad2 /></IconBox >;
        case '蓝牙': return <IconBox name={findFatherType(name)}><Bluetooth /></IconBox >;
        case '看电影': return <IconBox name={findFatherType(name)}><Film /></IconBox >;
        case '购物': return <IconBox name={findFatherType(name)}><ShoppingCart /></IconBox >;
        case '烧烤': return <IconBox name={findFatherType(name)}><FlameKindling /></IconBox >;
        case '爬山': return <IconBox name={findFatherType(name)}><Mountain /></IconBox >;
        case '露营': return <IconBox name={findFatherType(name)}><Tent /></IconBox >;
        case '蛋糕': return <IconBox name={findFatherType(name)}><Cake /></IconBox >;
        case '点心': return <IconBox name={findFatherType(name)}><Dessert /></IconBox >;
        case '三明治': return <IconBox name={findFatherType(name)}><Sandwich /></IconBox >;
        case '糖果': return <IconBox name={findFatherType(name)}><Candy /></IconBox >;
        case '饼干': return <IconBox name={findFatherType(name)}><Cookie /></IconBox >;
        case '饮料': return <IconBox name={findFatherType(name)}><CupSoda /></IconBox >;
        case '三角面包': return <IconBox name={findFatherType(name)}><Croissant /></IconBox >;
        case '甜甜圈': return <IconBox name={findFatherType(name)}><Donut /></IconBox >;
        case '冰淇淋': return <IconBox name={findFatherType(name)}><IceCream /></IconBox >;
        case '棒棒糖': return <IconBox name={findFatherType(name)}><Lollipop /></IconBox >;
        case '披萨': return <IconBox name={findFatherType(name)}><Pizza /></IconBox >;
        case '爆米花': return <IconBox name={findFatherType(name)}><Popcorn /></IconBox >;
        case '牛肉': return <IconBox name={findFatherType(name)}><Beef /></IconBox >;
        case '排骨': return <IconBox name={findFatherType(name)}><Bone /></IconBox >;
        case '鸡蛋': return <IconBox name={findFatherType(name)}><Egg /></IconBox >;
        case '鱼肉': return <IconBox name={findFatherType(name)}><FishSymbol /></IconBox >;
        case '猪肉': return <IconBox name={findFatherType(name)}><PiggyBank /></IconBox >;
        case '酒': return <IconBox name={findFatherType(name)}><Beer /></IconBox >;
        case '烟': return <IconBox name={findFatherType(name)}><Cigarette /></IconBox >;
        case '沙发': return <IconBox name={findFatherType(name)}><Sofa /></IconBox >;
        case '座椅': return <IconBox name={findFatherType(name)}><Armchair /></IconBox >;
        case '床': return <IconBox name={findFatherType(name)}><Bed /></IconBox >;
        case '台灯': return <IconBox name={findFatherType(name)}><Lamp /></IconBox >;
        case '空调': return <IconBox name={findFatherType(name)}><AirVent /></IconBox >;
        case '衣服': return <IconBox name={findFatherType(name)}><Shirt /></IconBox >;
        case '眼镜': return <IconBox name={findFatherType(name)}><Glasses /></IconBox >;
        case '钱包': return <IconBox name={findFatherType(name)}><Wallet /></IconBox >;
        case '礼帽': return <IconBox name={findFatherType(name)}><GraduationCap /></IconBox >;
        case '斧头': return <IconBox name={findFatherType(name)}><Axe /></IconBox >;
        case '漏斗': return <IconBox name={findFatherType(name)}><Filter /></IconBox >;
        case '手电筒': return <IconBox name={findFatherType(name)}><Flashlight /></IconBox >;
        case '锤子': return <IconBox name={findFatherType(name)}><Hammer /></IconBox >;
        case '钥匙': return <IconBox name={findFatherType(name)}><Key /></IconBox >;
        case '地图': return <IconBox name={findFatherType(name)}><Map /></IconBox >;
        case '喇叭': return <IconBox name={findFatherType(name)}><Megaphone /></IconBox >;
        case '显微镜': return <IconBox name={findFatherType(name)}><Microscope /></IconBox >;
        case '插头': return <IconBox name={findFatherType(name)}><Plug /></IconBox >;
        case '小刀': return <IconBox name={findFatherType(name)}><PocketKnife /></IconBox >;
        case '扬声器': return <IconBox name={findFatherType(name)}><Speaker /></IconBox >;
        case '温度计': return <IconBox name={findFatherType(name)}><Thermometer /></IconBox >;
        case '垃圾桶': return <IconBox name={findFatherType(name)}><Trash /></IconBox >;
        case '雨伞': return <IconBox name={findFatherType(name)}><Umbrella /></IconBox >;
        case '日历': return <IconBox name={findFatherType(name)}><Calendar /></IconBox >;
        case '书本': return <IconBox name={findFatherType(name)}><Book /></IconBox >;
        case '画笔': return <IconBox name={findFatherType(name)}><Brush /></IconBox >;
        case '计算器': return <IconBox name={findFatherType(name)}><Calculator /></IconBox >;
        case '指南针': return <IconBox name={findFatherType(name)}><Compass /></IconBox >;
        case '橡皮擦': return <IconBox name={findFatherType(name)}><Eraser /></IconBox >;
        case '画刷': return <IconBox name={findFatherType(name)}><Paintbrush /></IconBox >;
        case '颜料': return <IconBox name={findFatherType(name)}><Palette /></IconBox >;
        case '钢笔': return <IconBox name={findFatherType(name)}><Pen /></IconBox >;
        case '铅笔': return <IconBox name={findFatherType(name)}><Pencil /></IconBox >;
        case '放大镜': return <IconBox name={findFatherType(name)}><Search /></IconBox >;
        case '剪刀': return <IconBox name={findFatherType(name)}><Scissors /></IconBox >;
        case '标签': return <IconBox name={findFatherType(name)}><Tags /></IconBox >;
        case '直尺': return <IconBox name={findFatherType(name)}><Ruler /></IconBox >;
        case '三角板': return <IconBox name={findFatherType(name)}><Triangle /></IconBox >;
        case '就诊': return <IconBox name={findFatherType(name)}><Stethoscope /></IconBox >;
        case '药剂': return <IconBox name={findFatherType(name)}><Tablets /></IconBox >;
        case '药丸': return <IconBox name={findFatherType(name)}><Pill /></IconBox >;
        case '急救': return <IconBox name={findFatherType(name)}><Cross /></IconBox >;



    }
}


function IconBox({ name, className, children }) {

    const defaultStyle = "rounded-[6px] flex flex-row justify-center items-center h-[38px] w-[38px] [&_*]:w-5 [&_*]:h-5";

    switch (name) {
        case '餐饮': return <div className={cn(defaultStyle, " text-orange-700", className)}>{children}</div>
    }
}
