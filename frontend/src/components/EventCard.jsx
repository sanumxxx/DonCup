const EventCard = ({ name, img_path }) => {
	return (
		<div
			className={`flex flex-col bg-white rounded-2xl shadow-md w-full h-full`}
		>
			<div className='flex flex-col justify-between items-center p-4'>
				<img
					className='w-full aspect-square object-cover rounded-lg'
					src={img_path != null ? img_path : 'https://placehold.co/250x250.png'}
					alt=''
				/>

				<p className={`text-black text-lg font-bold`}>{name}</p>
			</div>
		</div>
	)
}

export default EventCard
