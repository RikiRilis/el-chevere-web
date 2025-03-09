import type { NavItem } from '@/interfaces/navItems'
import { getI18N } from '@/languages/index.ts'
import type { Philosophy } from '../interfaces/philosophy'
import Home from '@/icons/Home.astro'
import Date from '@/icons/Date.astro'
import PhotoLibrary from '@/icons/PhotoLibrary.astro'
import Chat from '@/icons/Chat.astro'

export const navItemsProvider = (currentLocale: string | undefined): NavItem[] => {
	const i18n = getI18N({ currentLocale })
	return [
		{
			title: i18n.HOME,
			label: 'home',
			url: '/',
			icon: Home,
		},
		{
			title: i18n.DATES,
			label: 'dates',
			url: '/schedule',
			icon: Date,
		},
		{
			title: i18n.PORTFOLIO,
			label: 'portfolio',
			url: '/#portfolio',
			icon: PhotoLibrary,
		},
		{
			title: i18n.CONTACT,
			label: 'contact',
			url: '#contact',
			icon: Chat,
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
				'Capturar la esencia y la conexión única de cada familia a través de imágenes auténticas y llenas de emoción.',
			icon: '🚀',
		},
		{
			title: i18n.OUR_VISION,
			description:
				'Ser el estudio fotográfico de referencia donde las familias crean y preservan sus recuerdos más valiosos.',
			icon: '🌍',
		},
		{
			title: i18n.OUR_VALUES,
			description:
				'Integridad, Innovación, Respeto, Transparencia, Amabilidad, Compañerismo, Calidad, Responsabilidad',
			icon: '💡',
		},
	]
}
