'use client';

import Head from 'next/head';
import React, { useState, createContext, useEffect } from 'react';

const get_menu_mode = () => {
    const tipo_menu = typeof window !== 'undefined' ? window.localStorage.getItem('tipo_menu') : null;
    if (tipo_menu) return tipo_menu;
    return 'static';
}
const get_escala_ = () => {
    const escala = typeof window !== 'undefined' ? window.localStorage.getItem('escala') : null;
    if (escala) return parseInt(escala);

    return 14;
}


const get_anchored = () => {
    const anchor = typeof window !== 'undefined' ? window.localStorage.getItem('anchor') : null;
    if (anchor) return anchor;
    return false;

}

export const LayoutContext = createContext({});

export const LayoutProvider = (props) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [layoutConfig, setLayoutConfig] = useState({
        ripple: true,
        inputStyle: 'outlined',
        menuMode: get_menu_mode(),
        colorScheme: props.modo,
        theme: props.tema,
        scale: get_escala_()
    });
    const [path, setPath] = useState(props.path);
   

    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        overlaySubmenuActive: false,
        rightMenuVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        searchBarActive: false,
        resetMenu: false,
        sidebarActive: false,
        anchored: get_anchored(),
        rightMenuActive: false
    });
    useEffect(() => {
        if (get_anchored()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                sidebarActive: true
            }))
        }


    }, []);

    const onMenuToggle = (event) => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: !prevLayoutState.overlayMenuActive
            }));
        }
        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
            }));
        } else {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
            }));

            event.preventDefault();
        }
    };

    const hideOverlayMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        }));
    };

    const toggleSearch = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: !layoutState.searchBarActive
        }));
    };

    const onSearchHide = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            searchBarActive: false
        }));
    };

    const showRightSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuActive: true
        }));
        hideOverlayMenu();
    };

    const showConfigSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            configSidebarVisible: true
        }));
    };
    const showSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            rightMenuVisible: true
        }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isSlim = () => {
        return layoutConfig.menuMode === 'slim';
    };

    const isSlimPlus = () => {
        return layoutConfig.menuMode === 'slim-plus';
    };

    const isHorizontal = () => {
        return layoutConfig.menuMode === 'horizontal';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        path,
        layoutState,
        setLayoutState,
        isSlim,
        isSlimPlus,
        isHorizontal,
        isDesktop,
        onMenuToggle,
        toggleSearch,
        onSearchHide,
        showRightSidebar,
        breadcrumbs,
        setBreadcrumbs,
        showConfigSidebar,
        showSidebar
    };


    return (
        <LayoutContext.Provider value={value}>
            <>
                {props.children}
            </>
        </LayoutContext.Provider>
    );
};
