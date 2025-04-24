import React from 'react'
import { useNavigate } from 'react-router-dom'

const RatingCard = ({ place, username, category }) => {
	return (
		<div className='flex flex-col w-[95%] mx-auto rounded-2xl bg-white shadow-lg'>
			<div className='grid grid-cols-7 items-center h-16 p-4  '>
				<p className='col-span-1'>{place}</p>
				<p className='col-span-4'>{username}</p>
				<p className='col-span-2'>{category}</p>
			</div>
		</div>
	)
}

export default RatingCard
