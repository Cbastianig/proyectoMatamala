

export default function handlerespuesta(res, toast, reset_form) {
    if (res === undefined) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error desconocido durante el proceso, por favor comuniquese con un administrador' });
        return
    }

    if (res.status.toLowerCase() === 'ok') {
        if(res.data) return res.data
        toast.current.show({ severity: 'success', summary: 'Exito', detail: res.message, life: 3000 });
        if (typeof reset_form === 'function') {
            reset_form();
        }
        
        return
    }
    if (res.status === 'error') {
        console.error(res)
        toast.current.show({ severity: 'error', summary: 'Error', detail: res.message });
        return
    }

    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error desconocido durante el proceso, por favor comuniquese con un administrador' });

    return

}