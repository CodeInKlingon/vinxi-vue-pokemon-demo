import { renderToString } from "vue/server-renderer";
import { eventHandler } from "vinxi/server";
import { createApp } from "./main";
import { getManifest } from "vinxi/manifest";

export default eventHandler(async (event) => {
	const clientManifest = getManifest("client");
	const assets = await clientManifest.inputs[clientManifest.handler].assets();

	let assetsString = assets.map((a) => renderAsset(a)).join("\n");
	const manifestJson = await clientManifest.json();

	const [app, router] = createApp(true);

	router.push(event.node.req.url!);
	await router.isReady();

	const html = await renderToString(app);

	return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Vue + TS</title>
        <script src="https://cdn.tailwindcss.com"></script>

        ${assetsString}
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.manifest = ${JSON.stringify(manifestJson)}
        </script>
        <script
          type="module"
          src="${clientManifest.inputs[clientManifest.handler].output.path}"
        ></script>
      </body>
    </html>`;
});

function objectToHTMLAttributes(obj: Record<string, string>) {
	return Object.keys(obj)
		.map((key) => `${key}="${obj[key]}"`)
		.join(" ");
}
export function renderAsset(asset: any) {
	return `<${asset.tag} ${
		asset.attrs ? objectToHTMLAttributes(asset.attrs) : ""
	} >${asset.children ? asset.children : ""}</${asset.tag}>`;
}
