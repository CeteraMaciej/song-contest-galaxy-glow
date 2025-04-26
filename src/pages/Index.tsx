
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage';

const Index = () => {
  const navigate = useNavigate();
  
  // Just render the HomePage directly
  return <HomePage />;
};

export default Index;
