import React, { useMemo } from "react";
import styled from "@emotion/styled";
import creditCardType from "credit-card-type";

import prettyCardNumber from "helpers/prettyCardNumber";

const CARD_BG_MG_PATH = "/assets/world_map.png";
const CARD_CHIP_ICON_PATH = "/assets/card_chip.png";
const CARD_BACK_SIGNATURE_PATH = "/assets/card_stripe.png";
const CONTACTLESS_ICON_PATH = "/assets/contactless.svg";

type CreditCardProps = {
  type?: string;
  number: string;
  expiry: string;
  name: string;
  cvv: string;
  contactless?: boolean;
  issuer?: string;
  bankName?: string;
};

export default function CreditCard({
  type,
  number,
  expiry,
  name,
  contactless = true,
  cvv
}: CreditCardProps) {
  const cardType = useMemo(() => {
    const types = creditCardType(number);
    return types.length ? types[0] : null;
  }, [number]);

  const isAmex = cardType?.type === "american-express";

  const prettyNumber = cardType ? prettyCardNumber(number.replaceAll(" ", ""), cardType) : number;

  return (
    <CreditCardContainer>
      <CreditCardInner>
        <CreditCardFront>
          <CardBgImg src={CARD_BG_MG_PATH} />
          <CreditCardChipContainer />
          {type && <CardType>{type}</CardType>}
          {isAmex && <AmexCvv>{cvv}</AmexCvv>}
          {contactless && <CreditCardContactlessIcon />}
          <CreditCardNumber>{prettyNumber}</CreditCardNumber>
          <CreditCardExpiry>Valid Thru: {expiry}</CreditCardExpiry>
          <CreditCardHoldersName>{name}</CreditCardHoldersName>
          <IssuerLogo logo="/assets/network_icons/maestro.svg" />
        </CreditCardFront>

        <CreditCardBack>
          <CreditCardStripe />
          <CreditCardSignaturePatternContainer>
            <CreditCardSignaturePattern />
          </CreditCardSignaturePatternContainer>
          <CreditCardCvvContainer>
            <CreditCardCvv>{isAmex ? "XXX" : cvv}</CreditCardCvv>
          </CreditCardCvvContainer>
          <IssuerLogo logo="/assets/network_icons/amex.svg" />
        </CreditCardBack>
      </CreditCardInner>
    </CreditCardContainer>
  );
}

const CreditCardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.75s;
  transform-style: preserve-3d;
`;

const CreditCardContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 250px;
  perspective: 1000px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  text-align: left;

  * {
    box-sizing: border-box;
    font-family: "cc font", monospace;
    color: #fff;
    text-transform: uppercase;
  }

  &:hover ${CreditCardInner} {
    transform: rotateX(180deg);
  }
`;

const CardBgImg = styled.img`
  width: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: -1;
`;

const CreditCardSide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  overflow: hidden;
  z-index: 1;
  backface-visibility: hidden;
`;

const CreditCardFront = styled(CreditCardSide)`
  background-image: linear-gradient(-45deg, green, blue);
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 3fr 1fr;
  grid-row-gap: 2px;

  padding: 20px 30px;
  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const CreditCardBack = styled(CreditCardSide)`
  background-image: linear-gradient(-135deg, green, blue);
  transform: rotateX(180deg);

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 3fr 1fr;
`;

const CreditCardChipContainer = styled.div`
  background-image: url(${CARD_CHIP_ICON_PATH});
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
  overflow: hidden;

  grid-column: 1 / 2;
  grid-row: 1 / span 2;
`;

const CreditCardNumber = styled.div`
  font-size: 26px;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 1.5px;

  grid-column: 1 / span 2;
  grid-row: 4 / span 1;
`;

const CreditCardExpiry = styled.div`
  grid-column: 1 / span 1;
  grid-row: 5 / span 1;
`;

const CreditCardHoldersName = styled.div`
  font-size: 22px;
  font-weight: 300;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  grid-column: 1 / span 1;
  grid-row: 6 / span 1;
`;

const CardType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -10px;
  right: -10px;
  font-size: 14px;
  text-overflow: clip;
  white-space: nowrap;
  letter-spacing: 1.5px;
  overflow: hidden;
  border: 1px solid #fff;
  border-radius: 4px;

  @media (max-width: 480px) {
    top: -7px;
    right: -7px;
  }

  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
`;

const AmexCvv = styled.div`
  font-size: 14px;
  font-style: italic;
  text-align: right;

  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
`;

const CreditCardContactlessIcon = styled.div`
  background-image: url(${CONTACTLESS_ICON_PATH});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  width: 100%;
  height: 100%;

  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
`;

type IssuerLogoProps = {
  logo: string;
};

const CreditCardStripe = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;

  grid-column: 1 / span 2;
  grid-row: 2 / span 1;
`;

const IssuerLogo = styled.div<IssuerLogoProps>`
  width: 100%;
  height: 100%;
  background-image: url(${(props: { logo: string }) => props.logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;

  grid-column: 2 / span 1;
  grid-row: 5 / span 2;
`;

const CreditCardSignaturePatternContainer = styled.div`
  padding-left: 30px;

  grid-column: 1 / span 1;
  grid-row: 4 / span 1;
`;

const CreditCardSignaturePattern = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${CARD_BACK_SIGNATURE_PATH});
  background-size: cover;
  background-repeat: no-repeat;
`;

const CreditCardCvvContainer = styled.div`
  padding-right: 30px;

  grid-column: 2 / span 1;
  grid-row: 4 / span 1;
`;

const CreditCardCvv = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  color: #000;

  font-size: 16px;
  font-style: italic;
  text-align: center;
`;
