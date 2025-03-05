import type { NavItem } from '@/interfaces/navItems'
import { getI18N } from '@/languages/index.ts'
import type { Philosophy } from '../interfaces/philosophy'

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

export const philosophy = (currentLocale: string | undefined): Philosophy[] => {
	const i18n = getI18N({ currentLocale })

	return [
		{
			title: i18n.OUR_MISSION,
			description:
				'Empowering individuals and businesses with innovative solutions that drive growth, efficiency, and success.',
			icon: '🚀',
		},
		{
			title: i18n.OUR_VISION,
			description:
				'To be the leading force in technological advancements, shaping a better future for the global community.',
			icon: '🌍',
		},
		{
			title: i18n.OUR_VALUES,
			description:
				'Integrity, Innovation, and Excellence—these principles guide our every decision and action.',
			icon: '💡',
		},
	]
}
