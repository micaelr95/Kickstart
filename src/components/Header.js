import { Icon, Menu } from 'semantic-ui-react';
import Link from 'next/link';

const Header = () => (
  <Menu>
    <Link href='/'>
      <a className='item'>CrowdCoin</a>
    </Link>
    <Menu.Menu position='right'>
      <Link href='/'>
        <a className='item'>Campaigns</a>
      </Link>
      <Link href='/campaign/new'>
        <a className='item'>
          <Icon name='add'></Icon>
        </a>
      </Link>
    </Menu.Menu>
  </Menu>
);

export default Header;
