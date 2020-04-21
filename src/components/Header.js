import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content">
        <h1>
          Blake's Travel Map
        </h1>
        <p className="header-subtitle">
          <a target= "_blank" href="https://blakegreen.dev">
            <FaMapMarkedAlt />
            blakegreen.dev
          </a>
        </p>
      </Container>
    </header>
  );
};

export default Header;
