import 'vinxi/client';

import { createApp } from './main';

const [app, router] = createApp(false);

router.isReady().then(() => {
	//router is ready. hydrate vue client
	app.mount('#app');
});
