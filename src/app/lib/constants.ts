// src/app/lib/constants.ts

export const PROVINCES = {
    // Bangkok and vicinity
    'กรุงเทพมหานคร': { english: 'Bangkok', region: 'กรุงเทพฯ และปริมณฑล' },
    'นนทบุรี': { english: 'Nonthaburi', region: 'กรุงเทพฯ และปริมณฑล' },
    'ปทุมธานี': { english: 'Pathum Thani', region: 'กรุงเทพฯ และปริมณฑล' },
    'สมุทรปราการ': { english: 'Samut Prakan', region: 'กรุงเทพฯ และปริมณฑล' },
    'สมุทรสาคร': { english: 'Samut Sakhon', region: 'กรุงเทพฯ และปริมณฑล' },
    'นครปฐม': { english: 'Nakhon Pathom', region: 'กรุงเทพฯ และปริมณฑล' },
  
    // Central
    'พระนครศรีอยุธยา': { english: 'Ayutthaya', region: 'ภาคกลาง' },
    'อ่างทอง': { english: 'Ang Thong', region: 'ภาคกลาง' },
    'ลพบุรี': { english: 'Lopburi', region: 'ภาคกลาง' },
    'สิงห์บุรี': { english: 'Sing Buri', region: 'ภาคกลาง' },
    'ชัยนาท': { english: 'Chai Nat', region: 'ภาคกลาง' },
    'สระบุรี': { english: 'Saraburi', region: 'ภาคกลาง' },
    'ชลบุรี': { english: 'Chonburi', region: 'ภาคกลาง' },
    'ระยอง': { english: 'Rayong', region: 'ภาคกลาง' },
    'จันทบุรี': { english: 'Chanthaburi', region: 'ภาคกลาง' },
    'ตราด': { english: 'Trat', region: 'ภาคกลาง' },
    'ฉะเชิงเทรา': { english: 'Chachoengsao', region: 'ภาคกลาง' },
    'ปราจีนบุรี': { english: 'Prachinburi', region: 'ภาคกลาง' },
    'นครนายก': { english: 'Nakhon Nayok', region: 'ภาคกลาง' },
    'สระแก้ว': { english: 'Sa Kaeo', region: 'ภาคกลาง' },
    'ราชบุรี': { english: 'Ratchaburi', region: 'ภาคกลาง' },
    'กาญจนบุรี': { english: 'Kanchanaburi', region: 'ภาคกลาง' },
    'สุพรรณบุรี': { english: 'Suphan Buri', region: 'ภาคกลาง' },
    'สมุทรสงคราม': { english: 'Samut Songkhram', region: 'ภาคกลาง' },
    'เพชรบุรี': { english: 'Phetchaburi', region: 'ภาคกลาง' },
    'ประจวบคีรีขันธ์': { english: 'Prachuap Khiri Khan', region: 'ภาคกลาง' },
  
    // North
    'เชียงใหม่': { english: 'Chiang Mai', region: 'ภาคเหนือ' },
    'ลำพูน': { english: 'Lamphun', region: 'ภาคเหนือ' },
    'ลำปาง': { english: 'Lampang', region: 'ภาคเหนือ' },
    'อุตรดิตถ์': { english: 'Uttaradit', region: 'ภาคเหนือ' },
    'แพร่': { english: 'Phrae', region: 'ภาคเหนือ' },
    'น่าน': { english: 'Nan', region: 'ภาคเหนือ' },
    'พะเยา': { english: 'Phayao', region: 'ภาคเหนือ' },
    'เชียงราย': { english: 'Chiang Rai', region: 'ภาคเหนือ' },
    'แม่ฮ่องสอน': { english: 'Mae Hong Son', region: 'ภาคเหนือ' },
    'นครสวรรค์': { english: 'Nakhon Sawan', region: 'ภาคเหนือ' },
    'อุทัยธานี': { english: 'Uthai Thani', region: 'ภาคเหนือ' },
    'กำแพงเพชร': { english: 'Kamphaeng Phet', region: 'ภาคเหนือ' },
    'ตาก': { english: 'Tak', region: 'ภาคเหนือ' },
    'สุโขทัย': { english: 'Sukhothai', region: 'ภาคเหนือ' },
    'พิษณุโลก': { english: 'Phitsanulok', region: 'ภาคเหนือ' },
    'พิจิตร': { english: 'Phichit', region: 'ภาคเหนือ' },
    'เพชรบูรณ์': { english: 'Phetchabun', region: 'ภาคเหนือ' },
  
    // Northeast
    'นครราชสีมา': { english: 'Nakhon Ratchasima', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'บุรีรัมย์': { english: 'Buriram', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'สุรินทร์': { english: 'Surin', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'ศรีสะเกษ': { english: 'Sisaket', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'อุบลราชธานี': { english: 'Ubon Ratchathani', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'ยโสธร': { english: 'Yasothon', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'ชัยภูมิ': { english: 'Chaiyaphum', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'อำนาจเจริญ': { english: 'Amnat Charoen', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'หนองบัวลำภู': { english: 'Nong Bua Lamphu', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'ขอนแก่น': { english: 'Khon Kaen', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'อุดรธานี': { english: 'Udon Thani', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'เลย': { english: 'Loei', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'หนองคาย': { english: 'Nong Khai', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'มหาสารคาม': { english: 'Maha Sarakham', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'ร้อยเอ็ด': { english: 'Roi Et', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'กาฬสินธุ์': { english: 'Kalasin', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'สกลนคร': { english: 'Sakon Nakhon', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'นครพนม': { english: 'Nakhon Phanom', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'มุกดาหาร': { english: 'Mukdahan', region: 'ภาคตะวันออกเฉียงเหนือ' },
    'บึงกาฬ': { english: 'Bueng Kan', region: 'ภาคตะวันออกเฉียงเหนือ' },
  
    // South
    'นครศรีธรรมราช': { english: 'Nakhon Si Thammarat', region: 'ภาคใต้' },
    'กระบี่': { english: 'Krabi', region: 'ภาคใต้' },
    'พังงา': { english: 'Phang Nga', region: 'ภาคใต้' },
    'ภูเก็ต': { english: 'Phuket', region: 'ภาคใต้' },
    'สุราษฎร์ธานี': { english: 'Surat Thani', region: 'ภาคใต้' },
    'ระนอง': { english: 'Ranong', region: 'ภาคใต้' },
    'ชุมพร': { english: 'Chumphon', region: 'ภาคใต้' },
    'สงขลา': { english: 'Songkhla', region: 'ภาคใต้' },
    'สตูล': { english: 'Satun', region: 'ภาคใต้' },
    'ตรัง': { english: 'Trang', region: 'ภาคใต้' },
    'พัทลุง': { english: 'Phatthalung', region: 'ภาคใต้' },
    'ปัตตานี': { english: 'Pattani', region: 'ภาคใต้' },
    'ยะลา': { english: 'Yala', region: 'ภาคใต้' },
    'นราธิวาส': { english: 'Narathiwat', region: 'ภาคใต้' }
  }
  
  export const REGIONS = [
    'กรุงเทพฯ และปริมณฑล',
    'ภาคกลาง',
    'ภาคเหนือ',
    'ภาคตะวันออกเฉียงเหนือ',
    'ภาคใต้'
  ]
  
  export const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  
  export const YEARS = [62, 63, 64, 65, 66, 67]
  
  export const SOURCES = [
    'ปตท',
    'บางจาก',
    'ยูนิคแก๊ส',
    'สยามแก๊ส',
    'ไออาร์พีซี',
    'ดับบลิวพี เอ็นเนอร์ยี่',
    'บิ๊กแก๊ส',
    'ปตท. น้ำมันและการค้าปลีก',
    'พีเอพี แก๊ส วัน',
    'ออร์คิดแก๊ส',
    'อูโน่ แก๊ส',
    'เอ็นเอส แก๊ส',
    'แอตลาส เอ็นเนอยี'
  ]

export const PROVINCE_MAPPING = {
    'TH10': 'กรุงเทพมหานคร',
    'TH11': 'สมุทรปราการ',
    'TH12': 'นนทบุรี', 
    'TH13': 'ปทุมธานี',
    'TH14': 'พระนครศรีอยุธยา',
    'TH15': 'อ่างทอง',
    'TH16': 'ลพบุรี',
    'TH17': 'สิงห์บุรี',
    'TH18': 'ชัยนาท',
    'TH19': 'สระบุรี',
    'TH20': 'ชลบุรี',
    'TH21': 'ระยอง',
    'TH22': 'จันทบุรี', 
    'TH23': 'ตราด',
    'TH24': 'ฉะเชิงเทรา',
    'TH25': 'ปราจีนบุรี',
    'TH26': 'นครนายก',
    'TH27': 'สระแก้ว',
    'TH30': 'นครราชสีมา',
    'TH31': 'บุรีรัมย์',
    'TH32': 'สุรินทร์',
    'TH33': 'ศรีสะเกษ',
    'TH34': 'อุบลราชธานี',
    'TH35': 'ยโสธร',
    'TH36': 'ชัยภูมิ',
    'TH37': 'อำนาจเจริญ',
    'TH38': 'บึงกาฬ',
    'TH39': 'หนองบัวลำภู',
    'TH40': 'ขอนแก่น',
    'TH41': 'อุดรธานี',
    'TH42': 'เลย',
    'TH43': 'หนองคาย',
    'TH44': 'มหาสารคาม',
    'TH45': 'ร้อยเอ็ด',
    'TH46': 'กาฬสินธุ์',
    'TH47': 'สกลนคร',
    'TH48': 'นครพนม',
    'TH49': 'มุกดาหาร',
    'TH50': 'เชียงใหม่',
    'TH51': 'ลำพูน',
    'TH52': 'ลำปาง',
    'TH53': 'อุตรดิตถ์',
    'TH54': 'แพร่',
    'TH55': 'น่าน',
    'TH56': 'พะเยา',
    'TH57': 'เชียงราย',
    'TH58': 'แม่ฮ่องสอน',
    'TH60': 'นครสวรรค์',
    'TH61': 'อุทัยธานี',
    'TH62': 'กำแพงเพชร',
    'TH63': 'ตาก',
    'TH64': 'สุโขทัย',
    'TH65': 'พิษณุโลก',
    'TH66': 'พิจิตร',
    'TH67': 'เพชรบูรณ์',
    'TH70': 'ราชบุรี',
    'TH71': 'กาญจนบุรี',
    'TH72': 'สุพรรณบุรี',
    'TH73': 'นครปฐม',
    'TH74': 'สมุทรสาคร',
    'TH75': 'สมุทรสงคราม',
    'TH76': 'เพชรบุรี',
    'TH77': 'ประจวบคีรีขันธ์',
    'TH80': 'นครศรีธรรมราช',
    'TH81': 'กระบี่',
    'TH82': 'พังงา',
    'TH83': 'ภูเก็ต',
    'TH84': 'สุราษฎร์ธานี',
    'TH85': 'ระนอง',
    'TH86': 'ชุมพร',
    'TH90': 'สงขลา',
    'TH91': 'สตูล',
    'TH92': 'ตรัง',
    'TH93': 'พัทลุง',
    'TH94': 'ปัตตานี',
    'TH95': 'ยะลา',
    'TH96': 'นราธิวาส'
}