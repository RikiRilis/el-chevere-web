import type { Schedule } from '@/interfaces/schedule'

export const getSchedule = (): Schedule[] => {
	return [
		{
			id: '8-00',
			available: true,
			hour: '8:00',
		},
		{
			id: '8-40',
			available: true,
			hour: '8:40',
		},
		{
			id: '9-20',
			available: true,
			hour: '9:20',
		},
		{
			id: '10-00',
			available: true,
			hour: '10:00',
		},
		{
			id: '10-40',
			available: true,
			hour: '10:40',
		},
		{
			id: '11-20',
			available: true,
			hour: '11:20',
		},
		{
			id: '12-00',
			available: true,
			hour: '12:00',
		},
		{
			id: '12-40',
			available: true,
			hour: '12:40',
		},
		{
			id: '13-20',
			available: true,
			hour: '13:20',
		},
		{
			id: '14-00',
			available: true,
			hour: '14:00',
		},
		{
			id: '14-40',
			available: true,
			hour: '14:40',
		},
		{
			id: '15-20',
			available: true,
			hour: '3:20',
		},
		{
			id: '16-00',
			available: true,
			hour: '16:00',
		},
		{
			id: '4-40-pm',
			available: true,
			hour: '4:40 PM',
		},
		{
			id: '17-20',
			available: true,
			hour: '17:20',
		},
		{
			id: '18-00',
			available: true,
			hour: '18:00',
		},
	]
}
