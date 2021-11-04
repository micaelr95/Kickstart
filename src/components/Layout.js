import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <Container>{children}</Container>
  </div>
);

export default Layout;
