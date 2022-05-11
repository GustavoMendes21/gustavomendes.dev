import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import categories from '../data/setup'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const meta = {
    title: 'Setup // biro³',
    description:
      "I always receive many messages asking about my setup and what <strong>software and equipment I use in my daily life</strong>. So, I decided to list everything here in one place. As I update my setup, I will update the list below.",
    tagline: 'Tools. Apps. Gear.',
    image: 'https://github.com/birobirobiro/birobirobiro.dev/blob/main/.github/setup.jpeg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function Uses(props) {
  const { title, description, image } = props

  const renderAll = () => {
    return categories.map((category, index) => {
      return (
        <div key={index}>
          <h2><a id={category.id} href={category.tag + category.id}>{category.name}</a></h2>
          <ul>
            {category.items.map((item, iIndex) => {
              return (
                <li key={iIndex}>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div >
      )
    })
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://birobirobiro.dev/uses" property="og:url" />
        <meta content={`${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {renderAll()}
    </>
  )
}

Uses.Layout = Base

export default Uses
