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
  walkingMinutes: number;
  category: string;
  priceRange: string;
  hours: string;
  color: string;
  imageUrl?: string;
  closedDays?: number[]; // 0=日,1=一,2=二,3=三,4=四,5=五,6=六
  menu: MenuCategory[];
}

export const isOpenToday = (restaurant: Restaurant): boolean => {
  const today = new Date().getDay();
  return !(restaurant.closedDays ?? []).includes(today);
};

export const getTodayRecommendations = (all: Restaurant[], count = 5): Restaurant[] => {
  const open = all.filter(isOpenToday);
  // 用今天日期當 seed，讓同一天結果一致
  const seed = parseInt(new Date().toISOString().split("T")[0].replace(/-/g, ""));
  const shuffled = [...open].sort((a, b) => {
    const ha = Math.sin(seed + a.id.charCodeAt(0)) * 10000;
    const hb = Math.sin(seed + b.id.charCodeAt(0)) * 10000;
    return (ha - Math.floor(ha)) - (hb - Math.floor(hb));
  });
  return shuffled.slice(0, count);
};

export const calcAvgPrice = (restaurant: Restaurant): number => {
  const items = restaurant.menu.flatMap((c) => c.items);
  if (items.length === 0) return 0;
  return Math.round(items.reduce((s, i) => s + i.price, 0) / items.length);
};

