const EventCard = ({ name }) => {
	return (
		<div
			className={`flex flex-col bg-white rounded-2xl shadow-lg w-full h-full`}
		>
			<div className='flex flex-col justify-between items-center p-4'>
				<img
					className='w-full rounded-lg'
					src='https://placehold.co/600x400.png'
					alt=''
				/>
				<p className={`text-black text-lg font-bold`}>{name}</p>
			</div>
		</div>
	)
}

export default EventCard
