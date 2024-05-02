
import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model = [

        {
            label: 'Inicio',
            icon: 'pi pi-home',

            items: [{ label: 'Dashboard', icon: 'pi pi-home', to: 'dashboard', },
            { label: 'Productos', icon: 'pi pi-chart-bar', to: 'Crud_Productos', },]
        },


    ];


    return <AppSubMenu model={model} />;
};

export default AppMenu;
