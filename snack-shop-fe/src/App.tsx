import { useEffect, useState } from 'react';
import { Header } from './Components/Header'
import { Wrapper } from './Components/Wrapper';
import { Box, Text } from '@chakra-ui/react';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForSnacks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/snacks`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let snackData = await response.json();
        setData(snackData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForSnacks();
  }, []);

  return (
    <Wrapper>
      <Header headingText="Snack Shop" />
      <Box>
        {loading && (
          <Text>Loading snacks...</Text>
        )}
        {error && <Text>{error}</Text>}
      </Box>
          {data &&
            data.map(({_id, snackName, details}) => (
                <Box id={_id} bg='green.100' p={4}>
                  <Text>{snackName}</Text>
                  <Text>{details.flavour}</Text>
                  <Text>{details.weight}</Text>
                </Box>
            ))}
    </Wrapper>
  )
};

export default App;