import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px;
`;

const StyledLink = styled(NavLink)`
  font-size: 30px;
  font-weight: 700;
  font-family: sans-serif;
  color: #000;
  text-decoration: none;
  &:hover {
    opacity: 0.6;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/todos">Todos</StyledLink>
      <StyledLink to="/account">Account</StyledLink>
      {/* <StyledLink to="/email">Send Email</StyledLink> */}
    </StyledHeader>
  );
};
