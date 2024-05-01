'use client'


import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';


const Button_volver = ({ loading }) => {
 
    const router = useRouter()
    const volver_fn = () => {
        router.back();
    }
    return (
        <Button label="Volver" type="button" icon="pi pi-arrow-left" onClick={volver_fn} severity="danger" loading={loading !== undefined ? loading : false} />
    );
};

export default Button_volver;
