import Router from './routes';

// theme
import ThemeConfig from './theme/globalStyles';
import { Card, CardContent, CardHeader, Container } from '@mui/material';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function App() {

useEffect(()=>{console.warn("HI")})
  return (<>
      <ThemeConfig >
        <Container maxWidth="lg">
          <Card>
            <CardContent>
              <p>Welcome to React with TypeScript and Material Design!</p>
            </CardContent>
          </Card>
        </Container>
      </ThemeConfig>
  </>

  );
}