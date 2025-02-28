import type { NavItem } from '@/interfaces/navItems'
import { getI18N } from '@/languages/index.ts'

export const navItemsProvider = (currentLocale: string | undefined): NavItem[] => {
	const i18n = getI18N({ currentLocale })
	return [
		{
			title: i18n.HOME,
			label: 'home',
			url: '/',
		},
		{
			title: i18n.BLOG,
			label: 'blog',
			url: '/blog',
		},
		{
			title: i18n.PORTFOLIO,
			label: 'portfolio',
			url: '/#portfolio',
		},
		{
			title: i18n.CONTACT,
			label: 'contact',
			url: '#contact',
		},
	]
}
