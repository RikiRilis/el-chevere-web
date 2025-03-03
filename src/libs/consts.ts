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
			title: i18n.DATES,
			label: 'dates',
			url: '/schedule',
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

export const businessEmail = 'fotoestudioelchevere@hotmail.com'
export const businessInstagram = 'https://instagram.com/fotoestudioelchevere/'
export const businessWhatsApp = 'https://wa.me/18095734173'
