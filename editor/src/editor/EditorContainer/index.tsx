import * as React from "react"

import * as PIXI from 'pixi.js'
import throttle from 'lodash/throttle'
import bunny from "../assets/bunny.png"

function pixiAimation(params: any) {
    const app = new PIXI.Application({
        backgroundColor: 0xffffff,
        resizeTo: params.dom,
    });
    
    const container = new PIXI.Container();

    app.stage.addChild(container);

    // Create a new texture
    const texture = PIXI.Texture.from(bunny);

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 25; i++) {
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5);
        bunny.x = (i % 5) * 40;
        bunny.y = Math.floor(i / 5) * 40;
        container.addChild(bunny);
    }

    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    // Listen for animate update
    app.ticker.add((delta) => {
        // rotate the container!
        // use delta to create frame-independent transform
        container.rotation -= 0.01 * delta;

        // Move container to the center
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;
    });

    return app;
}

export function EditorContainer() {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const appRef = React.useRef<PIXI.Application | null>(null);

    const resizeHandler = throttle(() => {
        console.log(appRef.current?.screen)
        if (appRef.current)
            appRef.current.resize();
    }, 1000)

    React.useEffect(() => {
        if (ref.current) {
            appRef.current = pixiAimation({
                dom: ref.current,
            });
            ref.current.appendChild(appRef.current.view);
        }

        resizeHandler();
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    }, [])

    return <div ref={ref} style={{
        width: "100%",
        height: "100%"
    }} />
}