export const restaurants: Restaurant[] = [
  {
    id: "jiangwonton",
    name: "富子江家餛飩",
    address: "健行路1004號",
    walkingMinutes: 8,
    category: "台式麵食",
    priceRange: "$",
    hours: "11:30-14:00 / 17:00-19:30（週日休）",
    color: "#F4A261",
    closedDays: [0],
    imageUrl: "https://pic.pimg.tw/toyadailylife/1661183458-2263931451-g.jpg",
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
    walkingMinutes: 5,
    category: "南洋料理",
    priceRange: "$",
    hours: "11:00-14:30 / 17:00-21:30",
    color: "#E9C46A",
    imageUrl: "https://cdn.hippolife.tw/wp-content/uploads/2024/05/29164255/%E9%A4%90%E9%BB%9E%E9%96%8B%E7%AE%B1-2.webp",
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
    walkingMinutes: 5,
    category: "海南雞飯",
    priceRange: "$",
    hours: "11:00-14:30 / 17:00-21:00",
    color: "#2A9D8F",
    imageUrl: "https://pic.pimg.tw/youngmusic/1755876468-3251533475-g_l.jpg",
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
    walkingMinutes: 8,
    category: "台式小吃",
    priceRange: "$",
    hours: "11:30-14:30 / 17:30-20:30（週三休）",
    color: "#B8E0B9",
    closedDays: [3],
    imageUrl: "https://candylife.tw/wp-content/uploads/20230320084607_81.jpg",
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
    walkingMinutes: 6,
    category: "牛肉麵",
    priceRange: "$",
    hours: "11:00-14:30 / 17:00-20:00",
    color: "#E76F51",
    imageUrl: "https://candylife.tw/wp-content/uploads/20200711183422_94.jpg",
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
    walkingMinutes: 8,
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
    walkingMinutes: 10,
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
    walkingMinutes: 10,
    category: "美式漢堡",
    priceRange: "$$",
    hours: "08:30 - 22:00",
    color: "#F77F00",
    imageUrl: "https://img.chiaoda.com/20210325001119_22.jpg",
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
    walkingMinutes: 8,
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
    walkingMinutes: 8,
    category: "健康氣炸餐",
    priceRange: "$",
    hours: "10:00-20:00",
    color: "#4CC9F0",
    imageUrl: "https://img.vickeywei.com//2020/09/1600923233-847a536ee77a3b638954f0afcac46997.jpg",
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
    walkingMinutes: 5,
    category: "潛艇堡",
    priceRange: "$",
    hours: "09:00 - 22:00",
    color: "#006A4E",
    imageUrl: "https://subway.com.tw/GoWeb2/UploadImages/20190628123049-1580450345cd2786146683-p01.jpg",
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
    walkingMinutes: 5,
    category: "速食",
    priceRange: "$",
    hours: "10:00 - 22:00",
    color: "#D62828",
    imageUrl: "https://burgerkingimage.azureedge.net/product/10006_new.png",
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
    walkingMinutes: 5,
    category: "速食",
    priceRange: "$",
    hours: "07:00 - 22:00",
    color: "#C1121F",
    imageUrl: "https://www.mos.com.tw/upload/product/20260422_110702_093.jpg",
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
    walkingMinutes: 3,
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
    name: "山東餃子牛肉麵館",
    address: "公益路94號",
    walkingMinutes: 10,
    category: "水餃 / 麵食",
    priceRange: "$",
    hours: "11:00-14:00 / 17:00-20:30",
    color: "#FFC8DD",
    imageUrl: "https://misshuan.tw/wp-content/uploads/20180808231440_67.jpg",
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
    name: "TG蔬坊 The Greenery",
    address: "公益路68號B1（勤美誠品地下）",
    walkingMinutes: 5,
    category: "蔬食 / 沙拉",
    priceRange: "$",
    hours: "11:00-21:30",
    color: "#80B918",
    imageUrl: "https://thegreenerytw.com/wp-content/uploads/2023/10/20230719_0006.jpg",
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
    walkingMinutes: 5,
    category: "印度咖哩",
    priceRange: "$$",
    hours: "11:30-14:30 / 17:00-20:00",
    color: "#F7C59F",
    imageUrl: "https://nash.tw/wp-content/uploads/20201019234849_12-scaled.jpg",
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
    walkingMinutes: 5,
    category: "早午餐 / 義式",
    priceRange: "$$",
    hours: "10:30 - 21:30",
    color: "#A8D8EA",
    imageUrl: "https://media.lyes.tw/photo/sj/sj_hzybptlocuy5p/o.jpg",
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
    walkingMinutes: 12,
    category: "日式咖哩",
    priceRange: "$",
    hours: "11:00-13:30 / 17:00-20:00（週二休）",
    color: "#DDA0DD",
    closedDays: [2],
    imageUrl: "https://i0.wp.com/abrabbit.com/wp-content/uploads/flickr/36625413596_d116f191d5_o.jpg?resize=1024%2C684&quality=100&ssl=1",
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
  {
    id: "jianchen",
    name: "見橙拉仔麵",
    address: "博館東街16號",
    walkingMinutes: 12,
    category: "台式麵食",
    priceRange: "$",
    hours: "11:00-19:00",
    color: "#E9C46A",
    imageUrl: "https://sharonyes.com/wp-content/uploads/2021/07/20210723000307_37.jpg",
    menu: [
      {
        category: "麵飯",
        items: [
          { name: "招牌拉仔麵", price: 40 },
          { name: "虱目魚麵", price: 80 },
          { name: "豬油拌飯", price: 50 },
          { name: "月見豬油拌飯便當", price: 110 },
          { name: "瓜仔肉飯", price: 55 },
          { name: "塔香豬肉飯", price: 60 },
        ],
      },
      {
        category: "小菜",
        items: [
          { name: "菜脯蛋", price: 30 },
          { name: "滷味", price: 35 },
          { name: "蝦捲", price: 40 },
          { name: "燙青菜", price: 30 },
        ],
      },
      {
        category: "湯品",
        items: [
          { name: "蘿蔔湯", price: 30 },
        ],
      },
    ],
  },
  {
    id: "lusine",
    name: "L'USiNE Café",
    address: "忠誠街69號",
    walkingMinutes: 8,
    category: "早午餐",
    priceRange: "$$",
    hours: "07:30-17:00（週一休）",
    color: "#E8D5B7",
    closedDays: [1],
    imageUrl: "https://img.chiaoda.com/20221024232033_98.jpg",
    menu: [
      {
        category: "早午餐",
        items: [
          { name: "焦糖牛肉三明治", price: 280 },
          { name: "南蠻雞腿排早午餐", price: 320 },
          { name: "法式吐司", price: 220 },
          { name: "歐式早午餐盤", price: 290 },
        ],
      },
      {
        category: "飲品",
        items: [
          { name: "拿鐵", price: 130 },
          { name: "美式咖啡", price: 110 },
          { name: "手沖", price: 150 },
        ],
      },
    ],
  },
  {
    id: "day2night",
    name: "Day2night噴水熱狗堡",
    address: "公益路245號",
    walkingMinutes: 8,
    category: "熱狗／美式",
    priceRange: "$",
    hours: "10:00-03:00",
    color: "#E63946",
    imageUrl: "https://weshares.com.tw/wp-content/uploads/2025/06/20250602144433_0_261b4b.jpg",
    menu: [
      {
        category: "熱狗堡",
        items: [
          { name: "招牌美式熱狗", price: 120 },
          { name: "起司墨西哥辣椒熱狗堡", price: 150 },
          { name: "起司肉醬堡", price: 150 },
        ],
      },
      {
        category: "早午餐",
        items: [
          { name: "脆皮雞腿總匯", price: 180 },
          { name: "奶油煎厚吐司", price: 120 },
          { name: "炒泡麵", price: 100 },
        ],
      },
    ],
  },
  {
    id: "asap",
    name: "as soon as pasta",
    address: "中美街363巷14號",
    walkingMinutes: 8,
    category: "義大利麵",
    priceRange: "$$$",
    hours: "12:00-14:00 / 17:30-20:30（週三休）",
    color: "#457B9D",
    closedDays: [3],
    imageUrl: "https://live.staticflickr.com/65535/53623518632_f3b50ca3d2_c.jpg",
    menu: [
      {
        category: "義大利麵",
        items: [
          { name: "每日特製手工義大利麵", price: 380, description: "菜單每日不同" },
          { name: "創意風味義大利麵", price: 420 },
        ],
      },
      {
        category: "燉飯",
        items: [
          { name: "每日特製燉飯", price: 380 },
        ],
      },
    ],
  },
  {
    id: "zazhi",
    name: "雜誌食事處",
    address: "博館二街57號",
    walkingMinutes: 12,
    category: "丼物",
    priceRange: "$$",
    hours: "11:00-20:00（週五休）",
    color: "#2D6A4F",
    closedDays: [5],
    imageUrl: "https://farm66.static.flickr.com/65535/55065203708_db30174aa2_c.jpg",
    menu: [
      {
        category: "丼飯",
        items: [
          { name: "鮭魚丼", price: 270 },
          { name: "鮪魚丼", price: 270 },
          { name: "綜合海鮮丼", price: 320 },
          { name: "炸蝦丼", price: 280 },
        ],
      },
      {
        category: "吃到飽附餐",
        items: [
          { name: "炸物無限", price: 0, description: "內用低消270元含炸物小菜飲料" },
        ],
      },
    ],
  },
  {
    id: "mofan",
    name: "魔飯食堂",
    address: "模範街76號",
    walkingMinutes: 10,
    category: "台式便當",
    priceRange: "$",
    hours: "11:00-20:00",
    color: "#8D6E63",
    menu: [
      {
        category: "便當飯類",
        items: [
          { name: "排骨飯", price: 90 },
          { name: "滷肉飯", price: 50 },
          { name: "陽春麵", price: 50 },
          { name: "什錦炒飯", price: 80 },
        ],
      },
      {
        category: "小菜湯品",
        items: [
          { name: "水餃（5顆）", price: 35 },
          { name: "燙青菜", price: 30 },
          { name: "例湯", price: 20 },
        ],
      },
    ],
  },
  {
    id: "addiction",
    name: "Addiction嗜吃",
    address: "忠明南路92號",
    walkingMinutes: 10,
    category: "義式料理",
    priceRange: "$$$",
    hours: "11:30-14:30 / 17:30-21:00",
    color: "#6D6875",
    imageUrl: "https://xaioyue.com/wp-content/uploads/2023/03/20230325140742_92.jpg",
    menu: [
      {
        category: "義大利麵",
        items: [
          { name: "海鮮義大利麵", price: 380 },
          { name: "白醬培根麵", price: 340 },
          { name: "青醬松子麵", price: 320 },
        ],
      },
      {
        category: "主食",
        items: [
          { name: "唐揚炸雞", price: 320 },
          { name: "燉飯", price: 360 },
        ],
      },
    ],
  },
  {
    id: "magickitchen",
    name: "魔法健康廚房",
    address: "中美街347號",
    walkingMinutes: 8,
    category: "健康餐盒",
    priceRange: "$",
    hours: "10:00-19:30",
    color: "#52B788",
    menu: [
      {
        category: "健康餐盒",
        items: [
          { name: "舒肥雞胸餐盒", price: 130 },
          { name: "減醣餐盒", price: 140 },
          { name: "水煮餐盒", price: 120 },
          { name: "溫沙拉餐盒", price: 150 },
          { name: "水果餐盒", price: 110 },
        ],
      },
      {
        category: "飲品",
        items: [
          { name: "果昔", price: 80 },
        ],
      },
    ],
  },
  {
    id: "xiangshangbeef",
    name: "向上牛肉麵",
    address: "中美街203號",
    walkingMinutes: 12,
    category: "牛肉麵/熱炒",
    priceRange: "$",
    hours: "10:30-21:30（週二休）",
    color: "#A0522D",
    closedDays: [2],
    imageUrl: "https://misshuan.tw/wp-content/uploads/20180530233646_48.jpg",
    menu: [
      {
        category: "麵食",
        items: [
          { name: "牛肉麵", price: 120 },
          { name: "炒烏龍麵", price: 65 },
          { name: "牛肉燴飯", price: 80 },
          { name: "蛋花湯", price: 25 },
        ],
      },
      {
        category: "小菜",
        items: [
          { name: "煙燻豬耳朵", price: 40 },
          { name: "蒸餃（6顆）", price: 50 },
          { name: "滷蛋", price: 15 },
        ],
      },
    ],
  },
  {
    id: "nanxianghainan",
    name: "南香海南雞飯",
    address: "中美街397號",
    walkingMinutes: 18,
    category: "南洋料理",
    priceRange: "$",
    hours: "11:00-14:00 / 17:00-20:30",
    color: "#F4C430",
    imageUrl: "https://misshuan.tw/wp-content/uploads/20180914180305_78.jpg",
    menu: [
      {
        category: "主食",
        items: [
          { name: "海南雞飯", price: 80, description: "整隻大雞腿，附小黃瓜豆芽菜" },
          { name: "炒粿條", price: 100, description: "馬來風味越吃越刷嘴" },
          { name: "荷包蛋", price: 15 },
        ],
      },
      {
        category: "湯品",
        items: [
          { name: "馬來風味肉骨茶（小）", price: 100 },
          { name: "蝦醬空心菜", price: 100 },
        ],
      },
    ],
  },
  {
    id: "guangwei",
    name: "廣味燒臘快餐",
    address: "中美街328號",
    walkingMinutes: 15,
    category: "燒臘便當",
    priceRange: "$",
    hours: "10:45-14:30 / 16:40-20:00（週一休）",
    color: "#C0392B",
    closedDays: [1],
    imageUrl: "https://img.sant.tw/1599914965-aa353e19c572f7566caaf52323ea23c.jpg",
    menu: [
      {
        category: "便當（附兩青菜＋酸菜）",
        items: [
          { name: "三寶飯（烤鴨＋油雞＋臘腸）", price: 100, description: "35年老店人氣第一" },
          { name: "叉燒飯", price: 90 },
          { name: "烤鴨飯", price: 90 },
          { name: "油雞飯", price: 90 },
          { name: "烤鴨腿飯", price: 100 },
          { name: "油雞腿飯", price: 100 },
        ],
      },
      {
        category: "加點",
        items: [
          { name: "滷蛋", price: 10 },
        ],
      },
    ],
  },
  {
    id: "ramenzero",
    name: "麵屋零 ZERO",
    address: "向上路一段245巷9號",
    walkingMinutes: 15,
    category: "日式拉麵",
    priceRange: "$$",
    hours: "11:30-14:00 / 17:30-20:30（週三休）",
    color: "#2C3E50",
    closedDays: [3],
    imageUrl: "https://misshuan.tw/wp-content/uploads/20180609165852_19.jpg",
    menu: [
      {
        category: "招牌拉麵",
        items: [
          { name: "野菜二郎蒜香豚骨拉麵", price: 250, description: "人氣第一，大量蒜酥豆芽高麗菜" },
          { name: "香菜麻辣拉麵", price: 250, description: "自製麻辣醬，辛香爽口" },
          { name: "濃厚豚骨拉麵", price: 230, description: "東池袋大勝軒師承" },
          { name: "元祖日式沾麵", price: 200 },
          { name: "醬油拉麵", price: 140 },
        ],
      },
      {
        category: "小食",
        items: [
          { name: "炸雞塊", price: 100 },
          { name: "綜合可樂餅", price: 80 },
        ],
      },
    ],
  },
  {
    id: "mianmian",
    name: "麵麵俱到",
    address: "美村路一段159號",
    walkingMinutes: 5,
    category: "台式麵食",
    priceRange: "$",
    hours: "11:30-14:00 / 17:00-21:00（週六休）",
    color: "#8B5E3C",
    closedDays: [6],
    imageUrl: "https://pic.pimg.tw/lily20038160911/1469258836-4095654228_n.jpg",
    menu: [
      {
        category: "湯麵",
        items: [
          { name: "蔬菜麵", price: 120, description: "竹筍、豆腐、白蘿蔔、木耳、蛋等多種蔬菜" },
          { name: "上湯海鮮麵", price: 100, description: "蝦、花枝、蛤蜊、鵪鶉蛋" },
          { name: "鮮肉餛飩麵", price: 80 },
          { name: "什錦鍋燒意麵", price: 100 },
          { name: "古早味麵", price: 50 },
        ],
      },
      {
        category: "乾麵",
        items: [
          { name: "雙醬麵", price: 70 },
          { name: "牛肉乾拌麵", price: 90 },
          { name: "麻醬麵", price: 60 },
        ],
      },
      {
        category: "小菜",
        items: [
          { name: "滷豆腐", price: 30 },
          { name: "滷蛋", price: 15 },
          { name: "燙青菜", price: 35 },
        ],
      },
    ],
  },
];

