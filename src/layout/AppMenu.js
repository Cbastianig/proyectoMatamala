
import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model = [

        {
            label: 'Inicio',
            icon: 'pi pi-home',

            items: [{ label: 'Dashboard', icon: 'pi pi-home', to: 'dashboard', },
            { label: 'Dashboard GIS', icon: 'pi pi-chart-bar', to: 'dashboard-gis', },]
        },


    ];


    return <AppSubMenu model={model} />;
};

export default AppMenu;
