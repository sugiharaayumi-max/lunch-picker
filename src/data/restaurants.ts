export interface MenuItem {
  name: string;
  price: number;
  description?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  distance: string;
  category: string;
  priceRange: string;
  hours: string;
  color: string;
  menu: MenuCategory[];
}

export const restaurants: Restaurant[] = [
  {
    id: "jiangwonton",
    name: "江家餛飩",
    address: "華美街204號",
    distance: "步行5分鐘",
    category: "台式麵食",
    priceRange: "$",
    hours: "11:30-14:00 / 17:00-19:30（週日休）",
    color: "#F4A261",
    menu: [
      {
        category: "麵類",
        items: [
          { name: "鮮蝦餛飩麵", price: 90, description: "整尾大草蝦，招牌必點" },
          { name: "紅油抄手麵", price: 80 },
          { name: "南投意麵", price: 60 },
          { name: "餛飩湯麵", price: 75 },
        ],
      },
      {
        category: "飯類",
        items: [
          { name: "魯肉飯", price: 35 },
          { name: "蚵仔鹹粥", price: 50 },
        ],
      },
      {
        category: "小點",
        items: [
          { name: "紅油抄手（乾）", price: 65 },
          { name: "鮮蝦餛飩（乾）", price: 75 },
          { name: "滷蛋", price: 15 },
        ],
      },
    ],
  },
  {
    id: "hainan",
    name: "天天來海南雞飯",
    address: "長春街53號",
    distance: "步行5分鐘",
    category: "南洋料理",
    priceRange: "$",
    hours: "11:00-14:30 / 17:00-21:30",
    color: "#E9C46A",
    menu: [
      {
        category: "飯類",
        items: [
          { name: "經典海南雞飯", price: 145 },
          { name: "泰式烤松阪豬飯", price: 165 },
          { name: "泰市場打拋豬飯", price: 135 },
          { name: "經典雙拼（雞＋打拋）", price: 165 },
          { name: "泰泰雙拼（松阪＋打拋）", price: 175 },
        ],
      },
      {
        category: "單點",
        items: [
          { name: "海南雞", price: 75 },
          { name: "泰式松阪豬", price: 85 },
          { name: "雞魯飯", price: 50 },
          { name: "黃金鮮菇", price: 40 },
          { name: "韓式泡菜", price: 40 },
        ],
      },
      {
        category: "飲品",
        items: [
          { name: "天天來紅茶", price: 25 },
          { name: "泰式奶茶", price: 45 },
        ],
      },
    ],
  },
  {
    id: "chickenhonke",
    name: "雞肉本家",
    address: "美村路一段附近",
    distance: "步行5分鐘",
    category: "海南雞飯",
    priceRange: "$",
    hours: "11:00-14:30 / 17:00-21:00",
    color: "#2A9D8F",
    menu: [
      {
        category: "主食",
        items: [
          { name: "海南雞飯", price: 130 },
          { name: "獅子頭飯", price: 140 },
          { name: "海南雞＋獅子頭雙拼", price: 160 },
          { name: "咖哩醬飯", price: 120 },
        ],
      },
      {
        category: "湯品",
        items: [
          { name: "雞高湯", price: 30 },
          { name: "例湯", price: 40 },
        ],
      },
    ],
  },
  {
    id: "yutangchun",
    name: "玉堂春魯肉飯",
    address: "美村路一段220號",
    distance: "步行8分鐘",
    category: "台式小吃",
    priceRange: "$",
    hours: "11:30-14:30 / 17:30-20:30（週三休）",
    color: "#B8E0B9",
    menu: [
      {
        category: "飯麵",
        items: [
          { name: "魯肉飯（小）", price: 35 },
          { name: "魯肉飯（大）", price: 40 },
          { name: "爌肉飯", price: 65 },
          { name: "炸醬麵", price: 65 },
        ],
      },
      {
        category: "小菜",
        items: [
          { name: "豬耳朵", price: 45 },
          { name: "胡麻過貓", price: 55 },
          { name: "招牌豆干", price: 45 },
          { name: "涼拌豆皮絲", price: 35 },
        ],
      },
      {
        category: "湯品",
        items: [
          { name: "芋頭排骨湯", price: 55 },
          { name: "蛤蜊湯", price: 60 },
        ],
      },
    ],
  },
  {
    id: "xiaojuancun",
    name: "小眷村牛肉麵",
    address: "美村路一段164巷14號",
    distance: "步行6分鐘",
    category: "牛肉麵",
    priceRange: "$",
    hours: "11:00-14:30 / 17:00-20:00",
    color: "#E76F51",
    menu: [
      {
        category: "麵類",
        items: [
          { name: "紅燒牛肉麵", price: 150 },
          { name: "清燉牛肉麵", price: 150 },
          { name: "半筋半肉麵", price: 170 },
          { name: "川辣牛肉麵", price: 160 },
          { name: "剝皮辣椒雞湯麵", price: 140 },
          { name: "乾麵", price: 70 },
        ],
      },
      {
        category: "小菜",
        items: [
          { name: "滷蛋", price: 15 },
          { name: "豬頭皮", price: 35 },
          { name: "燙青菜", price: 40 },
          { name: "紅油抄手", price: 55 },
          { name: "水餃（5顆）", price: 40 },
        ],
      },
    ],
  },
  {
    id: "shenshen",
    name: "深森輕食",
    address: "中美街275號",
    distance: "步行8分鐘",
    category: "Poke / 沙拉",
    priceRange: "$$",
    hours: "11:00-15:00 / 17:00-21:00",
    color: "#52B788",
    menu: [
      {
        category: "自由選 Poke Bowl",
        items: [
          { name: "雞肉自由選", price: 170 },
          { name: "生鮭魚自由選", price: 200 },
          { name: "豆腐自由選（蔬食）", price: 150 },
          { name: "海味蝦仁自由選", price: 190 },
        ],
      },
      {
        category: "加料",
        items: [
          { name: "加蛋", price: 20 },
          { name: "加酪梨", price: 30 },
        ],
      },
    ],
  },
  {
    id: "caipot",
    name: "彩碗",
    address: "美村路一段附近",
    distance: "步行10分鐘",
    category: "健康餐碗",
    priceRange: "$$",
    hours: "11:00-21:00",
    color: "#9D4EDD",
    menu: [
      {
        category: "餐碗",
        items: [
          { name: "彩虹餐碗", price: 180 },
          { name: "雞胸肉餐碗", price: 160 },
          { name: "鮭魚餐碗", price: 200 },
          { name: "豆腐蔬食碗", price: 150 },
        ],
      },
    ],
  },
  {
    id: "sevenson",
    name: "7分so",
    address: "華美街附近",
    distance: "步行10分鐘",
    category: "美式漢堡",
    priceRange: "$$",
    hours: "08:30 - 22:00",
    color: "#F77F00",
    menu: [
      {
        category: "早午餐",
        items: [
          { name: "紐約皇后區早午餐", price: 350 },
          { name: "法式土司", price: 220 },
          { name: "起司金三角", price: 200 },
        ],
      },
      {
        category: "漢堡",
        items: [
          { name: "招牌起司漢堡", price: 260 },
          { name: "墨西哥牛肉起司酥餅", price: 280 },
          { name: "蔬食漢堡", price: 240 },
        ],
      },
      {
        category: "主食",
        items: [
          { name: "義大利麵", price: 260 },
          { name: "牛排", price: 380 },
          { name: "烤雞腿排", price: 320 },
        ],
      },
    ],
  },
  {
    id: "jianddian",
    name: "簡擔點",
    address: "美村路一段附近",
    distance: "步行8分鐘",
    category: "台式簡餐",
    priceRange: "$",
    hours: "11:00-14:00 / 17:00-20:00",
    color: "#CDB4DB",
    menu: [
      {
        category: "簡餐",
        items: [
          { name: "當日特餐", price: 120 },
          { name: "雞腿飯", price: 130 },
          { name: "排骨飯", price: 120 },
          { name: "燙青菜飯", price: 100 },
        ],
      },
    ],
  },
  {
    id: "johncook",
    name: "約翰煮的",
    address: "美村路一段附近",
    distance: "步行8分鐘",
    category: "健康氣炸餐",
    priceRange: "$",
    hours: "10:00-20:00",
    color: "#4CC9F0",
    menu: [
      {
        category: "氣炸套餐",
        items: [
          { name: "氣炸雞排套餐", price: 140 },
          { name: "豆包套餐", price: 125 },
          { name: "法式烤腿排套餐", price: 150 },
          { name: "鮭魚套餐", price: 190 },
          { name: "雞豬雙拼套餐", price: 160 },
          { name: "韓式壽喜牛套餐", price: 175 },
        ],
      },
      {
        category: "單點",
        items: [
          { name: "義大利烤雞", price: 120 },
          { name: "氣炸雞排", price: 90 },
        ],
      },
    ],
  },
  {
    id: "subway",
    name: "賽百味 Subway",
    address: "美村路一段附近",
    distance: "步行5分鐘",
    category: "潛艇堡",
    priceRange: "$",
    hours: "09:00 - 22:00",
    color: "#006A4E",
    menu: [
      {
        category: "6吋潛艇堡",
        items: [
          { name: "義式BMT", price: 155 },
          { name: "烤雞", price: 135 },
          { name: "鮪魚", price: 135 },
          { name: "素食蔬菜德利", price: 115 },
          { name: "烤牛肉", price: 155 },
        ],
      },
      {
        category: "12吋潛艇堡",
        items: [
          { name: "義式BMT", price: 235 },
          { name: "烤雞", price: 205 },
          { name: "鮪魚", price: 205 },
        ],
      },
      {
        category: "套餐加購",
        items: [
          { name: "飲料＋洋芋片", price: 55 },
          { name: "飲料＋餅乾", price: 55 },
        ],
      },
    ],
  },
  {
    id: "burgerking",
    name: "漢堡王",
    address: "美村路一段附近",
    distance: "步行5分鐘",
    category: "速食",
    priceRange: "$",
    hours: "10:00 - 22:00",
    color: "#D62828",
    menu: [
      {
        category: "招牌漢堡",
        items: [
          { name: "華堡", price: 79 },
          { name: "雙層華堡", price: 119 },
          { name: "脆雞堡", price: 69 },
          { name: "辣雞堡", price: 69 },
        ],
      },
      {
        category: "套餐",
        items: [
          { name: "華堡套餐（含薯條＋飲料）", price: 179 },
          { name: "雙層華堡套餐", price: 219 },
          { name: "脆雞堡套餐", price: 169 },
        ],
      },
      {
        category: "其他",
        items: [
          { name: "薯條（中）", price: 49 },
          { name: "雞塊（6塊）", price: 59 },
          { name: "可口可樂（中）", price: 39 },
        ],
      },
    ],
  },
  {
    id: "mos",
    name: "摩斯漢堡",
    address: "美村路一段附近",
    distance: "步行5分鐘",
    category: "速食",
    priceRange: "$",
    hours: "07:00 - 22:00",
    color: "#C1121F",
    menu: [
      {
        category: "漢堡",
        items: [
          { name: "摩斯漢堡（牛肉）", price: 75 },
          { name: "珍珠堡", price: 65 },
          { name: "辣味燒肉堡", price: 85 },
          { name: "海鮮堡", price: 85 },
          { name: "素食米漢堡", price: 69 },
        ],
      },
      {
        category: "套餐",
        items: [
          { name: "摩斯漢堡套餐（薯條＋飲料）", price: 155 },
          { name: "珍珠堡套餐", price: 145 },
        ],
      },
      {
        category: "輕食",
        items: [
          { name: "玉米濃湯", price: 45 },
          { name: "薯條（中）", price: 49 },
          { name: "洋蔥圈", price: 49 },
        ],
      },
    ],
  },
  {
    id: "lightbox",
    name: "青輕盒食",
    address: "美村路一段94號",
    distance: "步行3分鐘",
    category: "健康盒食",
    priceRange: "$",
    hours: "10:30-14:30 / 17:00-21:00",
    color: "#95D5B2",
    menu: [
      {
        category: "盒食",
        items: [
          { name: "泰式手撕雞盒食", price: 140 },
          { name: "香嫩雞腿排盒食", price: 150 },
          { name: "鮭魚盒食", price: 170 },
          { name: "蔬食盒食", price: 120 },
        ],
      },
      {
        category: "加購",
        items: [
          { name: "加蛋", price: 15 },
          { name: "加飲料", price: 30 },
        ],
      },
    ],
  },
  {
    id: "dongshan",
    name: "東山餃子館",
    address: "美村路一段附近",
    distance: "步行10分鐘",
    category: "水餃 / 麵食",
    priceRange: "$",
    hours: "11:00-14:00 / 17:00-20:30",
    color: "#FFC8DD",
    menu: [
      {
        category: "水餃",
        items: [
          { name: "高麗菜水餃（10顆）", price: 65 },
          { name: "韭黃豬肉水餃（10顆）", price: 70 },
          { name: "鮮蝦水餃（10顆）", price: 85 },
        ],
      },
      {
        category: "麵類",
        items: [
          { name: "刀削麵", price: 80 },
          { name: "麻辣麵", price: 90 },
          { name: "酸辣湯麵", price: 80 },
        ],
      },
      {
        category: "小菜",
        items: [
          { name: "涼拌小黃瓜", price: 35 },
          { name: "滷豆干", price: 35 },
          { name: "酸辣湯", price: 40 },
        ],
      },
    ],
  },
  {
    id: "shufang",
    name: "蔬房",
    address: "美村路一段附近",
    distance: "步行8分鐘",
    category: "蔬食 / 素食",
    priceRange: "$",
    hours: "11:00-14:00 / 17:00-20:00",
    color: "#80B918",
    menu: [
      {
        category: "蔬食簡餐",
        items: [
          { name: "蔬食咖哩飯", price: 130 },
          { name: "麻婆豆腐飯", price: 120 },
          { name: "素排骨飯", price: 120 },
          { name: "炒時蔬飯", price: 110 },
        ],
      },
      {
        category: "麵食",
        items: [
          { name: "蔬食麻辣燙", price: 140 },
          { name: "素麵線", price: 80 },
        ],
      },
    ],
  },
  {
    id: "renshi",
    name: "飪室咖哩",
    address: "美村路一段149巷19號",
    distance: "步行5分鐘",
    category: "印度咖哩",
    priceRange: "$$",
    hours: "11:30-14:30 / 17:00-20:00",
    color: "#F7C59F",
    menu: [
      {
        category: "咖哩飯",
        items: [
          { name: "初次認識咖哩", price: 250, description: "溫和口味，適合初嚐" },
          { name: "菠菜咖哩", price: 250, description: "印度傳統菠菜咖哩" },
          { name: "醬爆咖哩", price: 250, description: "香辣醬爆" },
          { name: "堅果咖哩", price: 250, description: "堅果香氣濃郁" },
        ],
      },
      {
        category: "配料",
        items: [
          { name: "甩餅", price: 60 },
          { name: "烤雞 / 炸雞", price: 160 },
          { name: "沙拉", price: 150 },
        ],
      },
      {
        category: "套餐升級",
        items: [
          { name: "加購套餐（飲品＋甩餅）", price: 79, description: "任一咖哩飯加價" },
        ],
      },
    ],
  },
  {
    id: "hecho",
    name: "做咖啡 hecho",
    address: "美村路一段149巷12號",
    distance: "步行5分鐘",
    category: "早午餐 / 義式",
    priceRange: "$$",
    hours: "10:30 - 21:30",
    color: "#A8D8EA",
    menu: [
      {
        category: "早午餐",
        items: [
          { name: "手撕豬班尼迪克蛋", price: 380 },
          { name: "經典法式吐司", price: 240 },
        ],
      },
      {
        category: "主食",
        items: [
          { name: "海鮮燉飯", price: 360 },
          { name: "義大利麵", price: 280 },
          { name: "義式街頭披薩", price: 260 },
        ],
      },
      {
        category: "輕食",
        items: [
          { name: "經典松露薯條", price: 230 },
          { name: "燉牛肉", price: 320 },
        ],
      },
      {
        category: "飲品",
        items: [
          { name: "手沖咖啡", price: 150 },
          { name: "鳳梨萊姆冰美式", price: 150 },
        ],
      },
    ],
  },
  {
    id: "smilecurry",
    name: "微笑咖哩",
    address: "美村路一段806號",
    distance: "步行12分鐘",
    category: "日式咖哩",
    priceRange: "$",
    hours: "11:00-13:30 / 17:00-20:00（週二休）",
    color: "#DDA0DD",
    menu: [
      {
        category: "炸物咖哩",
        items: [
          { name: "焗烤牛肉咖哩", price: 240 },
          { name: "和風唐揚炸雞咖哩", price: 240 },
          { name: "滑蛋日式炸蝦咖哩", price: 240 },
          { name: "日式里肌炸豬排咖哩", price: 220 },
          { name: "北海道南瓜可樂餅咖哩", price: 220 },
          { name: "香酥炸雞排咖哩", price: 180 },
          { name: "香酥炸魚排咖哩", price: 180 },
        ],
      },
      {
        category: "燉煮咖哩",
        items: [
          { name: "嫩豬咖哩", price: 120, description: "附湯＋飲料" },
          { name: "雙拼咖哩（雞＋牛）", price: 160, description: "附湯＋飲料" },
        ],
      },
      {
        category: "加料",
        items: [
          { name: "日式超嫩滑蛋", price: 20 },
          { name: "鮮蔬咖哩", price: 190 },
        ],
      },
    ],
  },
];
