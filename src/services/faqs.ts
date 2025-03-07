import type { Faq } from '@/interfaces/faqs'
import { getI18N } from '@/languages/index'

export const getFaqs = (currentLocale: string | undefined): Faq[] => {
	const i18n = getI18N({ currentLocale })

	return [
		{
			answers: [
				'La principal diferencia radica en la fecha que se le entregan las fotos.',
				'Las fotos digitales, tomadas antes de las 5:00 PM, se les entregarán al cliente en el trascurso del mismo día, dentro del horario laboral: 8:00 AM - 7:00 PM.',
				'Las fotos de tiempo, tomadas en el horario laboral: 8:00 AM - 7:00 PM, se les entregarán al cliente de manera física, con la marca de agua del estiudio, en un plazo de 2 a 3 días, dependiendo de la complicidad de las fotos seleccionadas.',
			],
			question: '¿Cuáles diferencias existen entre el proceso "digital" y el proceso "de tiempo?"',
		},
		{
			answers: ['A'],
			question: 'asd',
		},
		{
			answers: ['A'],
			question: 'asd',
		},
		{
			answers: ['A'],
			question: 'asd',
		},
		{
			answers: ['A'],
			question: 'asd',
		},
		{
			answers: ['A'],
			question: 'asd',
		},
	]
}
