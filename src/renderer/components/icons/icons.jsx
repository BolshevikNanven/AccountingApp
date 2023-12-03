import {
    Utensils, Drumstick, Bike, Dumbbell, Coffee, Car, BusFront, CarTaxiFront, TramFront,
    Apple, Plane, Ship, TrainFront, Bus, ParkingSquare, Forklift, Ticket, ConciergeBell, Baby, Gem, Refrigerator,
    Bath, Fuel, Newspaper, Phone, Headphones, Film, ShoppingCart, FlameKindling, Mountain, Tent,
    Sandwich, IceCream, Bird, Beer, Cigarette, AirVent, Shirt, Book, Brush,
    Palette, Stethoscope, Tablets, Pill, Cross, Soup,
    Milk, Home, Zap, Scissors, Receipt, Camera, Gift, Flower2, RadioTower, BadgeDollarSign, Heart,
    Gamepad2, Palmtree, Drama, Mic2, Wine, Droplet, Cookie, Library
} from "lucide-react"


import { cn, findFatherType } from "../../lib/utils";
import ExtraIcon from "./extraIcon";

export const accountingOutType = {
    '餐饮': ["餐饮", "早餐", "中餐", "晚餐", "小吃", "下午茶", "夜宵", "水果", "零食", "饮料"],
    '交通': ["交通", "打车", "公交车", '长途汽车', "骑行", "飞机", "轮船", "火车", "地铁", "油费", "停车费", "修车费", "过路费"],
    '购物': ["购物", "酒", "烟", "衣服", "婴儿用品", "美容化妆", "百货", "数码产品", "书籍", "电器", "文具", "珠宝首饰", "家具"],
    '日常': ["房租", "电费", "水费", "美容美发", "报纸", "话费", "婚庆摄影", "网费", "其他费用"],
    '娱乐': ["电影", "电玩", "烧烤", "聚会", "茶酒咖啡", "旅游度假", "运动健身", "花鸟宠物", "歌舞演出", "卡拉OK", "爬山", "露营"],

    '医教': ["就诊", "药", "医疗费用", "学杂费"],

    '人情': ["红包礼物", "请客", "孝敬", "赠予", "人情其他"],

}
export const accountingInType = [
    '工资', '红包', '兼职外快', '利息', '生活费', '奖金', '赔付款', '基金', '收入',
]



