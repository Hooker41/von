/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Main from './Main';
import Section from './Section';

import P from 'components/P';
import Img from 'components/Img';
import DiagonalSwipeButton from 'components/DiagonalSwipeButton';

import KeyLogo from './img/key_logo.jpg';

export function HomePage() {
  
  return (
    <Main>
      <Helmet>
        <title>Rechtsform</title>
        <meta
          name="legal form"
          content="rechtsform"
        />
      </Helmet>
      <div>
        <Img className={"key_logo"} src={KeyLogo} alt="key_logo" />
      </div>
      <div>
        <P>
          Unsere Beratung von Familienunternehmern und Familienunternehmerinnen umfasst häufig auch die Frage nach der optimalen Rechtsform für das Familienunternehmen unserer Mandanten: Sind wir als GmbH & Co. KG gut aufgestellt? Wäre nicht eine Aktiengesellschaft passender? Warum wählen wir nicht eine Stiftungslösung?
        </P>
        <P>
          Hat Ihr Familienunternehmen die passende Rechtsform? Finden Sie es mit unserem Rechtsform-O-Mat heraus: (*)
        </P>
      </div>
      <div>
        <DiagonalSwipeButton to="/quiz">Start</DiagonalSwipeButton>
      </div>
      <div>
        <Section>
          <P>
            (*) Sowenig wie Sie Ihr Wahlrecht allein auf Grundlage des bekannten Wahl-O-Mat ausüben würden, so sollten Sie natürlich auch nicht die Rechtsform Ihres Unternehmens allein nach dem Ergebnis unseres Rechtsform-O-Mat festlegen. Es handelt sich hierbei um ein spielerisches Informationsangebot, bei welchem letztlich nicht das (subjektive) Endergebnis, sondern der Prozess der Beantwortung der Fragen den für Sie wichtigen Erkenntnisgewinn bringt. Denn es sind die mit dem Rechtsform-O-Mat gestellten Fragen, die den Querschnitt und die Vielzahl an relevanten Aspekten verdeutlichen, die Sie bei der Auswahl der Rechtsform berücksichtigen und über die Sie als Unternehmerfamilie intensiv nachgedacht haben sollten.
          </P>
          <P>
            Gerne gehen wir den Weg zur passenden Rechtsform im Detail auch mit Ihnen zusammen. Gerade bei größeren Familienunternehmen bedarf die Unternehmensstruktur und Rechtsform fortwährender Überprüfung und Anpassung. Nicht nur sich verändernde rechtliche, steuerliche, organisatorische und wirtschaftliche Rahmenbedingungen, sondern besonders auch Veränderungen im Gesellschafterkreis, z.B. aufgrund des Generationswechsels, können Anpassungsbedarf mit sich bringen, ebenso organische und anorganische Wachstumsprozesse. Sprechen Sie uns gerne jederzeit unverbindlich an (natürlich auch zu Themen wie Nachfolgeplanung, Family Business Governance und Stiftungen).[Link zu www.vonthunen.de]
          </P>
        </Section>
      </div>
    </Main>
  );
}

export default HomePage;
