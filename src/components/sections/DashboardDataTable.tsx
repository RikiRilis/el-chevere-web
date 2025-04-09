/* eslint-disable react/react-in-jsx-scope */

import { Dashboard } from '@/icons/Dashboard'
import { Search } from '@/icons/Search'
import { SemiArrow } from '@/icons/SemiArrow'
import { useCallback, useState } from 'preact/hooks'
import debounce from 'just-debounce-it'
import { useDashboardTableDates } from '@/hooks/useDashboardTableDates'
import { useSearch } from '@/hooks/useSearch'

export const DashboardDataTable = ({ numberOfDates }: { numberOfDates: number }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isViewOpen, setIsViewOpen] = useState(false)
	const [nameSort, setNameSort] = useState(false)
	const [dateSort, setDateSort] = useState(false)
	const [timeSort, setTimeSort] = useState(false)
	const [statusSort, setStatusSort] = useState(false)
	const { search, setSearch } = useSearch()
	const { dates, datesShowing, setDatesShowing, loading, searching, setSearching, length } =
		useDashboardTableDates({
			numberOfDates,
			nameSort,
			dateSort,
			timeSort,
			statusSort,
			search,
		})

	const debouncedGetDates = useCallback(
		debounce((newSarch: string | null) => {
			setSearch(newSarch)
			setSearching(false)
		}, 600),
		[setSearch]
	)

	const handleLoad = () => {
		if (!loading) {
			const newValue = datesShowing + numberOfDates

			if (length && length > datesShowing) setDatesShowing(newValue)
		}
	}

	const handleChange = (event: preact.JSX.TargetedEvent<HTMLInputElement, Event>) => {
		event.preventDefault()

		const element = event.target as HTMLInputElement
		const newSearch = element.value

		setSearching(true)
		debouncedGetDates(newSearch)
	}

	const handleNameSort = () => {
		setNameSort((prev) => !prev)
	}

	const handleDateSort = () => {
		setDateSort((prev) => !prev)
	}

	const handleTimeSort = () => {
		setTimeSort((prev) => !prev)
	}

	const handleStatusSort = () => {
		setStatusSort((prev) => !prev)
	}

	const handleActionToggle = () => {
		setIsOpen((prev) => !prev)

		if (isViewOpen) setIsViewOpen(false)
	}

	const handleViewToggle = () => {
		setIsViewOpen((prev) => !prev)

		if (isOpen) setIsOpen(false)
	}

	return (
		<div className='flex w-full max-w-4xl flex-col md:w-11/12 lg:w-8/12'>
			<h2 className='mb-8 flex items-center gap-x-3 text-3xl font-semibold text-primary sm:text-4xl'>
				<Dashboard classes='size-8' />
				Dashboard
			</h2>

			<div className='mb-4 flex w-full items-center justify-between'>
				<div>
					<button
						onClick={handleActionToggle}
						className='inline-flex items-center rounded-lg border border-gray-600 bg-blue-950/20 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-gray-600 hover:bg-secondary/20 focus:outline-none'
						type='button'
					>
						Sort by
						<SemiArrow classes='ms-2.5 rotate-180 size-2.5' />
					</button>

					<button
						onClick={handleViewToggle}
						className='relative ms-2.5 inline-flex items-center rounded-lg border border-gray-600 bg-blue-950/20 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-gray-600 hover:bg-secondary/20 focus:outline-none'
						type='button'
					>
						View
						<SemiArrow classes='ms-2.5 rotate-180 size-2.5' />
					</button>

					<div
						className={`absolute ${isOpen ? '' : 'hidden'} z-10 mt-2 w-44 overflow-hidden rounded-lg bg-accent/10 shadow-sm backdrop-blur-xl`}
					>
						<ul className='text-sm text-gray-200'>
							<li
								onClick={handleNameSort}
								className='block cursor-pointer px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
							>
								Name
							</li>
							<li
								onClick={handleDateSort}
								className='block cursor-pointer px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
							>
								Date
							</li>
							<li
								onClick={handleTimeSort}
								className='block cursor-pointer px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
							>
								Time
							</li>
							<li
								onClick={handleStatusSort}
								className='block cursor-pointer px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
							>
								Status
							</li>
						</ul>
					</div>

					<div
						className={`absolute ${isViewOpen ? '' : 'hidden'} z-10 mt-2 w-44 overflow-hidden rounded-lg bg-accent/10 shadow-sm backdrop-blur-xl`}
					>
						<ul className='text-sm text-gray-200'>
							<li className='block cursor-pointer px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'>
								All dates
							</li>
							<li className='block cursor-pointer px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'>
								Today&apos;s dates
							</li>
							<li className='block cursor-pointer px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'>
								Tomorrow&apos;s dates
							</li>
						</ul>
					</div>
				</div>
				<label>
					<div className='relative'>
						<div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
							<Search classes='size-4 text-secondary' />
						</div>
						<input
							onKeyUp={handleChange}
							type='text'
							id='table-search-users'
							className='block w-52 rounded-lg bg-accent/10 p-2 ps-10 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main md:w-80'
							placeholder='Search for dates'
						/>
					</div>
				</label>
			</div>

			<table className='w-full overflow-hidden rounded-lg text-left text-sm text-primary'>
				<thead className='bg-blue-950/60 text-xs uppercase text-primary'>
					<tr>
						<th scope='col' className='p-4'>
							#
						</th>
						<th scope='col' className='px-6 py-3'>
							Name
						</th>
						<th scope='col' className='px-6 py-3'>
							Phone
						</th>
						<th scope='col' className='px-6 py-3'>
							Date
						</th>
						<th scope='col' className='px-6 py-3'>
							Time
						</th>
						<th scope='col' className='px-6 py-3'>
							Status
						</th>
					</tr>
				</thead>
				<tbody className='bg-blue-950/20'>
					{dates.map((row, idx) => (
						<tr
							key={idx}
							className={`cursor-pointer transition-colors sm:hover:bg-blue-950/30 ${idx % 2 === 0 ? '' : 'bg-blue-950/10'}`}
						>
							<td className='px-6 py-4'>{idx + 1}</td>
							<td className='px-6 py-4'>{row.name}</td>
							<td className='px-6 py-4'>{row.phone}</td>
							<td className='px-6 py-4'>{row.date}</td>
							<td className='px-6 py-4'>{row.time}</td>
							<td className='px-6 py-4'>
								{row.done ? (
									<div className='flex flex-row items-center gap-2'>
										<span className='h-2.5 w-2.5 rounded-full bg-green-500'></span>
										<span>Done</span>
									</div>
								) : (
									<div className='flex flex-row items-center gap-2'>
										<span className='h-2.5 w-2.5 rounded-full bg-orange-500'></span>
										<span>Pending</span>
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
