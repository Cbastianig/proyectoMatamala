'use client'

import Errorpage from "../(full-page)/pages/errorpage/page";


export default function GlobalError({ error, reset }) {
 
    return <Errorpage layout error={error} reset={reset}  />;
};


