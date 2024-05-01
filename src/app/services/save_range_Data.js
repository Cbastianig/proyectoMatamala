
import { save_storage } from "@/localstore";
import cookieCutter from 'cookie-cutter'
export async function save_range(range_name, range) {
    save_storage(range_name, JSON.stringify(range));
}
export async function save_range_coockie(range_name, range) {
    cookieCutter.set(range_name, JSON.stringify(range))

}

