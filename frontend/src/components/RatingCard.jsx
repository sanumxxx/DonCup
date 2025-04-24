import React from 'react'
import { useNavigate } from 'react-router-dom'

const RatingCard = ({ place, username, category, img_path }) => {
	return (
		<div className='flex flex-col w-[95%] mx-auto rounded-2xl bg-white shadow-md'>
			<div className='flex items-center h-16 p-4  '>
				<p className='w-1/7'>{place}</p>
				<div className='w-1/7'>
					<img
						className='h-full rounded-full'
						src={img_path != null ? img_path : 'https://placehold.co/50x50.png'}
						alt=''
					/>
				</div>

				<p className='w-4/7'>{username}</p>
				<p className='w-1/7'>{category}</p>
			</div>
		</div>
	)
}

export default RatingCard
