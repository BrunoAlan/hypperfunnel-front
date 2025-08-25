type DestinationsProps = {
  destinations: string[];
};

export const Destinations = ({ destinations }: DestinationsProps) => {
  return (
    <div className='space-y-3'>
      <h3 className='font-semibold text-gray-900'>Available destinations:</h3>
      <div className='space-y-2'>
        {destinations.map((destination: string, idx: number) => (
          <p key={idx} className='text-gray-700 bg-gray-50 p-3 rounded-lg'>
            🌍 {destination}
          </p>
        ))}
      </div>
    </div>
  );
};
