import { GROUPID } from "../util/settings/Config";
import { baseService } from "./BaseSevice";


export class QuanLyNguoiDungService extends baseService{
    constructor(){
        super();
    }

    dangNhap =(thongTinDangNhap)=>{//taiKhaon:'', matKhau:''
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
    }

    dangKy=(thongTinNguoiDung)=>{
        return this.post('/api/QuanLyNguoiDung/DangKy',thongTinNguoiDung);
    }
    
    layLichSuDatVe = ()=>{
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
}

export const QLNguoiDungService = new QuanLyNguoiDungService();