import { tabs } from './tabs.js';
import { tabsButtons } from './view.js';

tabsButtons.forEach((tabsBtn) => {
	tabsBtn.addEventListener('click', tabs);
});
