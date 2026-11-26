import React from "react";
import styled, { keyframes, css } from "styled-components";

const dotFade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  padding: 1rem 1.5rem 2rem;
  max-width: 64rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DotBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.3s;
  pointer-events: none;
`;

const GradientBorder = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 0.75rem;
  padding: 1px;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.08), transparent);
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.3s;
  pointer-events: none;
`;

const Card = styled.div`
  position: relative;
  padding: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  background: #000;
  cursor: ${p => p.$clickable ? "pointer" : "default"};
  transition: transform 0.3s, box-shadow 0.3s;
  grid-column: ${p => p.$colSpan === 2 ? "span 2" : "span 1"};
  transform: ${p => p.$lifted ? "translateY(-2px)" : "none"};
  box-shadow: ${p => p.$lifted ? "0 2px 12px rgba(255,255,255,0.04)" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 12px rgba(255,255,255,0.04);
  }

  &:hover ${DotBg} { opacity: 1; }
  &:hover ${GradientBorder} { opacity: 1; }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const IconBox = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  transition: background 0.3s;

  ${Card}:hover & {
    background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
  }
`;

const Status = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  background: rgba(255,255,255,0.08);
  color: rgba(230,237,243,0.7);
  backdrop-filter: blur(4px);
  transition: background 0.3s;

  ${Card}:hover & {
    background: rgba(255,255,255,0.14);
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
`;

const Title = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #e6edf3;
  letter-spacing: -0.01em;
  margin: 0;
`;

const Meta = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(230,237,243,0.4);
  margin-left: 0.4rem;
`;

const Desc = styled.p`
  font-size: 0.85rem;
  color: rgba(230,237,243,0.55);
  line-height: 1.55;
  margin: 0;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const Tag = styled.span`
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 0.375rem;
  background: rgba(255,255,255,0.07);
  color: rgba(230,237,243,0.5);
  transition: background 0.2s;

  &:hover {
    background: rgba(255,255,255,0.13);
  }
`;

const Cta = styled.span`
  font-size: 0.72rem;
  color: rgba(230,237,243,0.35);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.25s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

function BentoGrid({ items = [] }) {
  return (
    <Grid>
      {items.map((item, i) => (
        <Card
          key={i}
          $colSpan={item.colSpan}
          $lifted={item.hasPersistentHover}
          $clickable={!!item.onClick}
          onClick={item.onClick}
        >
          <DotBg $visible={item.hasPersistentHover} />
          <GradientBorder $visible={item.hasPersistentHover} />

          <Top>
            <IconBox>{item.icon}</IconBox>
            {item.status && <Status>{item.status}</Status>}
          </Top>

          <Body>
            <Title>
              {item.title}
              {item.meta && <Meta>{item.meta}</Meta>}
            </Title>
            <Desc>{item.description}</Desc>
          </Body>

          <Bottom>
            <Tags>
              {item.tags?.map((tag, j) => <Tag key={j}>#{tag}</Tag>)}
            </Tags>
            <Cta>{item.cta || "Detaylı bilgi →"}</Cta>
          </Bottom>
        </Card>
      ))}
    </Grid>
  );
}

export { BentoGrid };
