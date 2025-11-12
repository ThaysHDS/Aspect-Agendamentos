const StyledCalendar = styled(Calendar)`
  width: auto; /* remove 100% */
  max-width: 100%;
  height: auto;
  font-family: 'Poppins', sans-serif;

  .react-calendar__tile {
    border-radius: 8px;
    font-size: 0.65rem; /* diminui para caber no espaço */
  }

  .react-calendar__tile--now {
    background: #e0f2ff;
    font-weight: 600;
    color: #0077cc;
  }

  .react-calendar__tile--active {
    background: #0077cc;
    color: white;
  }

  .react-calendar__navigation {
    font-size: 0.8rem; /* reduz nav */
  }
`;




