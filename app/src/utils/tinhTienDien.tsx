
function toFixed(value:number, precision:number):string {
  var power = Math.pow(10, precision || 0);
  return (Math.round(value * power + 0.0000001) / power).toFixed(precision);
}

 const giaDien = [
  {
    level: 1,
    gia: 1.728,
    total_kWh: 50,
  },
  {
    level: 2,
    gia: 1.786,
    total_kWh: 50,
  },
  {
    level: 3,
    gia: 2.074,
    total_kWh: 100,
  },
  {
    level: 4,
    gia: 2.612,
    total_kWh: 100,
  },
  {
    level: 5,
    gia: 2.919,
    total_kWh: 100,
  }
]


function tinhTienDien(soDien:number):string {
 
  let tongTien = 0;

  for (let i = 0; i < giaDien.length; i++){
    if (soDien <= 0) {
      break;
    }

    let gia;

    if (soDien > giaDien[i].total_kWh) {
      
      gia = giaDien[i].gia * giaDien[i].total_kWh
    } else {
      gia = soDien * giaDien[i].gia
    }


    tongTien += gia;
    soDien -= giaDien[i].total_kWh;
  }

  //tiền điện bậc 6
  if (soDien > 0) {
    tongTien += soDien * 3.015
  }

  tongTien = tongTien + tongTien * (10 / 100);

 

  return toFixed(tongTien,3);
  
}


export default tinhTienDien;