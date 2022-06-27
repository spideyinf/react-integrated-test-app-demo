import { FC, useState } from 'react';

const HomePage: FC = () => {
  const [loading, setLoading] = useState(false);

  if (loading) return <h2 className="text-center pt-12 text-xl">Loading...</h2>;

  return <div>Home</div>;
};

export default HomePage;
