import {
    Utensils, Drumstick, Bike, Dumbbell, Coffee, Car, BusFront, CarTaxiFront, TramFront,
    Apple, Plane, Ship, TrainFront, Bus, ParkingSquare, Forklift, Ticket, ConciergeBell, Baby, Gem, Refrigerator,
    Bath, Fuel, Newspaper, Phone, Headphones, Film, ShoppingCart, FlameKindling, Mountain, Tent, 
     Sandwich, IceCream, Bird, Beer, Cigarette, AirVent, Shirt, Book, Brush,
    Palette, Stethoscope, Tablets, Pill, Cross, Soup,
    Milk, Home, Zap, Scissors, Receipt, Camera, Gift, Flower2, RadioTower, BadgeDollarSign, Heart,
    Gamepad2, Palmtree, Drama, Mic2, Wine,
} from "lucide-react"

import { cn, findFatherType } from "../../lib/utils";
import ExtraIcon from "./extraIcon";

export const accountingOutType = {
    '餐饮': ["餐饮", "早餐", "中餐", "晚餐", "小吃", "下午茶", "夜宵", "水果", "饮料"],
    '交通': ["交通", "打车", "公交车", '长途汽车', "自行车", "飞机", "轮船", "火车", "地铁", "油费", "停车费", "修车费", "过路费"],
    '购物': ["购物", "酒", "烟", "衣服", "婴儿用品", "美容化妆", "百货", "数码产品", "书籍", "电器", "文具", "珠宝首饰", "家具"],
    '日常': ["房租", "电费", "美容美发", "报纸", "话费", "婚庆摄影", "网费", "其他费用"],
    '娱乐': ["电影", "电玩", "烧烤", "聚会", "茶酒咖啡", "旅游度假", "运动健身", "花鸟宠物", "歌舞演出", "卡拉OK", "爬山", "露营"],

    '医教': ["就诊", "药剂", "药丸", "急救"],

    '人情': ["红包礼物", "请客", "孝敬", "赠予", "人情其他"],

}
export const accountingInType = [
    '工资', '红包', '兼职外快', '利息', '生活费', '奖金', '赔付款', '基金', '收入',
]



