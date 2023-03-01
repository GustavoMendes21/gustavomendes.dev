import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import { enUS } from 'date-fns/locale'


import Base from '../layouts/Base'
// import { ButtonPrimary } from '../components/ButtonPrimary'
// import { ButtonPrimaryIcon } from '../components/ButtonPrimaryIcon'
// import Pronunciation from '../components/Pronunciation'
import stripHtml from '../lib/strip-html'
import items from '../data/about'

export async function getStaticProps() {
  const meta = {
    title: 'Sobre | Gustavo Mendes',
    description:
      "Gosto muito de tecnologia, carros e investimentos, meu principal objetivo hoje é aprender. 🧠",
    tagline: 'Sobre mim',
    image: '',
    primaryColor: 'gradientBlue',
    secondaryColor: 'gradientPink',
  }

  return { props: meta }
}

const yearAnniversary = new Date('2002-05-21');
const yearExperience = new Date('2021-01-01');

function About(props) {
  const { title, description, image } = props

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Gustavo"
            src="/static/images/profilepicture.png"
            width="580"
            height="920"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            Meu nome é Gustavo tenho <strong>{new Date().getFullYear() - yearAnniversary.getFullYear()}</strong> anos, e uso a tecnologia como ferramenta para resolver problemas.
          </Paragraph>

          <Paragraph>
            Sempre gostei muito de tecnologia e tive curiosidade em saber como as coisas funcionam por trás das abstrações. 
          </Paragraph>

          <Paragraph>
            Me aprofundei na stack Javascript/Typescript, 
            trabalho com ReactJs/NextJs no Frontend e NodeJs com Express/NestJS para aplicações backend.
          </Paragraph>

          <Paragraph>
            Busco me aprofundar também nas bases a programação, estudando algoritmos, estruturas de dados, paradigmas de programação e Clean code.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    return (
      <div>
        <blockquote>
          <p>{description}</p>
        </blockquote>
        {/* <p>
          <ButtonPrimary as="button" onClick={copyBio}>
            <ButtonPrimaryIcon className="ri-file-copy-line" /> Copy to
            Clipboard
          </ButtonPrimary>
          <span style={{ margin: '0 20px 0 10px' }}>•</span>
          <ButtonPrimary
            as="a"
            download
            role="button"
            href="/static/images/#.png"
          >
            <ButtonPrimaryIcon className="ri-download-2-line" /> Download
            Headshot
          </ButtonPrimary>
        </p> */}
      </div>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy', { locale: enUS })}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy', { locale: enUS })
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `
    }

    durationStr += `${durationObj.months} mos`

    return durationStr
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://gustavomendes.vercel.app/sobre" property="og:url" />
        {/* <meta content={`https://birobirobiro.dev${image}`} property="og:image" /> */}
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      {/* <h2>Career</h2>
      {renderAll()} */}
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
