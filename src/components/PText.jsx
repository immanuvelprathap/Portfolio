import styled from 'styled-components';

const PStyle = styled.div`
  max-width: 62ch;
  font-size: 1.6rem;
  line-height: 1.85;
  color: var(--mist);
`;

export default function PText({ children }) {
  return (
    <PStyle className="para">
      <p>{children}</p>
    </PStyle>
  );
}