export default function Icons({ name, className, size = 22 }) {

    switch (name) {
        case '工资': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'入账'} width={size + 3} height={size + 3} /></IconBox >;
        case '红包': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'红包'} width={size + 3} height={size + 3} /></IconBox >;
        case '兼职外快': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'通钱'} width={size + 3} height={size + 3} /></IconBox >;
        case '利息': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'银行卡'} width={size + 3} height={size + 3} /></IconBox >;
        case '生活费': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'钱包'} width={size + 3} height={size + 3} /></IconBox >;
        case '奖金': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'小钱袋'} width={size + 3} height={size + 3} /></IconBox >;
        case '赔付款': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'大钱袋'} width={size + 3} height={size + 3} /></IconBox >;
        case '基金': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'基金'} width={size + 3} height={size + 3} /></IconBox >;
        case '收入': return <IconBox className={className} name={findFatherType(name)}><ExtraIcon name={'小猪'} width={size + 3} height={size + 3} /></IconBox >;



        case '餐饮': return <IconBox className={className} name={findFatherType(name)}><Utensils width={size} height={size} /></IconBox >;
        case '早餐': return <IconBox className={className} name={findFatherType(name)}><Sandwich width={size} height={size} /></IconBox >;
        case '夜宵': return <IconBox className={className} name={findFatherType(name)}><Drumstick width={size} height={size} /></IconBox >;
        case '中餐': return <IconBox className={className} name={findFatherType(name)}><Soup width={size} height={size} /></IconBox >;
        case '小吃': return <IconBox className={className} name={findFatherType(name)}><IceCream width={size} height={size} /></IconBox >;
        case '下午茶': return <IconBox className={className} name={findFatherType(name)}><Coffee width={size} height={size} /></IconBox >;
        case '晚餐': return <IconBox className={className} name={findFatherType(name)}><ConciergeBell width={size} height={size} /></IconBox >;
        case '零食': return <IconBox className={className} name={findFatherType(name)}><Cookie width={size} height={size} /></IconBox >;
        case '水果': return <IconBox className={className} name={findFatherType(name)}><Apple width={size} height={size} /></IconBox >;
        case '饮料': return <IconBox className={className} name={findFatherType(name)}><Milk width={size} height={size} /></IconBox >;


        case '交通': return <IconBox className={className} name={findFatherType(name)}><Car width={size} height={size} /></IconBox >;
        case '打车': return <IconBox className={className} name={findFatherType(name)}><CarTaxiFront width={size} height={size} /></IconBox >;
        case '公交车': return <IconBox className={className} name={findFatherType(name)}><BusFront width={size} height={size} /></IconBox >;
        case '长途汽车': return <IconBox className={className} name={findFatherType(name)}><Bus width={size} height={size} /></IconBox >;
        case '骑行': return <IconBox className={className} name={findFatherType(name)}><Bike width={size} height={size} /></IconBox >;
        case '飞机': return <IconBox className={className} name={findFatherType(name)}><Plane width={size} height={size} /></IconBox >;
        case '轮船': return <IconBox className={className} name={findFatherType(name)}><Ship width={size} height={size} /></IconBox >;
        case '火车': return <IconBox className={className} name={findFatherType(name)}><TrainFront width={size} height={size} /></IconBox >;
        case '地铁': return <IconBox className={className} name={findFatherType(name)}><TramFront width={size} height={size} /></IconBox >;
        case '油费': return <IconBox className={className} name={findFatherType(name)}><Fuel width={size} height={size} /></IconBox >;
        case '停车费': return <IconBox className={className} name={findFatherType(name)}><ParkingSquare width={size} height={size} /></IconBox >;
        case '修车费': return <IconBox className={className} name={findFatherType(name)}><Forklift width={size} height={size} /></IconBox >;
        case '过路费': return <IconBox className={className} name={findFatherType(name)}><Ticket width={size} height={size} /></IconBox >;


        case '购物': return <IconBox className={className} name={findFatherType(name)}><ShoppingCart width={size} height={size} /></IconBox >;
        case '酒': return <IconBox className={className} name={findFatherType(name)}><Beer width={size} height={size} /></IconBox >;
        case '烟': return <IconBox className={className} name={findFatherType(name)}><Cigarette width={size} height={size} /></IconBox >;
        case '衣服': return <IconBox className={className} name={findFatherType(name)}><Shirt width={size} height={size} /></IconBox >;
        case '婴儿用品': return <IconBox className={className} name={findFatherType(name)}><Baby width={size} height={size} /></IconBox >;
        case '美容化妆': return <IconBox className={className} name={findFatherType(name)}><Palette width={size} height={size} /></IconBox >;
        case '百货': return <IconBox className={className} name={findFatherType(name)}><Bath width={size} height={size} /></IconBox >;
        case '数码产品': return <IconBox className={className} name={findFatherType(name)}><Headphones width={size} height={size} /></IconBox >;
        case '书籍': return <IconBox className={className} name={findFatherType(name)}><Book width={size} height={size} /></IconBox >;
        case '电器': return <IconBox className={className} name={findFatherType(name)}><AirVent width={size} height={size} /></IconBox >;
        case '文具': return <IconBox className={className} name={findFatherType(name)}><Brush width={size} height={size} /></IconBox >;
        case '珠宝首饰': return <IconBox className={className} name={findFatherType(name)}><Gem width={size} height={size} /></IconBox >;
        case '家具': return <IconBox className={className} name={findFatherType(name)}><Refrigerator width={size} height={size} /></IconBox >;


        case '房租': return <IconBox className={className} name={findFatherType(name)}><Home width={size} height={size} /></IconBox >;
        case '电费': return <IconBox className={className} name={findFatherType(name)}><Zap width={size} height={size} /></IconBox >;
        case '水费': return <IconBox className={className} name={findFatherType(name)}><Droplet width={size} height={size} /></IconBox >;
        case '美容美发': return <IconBox className={className} name={findFatherType(name)}><Scissors width={size} height={size} /></IconBox >;
        case '报纸': return <IconBox className={className} name={findFatherType(name)}><Newspaper width={size} height={size} /></IconBox >;
        case '话费': return <IconBox className={className} name={findFatherType(name)}><Phone width={size} height={size} /></IconBox >;
        case '婚庆摄影': return <IconBox className={className} name={findFatherType(name)}><Camera width={size} height={size} /></IconBox >;
        case '网费': return <IconBox className={className} name={findFatherType(name)}><RadioTower width={size} height={size} /></IconBox >;
        case '其他费用': return <IconBox className={className} name={findFatherType(name)}><Receipt width={size} height={size} /></IconBox >;


        case '电影': return <IconBox className={className} name={findFatherType(name)}><Film width={size} height={size} /></IconBox >;
        case '电玩': return <IconBox className={className} name={findFatherType(name)}><Gamepad2 width={size} height={size} /></IconBox >;
        case '烧烤': return <IconBox className={className} name={findFatherType(name)}><FlameKindling width={size} height={size} /></IconBox >;
        case '茶酒咖啡': return <IconBox className={className} name={findFatherType(name)}><Coffee width={size} height={size} /></IconBox >;
        case '聚会': return <IconBox className={className} name={findFatherType(name)}><Wine width={size} height={size} /></IconBox >;
        case '旅游度假': return <IconBox className={className} name={findFatherType(name)}><Palmtree width={size} height={size} /></IconBox >;
        case '运动健身': return <IconBox className={className} name={findFatherType(name)}><Dumbbell width={size} height={size} /></IconBox >;
        case '花鸟宠物': return <IconBox className={className} name={findFatherType(name)}><Bird width={size} height={size} /></IconBox >;
        case '歌舞演出': return <IconBox className={className} name={findFatherType(name)}><Drama width={size} height={size} /></IconBox >;
        case '卡拉OK': return <IconBox className={className} name={findFatherType(name)}><Mic2 width={size} height={size} /></IconBox >;
        case '爬山': return <IconBox className={className} name={findFatherType(name)}><Mountain width={size} height={size} /></IconBox >;
        case '露营': return <IconBox className={className} name={findFatherType(name)}><Tent width={size} height={size} /></IconBox >;


        case '就诊': return <IconBox className={className} name={findFatherType(name)}><Stethoscope width={size} height={size} /></IconBox >;
        case '药': return <IconBox className={className} name={findFatherType(name)}><Pill width={size} height={size} /></IconBox >;
        case '医疗费用': return <IconBox className={className} name={findFatherType(name)}><Cross width={size} height={size} /></IconBox >;
        case '学杂费': return <IconBox className={className} name={findFatherType(name)}><Library width={size} height={size} /></IconBox >;

        case '红包礼物': return <IconBox className={className} name={findFatherType(name)}><Gift width={size} height={size} /></IconBox >;
        case '请客': return <IconBox className={className} name={findFatherType(name)}><Soup width={size} height={size} /></IconBox >;
        case '孝敬': return <IconBox className={className} name={findFatherType(name)}><Flower2 width={size} height={size} /></IconBox >;
        case '赠予': return <IconBox className={className} name={findFatherType(name)}><Heart width={size} height={size} /></IconBox >;
        case '人情其他': return <IconBox className={className} name={findFatherType(name)}><BadgeDollarSign width={size} height={size} /></IconBox >;


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