export default function Icons({ name, className }) {

    switch (name) {
        case '工资': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'入账'} width={25} height={25} /></IconBox >;
        case '红包': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'红包'} width={25} height={25} /></IconBox >;
        case '兼职外快': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'通钱'} width={25} height={25} /></IconBox >;
        case '利息': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'银行卡'} width={25} height={25} /></IconBox >;
        case '生活费': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'钱包'} width={25} height={25} /></IconBox >;
        case '奖金': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'小钱袋'} width={25} height={25} /></IconBox >;
        case '赔付款': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'大钱袋'} width={25} height={25} /></IconBox >;
        case '基金': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'基金'} width={25} height={25} /></IconBox >;
        case '收入': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'小猪'} width={25} height={25} /></IconBox >;



        case '餐饮': return <IconBox className={className} name={findFatherType(name)}><Utensils width={22} height={22} /></IconBox >;
        case '早餐': return <IconBox className={className} name={findFatherType(name)}><Sandwich width={22} height={22} /></IconBox >;
        case '夜宵': return <IconBox className={className} name={findFatherType(name)}><Drumstick width={22} height={22} /></IconBox >;
        case '中餐': return <IconBox className={className} name={findFatherType(name)}><Soup width={22} height={22} /></IconBox >;
        case '小吃': return <IconBox className={className} name={findFatherType(name)}><IceCream width={22} height={22} /></IconBox >;
        case '下午茶': return <IconBox className={className} name={findFatherType(name)}><Coffee width={22} height={22} /></IconBox >;
        case '晚餐': return <IconBox className={className} name={findFatherType(name)}><ConciergeBell width={22} height={22} /></IconBox >;
        case '水果': return <IconBox className={className} name={findFatherType(name)}><Apple width={22} height={22} /></IconBox >;
        case '饮料': return <IconBox className={className} name={findFatherType(name)}><Milk width={22} height={22} /></IconBox >;


        case '交通': return <IconBox className={className} name={findFatherType(name)}><Car width={22} height={22} /></IconBox >;
        case '打车': return <IconBox className={className} name={findFatherType(name)}><CarTaxiFront width={22} height={22} /></IconBox >;
        case '公交车': return <IconBox className={className} name={findFatherType(name)}><BusFront width={22} height={22} /></IconBox >;
        case '长途汽车': return <IconBox className={className} name={findFatherType(name)}><Bus width={22} height={22} /></IconBox >;
        case '自行车': return <IconBox className={className} name={findFatherType(name)}><Bike width={22} height={22} /></IconBox >;
        case '飞机': return <IconBox className={className} name={findFatherType(name)}><Plane width={22} height={22} /></IconBox >;
        case '轮船': return <IconBox className={className} name={findFatherType(name)}><Ship width={22} height={22} /></IconBox >;
        case '火车': return <IconBox className={className} name={findFatherType(name)}><TrainFront width={22} height={22} /></IconBox >;
        case '地铁': return <IconBox className={className} name={findFatherType(name)}><TramFront width={22} height={22} /></IconBox >;
        case '油费': return <IconBox className={className} name={findFatherType(name)}><Fuel width={22} height={22} /></IconBox >;
        case '停车费': return <IconBox className={className} name={findFatherType(name)}><ParkingSquare width={22} height={22} /></IconBox >;
        case '修车费': return <IconBox className={className} name={findFatherType(name)}><Forklift width={22} height={22} /></IconBox >;
        case '过路费': return <IconBox className={className} name={findFatherType(name)}><Ticket width={22} height={22} /></IconBox >;


        case '购物': return <IconBox className={className} name={findFatherType(name)}><ShoppingCart width={22} height={22} /></IconBox >;
        case '酒': return <IconBox className={className} name={findFatherType(name)}><Beer width={22} height={22} /></IconBox >;
        case '烟': return <IconBox className={className} name={findFatherType(name)}><Cigarette width={22} height={22} /></IconBox >;
        case '衣服': return <IconBox className={className} name={findFatherType(name)}><Shirt width={22} height={22} /></IconBox >;
        case '婴儿用品': return <IconBox className={className} name={findFatherType(name)}><Baby width={22} height={22} /></IconBox >;
        case '美容化妆': return <IconBox className={className} name={findFatherType(name)}><Palette width={22} height={22} /></IconBox >;
        case '百货': return <IconBox className={className} name={findFatherType(name)}><Bath width={22} height={22} /></IconBox >;
        case '数码产品': return <IconBox className={className} name={findFatherType(name)}><Headphones width={22} height={22} /></IconBox >;
        case '书籍': return <IconBox className={className} name={findFatherType(name)}><Book width={22} height={22} /></IconBox >;
        case '电器': return <IconBox className={className} name={findFatherType(name)}><AirVent width={22} height={22} /></IconBox >;
        case '文具': return <IconBox className={className} name={findFatherType(name)}><Brush width={22} height={22} /></IconBox >;
        case '珠宝首饰': return <IconBox className={className} name={findFatherType(name)}><Gem width={22} height={22} /></IconBox >;
        case '家具': return <IconBox className={className} name={findFatherType(name)}><Refrigerator width={22} height={22} /></IconBox >;


        case '房租': return <IconBox className={className} name={findFatherType(name)}><Home width={22} height={22} /></IconBox >;
        case '电费': return <IconBox className={className} name={findFatherType(name)}><Zap width={22} height={22} /></IconBox >;
        case '美容美发': return <IconBox className={className} name={findFatherType(name)}><Scissors width={22} height={22} /></IconBox >;
        case '报纸': return <IconBox className={className} name={findFatherType(name)}><Newspaper width={22} height={22} /></IconBox >;
        case '话费': return <IconBox className={className} name={findFatherType(name)}><Phone width={22} height={22} /></IconBox >;
        case '婚庆摄影': return <IconBox className={className} name={findFatherType(name)}><Camera width={22} height={22} /></IconBox >;
        case '网费': return <IconBox className={className} name={findFatherType(name)}><RadioTower width={22} height={22} /></IconBox >;
        case '其他费用': return <IconBox className={className} name={findFatherType(name)}><Receipt width={22} height={22} /></IconBox >;


        case '电影': return <IconBox className={className} name={findFatherType(name)}><Film width={22} height={22} /></IconBox >;
        case '电玩': return <IconBox className={className} name={findFatherType(name)}><Gamepad2 width={22} height={22} /></IconBox >;
        case '烧烤': return <IconBox className={className} name={findFatherType(name)}><FlameKindling width={22} height={22} /></IconBox >;
        case '茶酒咖啡': return <IconBox className={className} name={findFatherType(name)}><Coffee width={22} height={22} /></IconBox >;
        case '聚会': return <IconBox className={className} name={findFatherType(name)}><Wine width={22} height={22} /></IconBox >;
        case '旅游度假': return <IconBox className={className} name={findFatherType(name)}><Palmtree width={22} height={22} /></IconBox >;
        case '运动健身': return <IconBox className={className} name={findFatherType(name)}><Dumbbell width={22} height={22} /></IconBox >;
        case '花鸟宠物': return <IconBox className={className} name={findFatherType(name)}><Bird width={22} height={22} /></IconBox >;
        case '歌舞演出': return <IconBox className={className} name={findFatherType(name)}><Drama width={22} height={22} /></IconBox >;
        case '卡拉OK': return <IconBox className={className} name={findFatherType(name)}><Mic2 width={22} height={22} /></IconBox >;
        case '爬山': return <IconBox className={className} name={findFatherType(name)}><Mountain width={22} height={22} /></IconBox >;
        case '露营': return <IconBox className={className} name={findFatherType(name)}><Tent width={22} height={22} /></IconBox >;


        case '就诊': return <IconBox className={className} name={findFatherType(name)}><Stethoscope width={22} height={22} /></IconBox >;
        case '药剂': return <IconBox className={className} name={findFatherType(name)}><Tablets width={22} height={22} /></IconBox >;
        case '药丸': return <IconBox className={className} name={findFatherType(name)}><Pill width={22} height={22} /></IconBox >;
        case '急救': return <IconBox className={className} name={findFatherType(name)}><Cross width={22} height={22} /></IconBox >;

        case '红包礼物': return <IconBox className={className} name={findFatherType(name)}><Gift width={22} height={22} /></IconBox >;
        case '请客': return <IconBox className={className} name={findFatherType(name)}><Soup width={22} height={22} /></IconBox >;
        case '孝敬': return <IconBox className={className} name={findFatherType(name)}><Flower2 width={22} height={22} /></IconBox >;
        case '赠予': return <IconBox className={className} name={findFatherType(name)}><Heart width={22} height={22} /></IconBox >;
        case '人情其他': return <IconBox className={className} name={findFatherType(name)}><BadgeDollarSign width={22} height={22} /></IconBox >;


    }
}


function IconBox({ name, className, children }) {

    const defaultStyle = "rounded-[6px] flex flex-row justify-center items-center h-[38px] w-[38px] ";

    switch (name) {
        case '餐饮': return <div className={cn(defaultStyle, " text-orange-700", className)}>{children}</div>;
        case '交通': return <div className={cn(defaultStyle, " text-green-700", className)}>{children}</div>
        case '日常': return <div className={cn(defaultStyle, " text-red-700", className)}>{children}</div>
        case '购物': return <div className={cn(defaultStyle, " text-sky-700", className)}>{children}</div>
        case '娱乐': return <div className={cn(defaultStyle, " text-purple-700", className)}>{children}</div>
        case '人情': return <div className={cn(defaultStyle, " text-red-700", className)}>{children}</div>
        default: return <div className={cn(defaultStyle, " text-orange-700", className)}>{children}</div>
    }
}
