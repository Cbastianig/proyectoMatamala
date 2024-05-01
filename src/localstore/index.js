export const save_storage = (mode_name, mode) => {
    // guardar aqui tipo menu

    window.localStorage.setItem(mode_name, mode)
    window.localStorage.setItem('config', true)

}
