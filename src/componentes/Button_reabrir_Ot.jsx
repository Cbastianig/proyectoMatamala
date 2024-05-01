'use client'

import { cambia_estado_ot_by_idot } from "@/app/lib/actions/Comunes/ot/actions_estados_ot";
import handlerespuesta from "@/app/services/handleRes";
import { Button } from "primereact/button"
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import React, { useEffect, useRef, useState } from "react";


export default function Button_reabrir_Ot({ id_ot, tabla, nombre_estado_tabla, toast , visible}) {



    const confirm = (event) => {

        confirmPopup({
            target: event.currentTarget,
            message: 'Esta seguro de que desea reabrir la orden de trabajo?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: ' Si ',
            accept: () => accept(),
            reject
        });
    };
    const accept = async () => {

        const res = await cambia_estado_ot_by_idot(id_ot, tabla, nombre_estado_tabla)
        await handlerespuesta(res, toast)


    };

    const reject = () => {

    };


    return (
        <>
            <ConfirmPopup />
            <Button visible={visible} label={'Reabrir Ot'} icon="pi pi-clock" onClick={(event) => { confirm(event) }} className="mr-2" />

        </>
    )

}